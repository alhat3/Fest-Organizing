const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const userModel = require("../models/userModel");
const { sendToken, sendCookie, } = require('../utils/jwtToken');
const sendEmail = require('../utils/sendEmail');
// const productModel = require("../models/productModel");
const jwt = require('jsonwebtoken');
exports.login = catchAsyncErrors(async (req, res, next) => {
    const { email, password, remember } = req.body;
    if (email) {
        const user = await userModel.findOne({ email }).select('+password');
        // console.log(user);
        if (!user) {
            return next(new ErrorHandler('Invalid Email or Password'), 401);
        }
        const isMatched = await user.comparePassword(password);
        if (!isMatched) {
            return next(new ErrorHandler('Invalid Password', 401));
        }
        if (remember === 'on') {
            const loggedInUser = sendToken(user, process.env.JWT_EXPIRE_MAX);
            sendCookie('token', loggedInUser, 31536000000, res);
        } else {
            const loggedInUser = sendToken(user, process.env.JWT_EXPIRE);
            sendCookie('token', loggedInUser, 7200000, res);
        }
        res.clearCookie('signUp');
        res.clearCookie('addRecoveryEmail');
        res.redirect('/');
    } else {
        if (!email || !password) {
            return next(new ErrorHandler('Please Enter Email and Password', 400));
        }
    }
});
exports.register = catchAsyncErrors(async (req, res, next) => {
    const { username, email, password, confirm_password } = req.body;
    if (email) {
        const Users = await userModel.findOne({ email });
        if (!Users) {
            if (password === confirm_password) {
                const user = new userModel(req.body);
                await user.save();
                const token = user.generateToken(10 * 60 * 1000);
                const credentials = jwt.sign({ email, password }, process.env.JWT_SECRET);
                sendCookie('signUp', credentials, 10 * 60 * 1000, res);
                sendCookie('addRecoveryEmail', token, 10 * 60 * 1000, res);
                res.status(200).render('form', { formType: 'recoveryEmail', message: '', layout: 'layouts/formlayout' });
            } else {
                return next(new ErrorHandler("Passowrd and Confirm password doesn't match"));
            }
        } else {
            console.log('Email already in use');
            return res.status(201).json({
                success: false,
                user: 'Email already in use'
            });
        }
    } else {
        if (!email || !password || !confirm_password || !username) {
            return next(new ErrorHandler('Please enter required inputs', 401));
        }
    }
});
exports.recoveryEmail = catchAsyncErrors(async (req, res, next) => {
    const { recovery_email } = req.body;
    const token = req.cookies.addRecoveryEmail;
    if (!token) {
        return next(new ErrorHandler('Cookie Expired', 401));
    }
    const verify = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findOne({ _id: verify.id });
    user.recoveryEmail = recovery_email;
    await user.save({ validateBeforeSave: false });
    console.log('add');
    res.clearCookie('addRecoveryEmail');
    return res.status(200).redirect('/api/v1/auth/login');
});
exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {

    const { email, phone_number, resend } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
        return next(new ErrorHandler('User not found'));
    }
    const recoveryEmail = user.recoveryEmail;
    if (!recoveryEmail) {
        return next(new ErrorHandler('Recovery email is not added', 403));
    }
    let verificationCode = Math.round((1000 + Math.random() * 9000));
    let otpArr = verificationCode.toString().split('');
    while (otpArr[0] === otpArr[1] && otpArr[2] === otpArr[3] && otpArr[0] === otpArr[3]) {
        verificationCode = Math.round((1000 + Math.random() * 9000));
        otpArr = verificationCode.toString().split('');
    }
    // const resetPasswordUrl = `${req.protocol}://${req.get('host')}/api/v1/auth/reset-password/${resetToken}`;
    const message = `Please use the verification code below on verify page.\n\n ${verificationCode} \n\n if you have not requested then please ignore.`;
    let email_name = recoveryEmail.split('@');
    let arr = [];
    email_name[0].split('').forEach((char, i) => {
        if (i > 2) {
            arr.push('*');
        } else {
            arr.push(char);
        }
    });
    arr.push('@');
    arr.push(email_name[1]);
    let emailArr = arr.join('');
    user.otp = verificationCode;
    await user.save({ validateBeforeSave: true });
    const token = sendToken(user, process.env.JWT_EXPIRE);
    sendCookie('verifyOtp', token, 120000, res);
    await sendEmail({
        email: recoveryEmail,
        subject: 'Ecommerce Password Recovery',
        message
    });
    res.render('form', { layout: 'layouts/formLayout', formType: 'verifyOtp', verificationType: 'email', email, emailArr, resend });
});

exports.verifyOtp = catchAsyncErrors(async (req, res, next) => {
    const { first, second, third, fourth } = req.body;
    const token = req.cookies.verifyOtp;
    if (!first || !second || !third || !fourth) {
        console.log('Please provide OTP');
        return next(new ErrorHandler('Please provide OTP', 400));
    }
    let verificationCode = first.concat(second).concat(third).concat(fourth);
    if (!token) {
        // user.otp = undefined;
        // await user.save({ validateBeforeSave: true });
        console.log('verification token expired');
        return next(new ErrorHandler('verification token expired', 403));
    }
    const verify = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById({ _id: verify.id });
    if (!user) {
        console.log('User not found');
        return next(new ErrorHandler('User not found'));
    }
    const OTP = user.otp;
    if (!OTP) {
        user.otp = undefined;
        await user.save({ validateBeforeSave: true });
        console.log('OTP expired');
        return next(new ErrorHandler('OTP Expired', 403));
        res.redirect('/api/v1/auth/forgot');
    }
    if (OTP !== verificationCode) {
        console.log('Wrong OTP');
        return next(new ErrorHandler('Wrong OTP'));
        res.redirect('/api/v1/auth/forgot');
    }
    res.clearCookie("verifyOtp");
    user.otp = undefined;
    await user.save({ validateBeforeSave: true });
    console.log('OTP Matched Successfully');
    const creatingToken = sendToken(user, process.env.JWT_EXPIRE);

    sendCookie('createPassword', creatingToken, 1800000, res);

    return res.redirect('/api/v1/auth/create-password');
});
exports.createPassword = catchAsyncErrors(async (req, res, next) => {
    const creatingToken = req.cookies.createPassword;
    if (!creatingToken) {
        return next(new ErrorHandler('creating time expired', 403));
    }
    const verify = jwt.verify(creatingToken, process.env.JWT_SECRET);
    if (!verify) {
        return next(new ErrorHandler('jwt token not verified'));
    }
    const user = await userModel.findById({ _id: verify.id });
    const { new_password, confirm_password } = req.body;
    if (!new_password || !confirm_password) {
        return next(new ErrorHandler('Please fill the input', 400));
    }
    if (new_password === confirm_password) {
        user.password = new_password;
        await user.save({ validateBeforeSave: true });
        res.clearCookie('createPassword');
        return res.status(200).redirect('/api/v1/auth/login');
    } else {
        return next(new ErrorHandler("New password and Confirm password doesn't match", 403));
    }
});
exports.logout = catchAsyncErrors(async (req, res, next) => {
    res.clearCookie('token');
    return res.redirect('/');
    // res.status(200).json({
    //     success: true,
    //     message: 'Logged Out'
    // });
});
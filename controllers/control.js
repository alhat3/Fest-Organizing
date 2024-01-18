const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const userModel = require("../models/userModel");
// const productModel = require("../models/productModel");
const jwt = require('jsonwebtoken');
require('dotenv').config();
//GET
exports.loginPage = catchAsyncErrors(
    async (req, res, next) => {
        const credentials = req.cookies.signUp;
        if (credentials) {
            const verify = jwt.verify(credentials, process.env.JWT_SECRET);
            if (req.token) {
                return res.redirect('/');
            } else {
                return res.render('form', { formType: 'login', message: '', signUpData: verify, layout: 'layouts/formLayout' });
            }
        } else {
            if (req.token) {
                return res.redirect('/');
            } else {
                return res.render('form', { formType: 'login', message: '', signUpData: '', layout: 'layouts/formLayout' });
            }
        }
    }
);

exports.signUpPage = catchAsyncErrors(async (req, res) => {
    if (req.token) {
        res.redirect('/');
    } else {
        res.render('form', { formType: 'signUp', message: '', layout: 'layouts/formLayout' });
    }
});
exports.recoveryEmailPage = catchAsyncErrors(async (req, res) => {
    res.render('form', { formType: 'recoveryEmail', message: '', layout: 'layouts/formLayout' });
});
exports.verifyOtpPage = catchAsyncErrors(async (req, res) => {

    res.render('form', { formType: 'verifyOtp', verificationType: '', phone_number: '', email: '', layout: 'layouts/formLayout' });

});
exports.forgotPage = catchAsyncErrors(async (req, res) => {

    res.render('form', { formType: 'forgot', layout: 'layouts/formLayout' });

});
exports.createPasswordPage = catchAsyncErrors(async (req, res) => {
    const authenticated = req.cookies.createPassword;
    if (authenticated) {
        res.render('form', { formType: 'createPassword', message: '', layout: 'layouts/formLayout' });
    } else {
        res.redirect('/api/v1/auth/forgot');
    }

});
exports.verifyEmailPage = catchAsyncErrors(async (req, res) => {

    res.render('form', { formType: 'verifyEmail', layout: 'layouts/formLayout' });

});
exports.verifyNumberPage = catchAsyncErrors(async (req, res) => {
    res.render('form', { formType: 'verifyNumber', layout: 'layouts/formLayout' });

});




exports.pageNotFound = catchAsyncErrors(async (req, res) => {
    const token = req.cookies.orderDetails;
    const shippingInfo = jwt.verify(token, process.env.JWT_SECRET);
    res.render('pageNotFound', { layout: 'pageNotFound' });

});
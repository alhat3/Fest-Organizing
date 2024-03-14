const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const ErrorHandler = require('../utils/errorHandler');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');
const sendToken = require('../utils/jwtToken');
exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
    const { token } = req.cookies;
    // if (!token) {
    //     return next(new ErrorHandler('Please login to access this resource', 401));
    // }
    if (token) {
        try {
            const decodedData = jwt.verify(token, process.env.JWT_SECRET);
            const user = await userModel.findById({ _id: decodedData.id });
            req.user = user;
            req.token = token;
        } catch (err) {
            if (err.name === 'TokenExpiredError') {
                console.log('Jwt Expired (Token cleared)');
                res.clearCookie('token');
            }
        }
    }
    // sendToken(user, process.env.JWT_EXPIRE);
    // console.log(token);
    next();

});
exports.authorizeRoles = (...roles) => {
    return (req, res, next) => {
        // console.log(req.user);
        if (!req.user) {
            return next(new ErrorHandler('Token expired, Please login again'));
        }
        const userRoles = req.user?.roles;
        let authorize = false;
        userRoles.forEach((role) => {
            if (roles.includes(role)) {
                authorize = true;
            }
        });
        if (!authorize) {
            if (userRoles.includes('seller')) {
                return next(new ErrorHandler(`Role: Users and Sellers are not allowed to access this resource`), 403);
            } else if (userRoles.includes('user')) {
                return next(new ErrorHandler(`Role: Users are not allowed to access this resource`), 403);
            } else {
                return;
            }
        }
        next();
    };
};

const express = require('express');
const { loginPage, signUpPage, forgotPage, recoveryEmailPage, createPasswordPage, productOverviewPage, categoryPage, adminDashboardPage, shoppingCartPage, verifyEmailPage, verifyNumberPage, verifyOtpPage, verifyOtp, pageNotFound, createProductPage, sellerDashboardPage, sellerOrdersPage, sellerProductManagePage, sellerReviewPage, updateProductPage, shippingPage, confirmOrderPage, paymentPage, orderpage } = require('../controllers/control.js');
const router = express.Router();
// const { getAllProducts } = require('../controllers/productController');
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth.js');
// const { sendSMS } = require('../utils/sendSMS.js');
// GET
router.get('/auth/login', isAuthenticatedUser, loginPage);
router.get('/auth/sign-up', isAuthenticatedUser, signUpPage);
router.get('/auth/verify-otp', verifyOtpPage);
router.get('/auth/forgot', forgotPage);
router.get('/auth/verify-email', verifyEmailPage);
router.get('/auth/create-password', createPasswordPage);
router.get('/auth/verify-number', verifyNumberPage);
router.get('/auth/create-password', createPasswordPage);
router.get('/auth/recovery-email', recoveryEmailPage);
router.get('*', pageNotFound);
module.exports = router;

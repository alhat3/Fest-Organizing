const express = require('express');
const { loginPage, signUpPage, forgotPage, recoveryEmailPage, createPasswordPage, eventOverviewPage, categoryPage, adminDashboardPage, shoppingCartPage, verifyEmailPage, verifyNumberPage, verifyOtpPage, verifyOtp, pageNotFound, createEventPage, managerDashboardPage, managerOrdersPage, managerEventManagePage, managerReviewPage, updateEventPage, shippingPage, confirmOrderPage, paymentPage, orderpage } = require('../controllers/control.js');
const router = express.Router();
// const { getAllEvents } = require('../controllers/eventController');
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth.js');
// const { sendSMS } = require('../utils/sendSMS.js');
// GET
//User routes
router.get('/auth/login', isAuthenticatedUser, loginPage);
router.get('/auth/sign-up', isAuthenticatedUser, signUpPage);
router.get('/auth/verify-otp', verifyOtpPage);
router.get('/auth/forgot', forgotPage);
router.get('/auth/verify-email', verifyEmailPage);
router.get('/auth/create-password', createPasswordPage);
router.get('/auth/verify-number', verifyNumberPage);
router.get('/auth/create-password', createPasswordPage);
router.get('/auth/recovery-email', recoveryEmailPage);
//Event manager routs
router.get('/event/:id', isAuthenticatedUser, eventOverviewPage);

router.get('/manager/event/create-event', isAuthenticatedUser, authorizeRoles('admin', 'manager'), createEventPage);
router.get('/manager/event/update-event/:id', isAuthenticatedUser, authorizeRoles('admin', 'manager'), updateEventPage);
router.get('/manager/manage-event', isAuthenticatedUser, authorizeRoles('admin', 'manager'), managerEventManagePage);
router.get('/manager/dashboard', isAuthenticatedUser, authorizeRoles('admin', 'manager'), managerDashboardPage);
router.get('/manager/orders', isAuthenticatedUser, authorizeRoles('admin', 'manager'), managerOrdersPage);
router.get('/manager/event-reviews', isAuthenticatedUser, authorizeRoles('admin', 'manager'), managerReviewPage);
//
router.get('*', pageNotFound);
module.exports = router;

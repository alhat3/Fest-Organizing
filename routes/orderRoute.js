const express = require('express');
const router = express.Router();
const { createOrder, singleOrder, allUserOrders, getAllOrders, shipping, confirmOrder, payment, createPaymentIntent } = require('../controllers/orderController');
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth');

router.route('/order/create-order').post(isAuthenticatedUser, createOrder);
router.route('/order/:id/shipping').post(isAuthenticatedUser, shipping);
router.route('/order/:id/confirm-order').post(isAuthenticatedUser, confirmOrder);
router.route('/order/create-payment-intent').post(isAuthenticatedUser, createPaymentIntent);

router.route('/order/:id/payment').post(isAuthenticatedUser, payment);
// router.route('/order/single-order/:id').post(isAuthenticatedUser, singleOrder);
// router.route('/order/my-orders').post(isAuthenticatedUser, allUserOrders);
// router.route('/order/all-orders').post(isAuthenticatedUser, authorizeRoles('admin'), allUserOrders);
module.exports = router;
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const userModel = require("../models/userModel");
const eventModel = require("../models/eventModel");
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


exports.eventOverviewPage = catchAsyncErrors(async (req, res) => {
    // const verify = jwt.verify(req.token, process.env.JWT_SECRET);
    const event = await eventModel.findById({ _id: req.params.id });
    let eventID = event.id;
    console.log(event);
    let totalStar = event.reviews.length * 5;
    let receivedStar = 0;
    let starObj = {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0
    };
    let starArr = []; ``;

    event.reviews.forEach((review) => {
        receivedStar += review.rating;
        starObj[review.rating]++;
    });
    for (let star in starObj) {
        starArr.push(Math.round(starObj[star] / 12 * 100));
    }
    let totalRating = Math.round((receivedStar / totalStar) * 100);
    let averageRating = totalRating / 20;
    // console.log('total star', totalStar);
    // console.log('received star', receivedStar);
    // console.log('overAll Rating', totalRating, '%');
    // console.log('starArr', starArr);
    return res.render('eventOverview', { layout: 'eventOverview', event, eventID, token: req.token, averageRating, starArr });
});
exports.shoppingCartPage = catchAsyncErrors(async (req, res) => {

    res.render('shoppingCart', { layout: 'shoppingCart' });

});
exports.adminDashboardPage = catchAsyncErrors(async (req, res) => {
    res.render('adminDashboard', { layout: 'adminDashboard' });
});
exports.managerDashboardPage = catchAsyncErrors(async (req, res, next) => {
    const verify = jwt.verify(req.token, process.env.JWT_SECRET);
    const user = await userModel.findById(verify.id);
    const events = await eventModel.find({ eventOwnerId: verify.id });
    let deliveredItems = 0;
    events.forEach((event) => {
        deliveredItems += event.sold;
    });
    console.log('dashboard pe aaya');
    res.render('dashboard', { layout: 'layouts/dashboardLayouts', deliveredItems, role: 'manager', user, events, content: 'dashboard' });
});
exports.managerOrdersPage = catchAsyncErrors(async (req, res, next) => {
    const verify = jwt.verify(req.token, process.env.JWT_SECRET);
    const user = await userModel.findById(verify.id);
    res.render('dashboard', { layout: 'layouts/dashboardLayouts', role: 'manager', user, content: 'orders' });
});
exports.createEventPage = catchAsyncErrors(async (req, res, next) => {
    const verify = jwt.verify(req.token, process.env.JWT_SECRET);
    const user = await userModel.findById(verify.id);
    res.render('dashboard', { layout: 'layouts/dashboardLayouts', role: 'manager', event: '', user, content: 'createEvent' });
});
exports.updateEventPage = catchAsyncErrors(async (req, res, next) => {
    const verify = jwt.verify(req.token, process.env.JWT_SECRET);
    const user = await userModel.findById(verify.id);
    const event = await eventModel.findById(req.params.id);
    res.render('dashboard', { layout: 'layouts/dashboardLayouts', role: 'manager', user, event, content: 'updateEvent' });

});
exports.managerEventManagePage = catchAsyncErrors(async (req, res, next) => {
    const verify = jwt.verify(req.token, process.env.JWT_SECRET);
    const user = await userModel.findById(verify.id);
    if (user.notifications) {
        user.notifications.events = 0;

    }
    await user.save();
    const allEvents = await eventModel.find({ eventOwnerId: verify.id });
    res.render('dashboard', { layout: 'layouts/dashboardLayouts', role: 'manager', user, allEvents, content: 'manageEvent' });
});
exports.managerReviewPage = catchAsyncErrors(async (req, res, next) => {
    const verify = jwt.verify(req.token, process.env.JWT_SECRET);
    const user = await userModel.findById(verify.id);
    user.notifications.events = 0;
    await user.save();
    const events = await eventModel.find({ eventOwnerId: verify.id });
    let Data = [];

    events.forEach((event) => {
        event.reviews.forEach((review) => {
            const obj = {
                eventName: event.name,
                name: review.name,
                rating: review.rating,
                comment: review.comment
            };
            Data.push(obj);
        });
    });
    res.render('dashboard', { layout: 'layouts/dashboardLayouts', Data, role: 'manager', user, content: 'eventReviews' });
});
exports.shippingPage = catchAsyncErrors(async (req, res) => {

    if (req.token) {
        console.log(req.user);
        return res.render('shipping', { layout: 'shipping', events: req.params.id, user: req.user, page: 'shipping' });
    } else {
        return res.redirect('/api/v1/auth/login');
    }

});
exports.confirmOrderPage = catchAsyncErrors(async (req, res, next) => {
    if (!req.cookies.orderDetails) {
        return res.redirect(`/api/v1/order/${req.params.id}/shipping`);
    }
    // const event = await eventModel.find({ _id: req.params.id });
    const token = req.cookies.orderDetails;
    const eventArray = req.params.id.split(',');
    let orderItems = [];

    // Map the eventArray to an array of promises
    const promises = eventArray.map(async (event) => {
        let data = await eventModel.findById(event);
        let item = {
            name: data.name,
            price: data.price,
            image: data.images[0],
            id: data.id
        };
        orderItems.push(item);
    });

    // Wait for all promises to resolve
    Promise.all(promises)
        .then(() => {
            let totalPrice = 0;
            orderItems.forEach((item) => {
                totalPrice += item.price;
            });
            return res.render('confirmOrder', { layout: 'confirmOrder', eventsId: req.params.id, events: orderItems, totalPrice, page: 'confirmOrder' });
        })
        .catch((error) => {
            console.error(error);
        });
});
exports.paymentPage = catchAsyncErrors(async (req, res, next) => {
    if (!req.cookies.confirmOrder) {
        return res.redirect(`/api/v1/order/${req.params.id}/confirm-order`);
    }
    // const decodedData = jwt.verify(req.cookies.confirmOrder, process.env.JWT_SECRET);
    // res.json({ decodedData });
    return res.render('payment', { layout: 'payment', events: req.params.id, user: req.user, page: 'payment' });
});
exports.paymentSuccessfulPage = catchAsyncErrors(async (req, res, next) => {
    if (!req.cookies.confirmOrder) {
        return next(ErrorHandler('Cookie Expired!'));
    }
    const confirmOrder = jwt.verify(req.cookies.confirmOrder, process.env.JWT_SECRET);
    console.log(confirmOrder.totalPrice);
    console.log('Working');
    return res.render('paymentSuccessfulPage', { layout: 'paymentSuccessfulPage', totalPrice: confirmOrder.totalPrice, });
});
exports.orderpage = catchAsyncErrors(async (req, res, next) => {
    if (req.token) {
        return res.render('orderPage', { token: req.token, layout: 'orderPage' });

    } else {
        return res.redirect('/api/v1/auth/login');
    }
});



exports.pageNotFound = catchAsyncErrors(async (req, res) => {
    const token = req.cookies.orderDetails;
    const shippingInfo = jwt.verify(token, process.env.JWT_SECRET);
    res.render('pageNotFound', { layout: 'pageNotFound' });

});
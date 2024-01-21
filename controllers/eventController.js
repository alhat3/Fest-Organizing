const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const userModel = require("../models/userModel");
const eventModel = require("../models/eventModel");
const multer = require('multer');
const fs = require('fs');

exports.getAllEvents = catchAsyncErrors(async (req, res, next) => {
    const { name, description, moreInfo } = req.body;
    const event = await eventModel.find();
    if (event) {
        return res.status(200).json({
            success: true,
            nhBits: event.length
            ,
            event
        });
    } else {
        return res.status(404).json({

            success: false,
            event: 'event not found'
        });
    }
});

exports.createEvent = catchAsyncErrors(async (req, res, next) => {
    //Manager id
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, `./static/img/event-img/`);
        },
        filename: function (req, file, cb) {
            cb(null, `${req.user.id}-${file.originalname}`);
        }
    });

    const fileFilter = (req, file, cb) => {
        if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/webp') {
            return cb(null, true);
        } else {
            return cb(null, false);
        }
    };
    let upload = multer({ storage, limits: { fileSize: 1024 * 1024 * 5 }, fileFilter });
    let images = [];
    let newEvent = {};
    let moreInfo = {};
    upload.array('event_image', 5)(req, {}, async (err) => {
        if (err) {
            console.log('err aaya');
            console.log(err);
            throw err;
        } else {
            if (req.files.length == 0) {
                console.log('error');
                req.files.forEach((file) => {
                    fs.unlinkSync(`./static/img/event-img/${req.user.id}-${file.originalname}`);
                });
                console.log('files are removed');
                return next(new ErrorHandler('Image not found', 403));
            } else {
                req.files.forEach((file) => {
                    let obj = {
                        name: file.originalname,
                        url: `${req.user.id}-${file.originalname}`,
                        size: file.size,
                        mimetype: file.mimetype
                    };
                    images.push(obj);
                });
                const { event_name: name, event_price: price, event_description: description, event_category: category, event_stock: stock, about_event, specifications } = req.body;
                if (about_event) {
                    moreInfo.about_event = about_event;
                }
                if (specifications) {
                    moreInfo.specifications = specifications;
                }
                if (!name || !price || !description || !category || !stock || !images) {
                    req.files.forEach((file) => {
                        console.log(file.originalname);
                        fs.unlinkSync(`./static/img/event-img/${file.originalname}`);
                    });
                    console.log('files are removed');
                    return next(new ErrorHandler('Correctly fill the form'));
                } else {
                    newEvent = {
                        name,
                        price,
                        description,
                        category,
                        stock,
                        images,
                        eventOwnerId: req.user._id
                    };
                    if (Object.keys(moreInfo).length > 0) {
                        newEvent.moreInfo = moreInfo;
                    }

                    const finalEvent = new eventModel(newEvent);
                    // console.log(finalEvent);
                    await finalEvent.save();
                    req.user.notifications.events++;
                    await req.user.save();
                    console.log('Event successfully created!');
                    return res.status(200).redirect('/api/v1/manager/event/create-event');
                }
            }
        }
    });

});

exports.getEvent = catchAsyncErrors(async (req, res) => {
    console.log(req.body);
    console.log('req.params', req.params.id);
    console.log('req.query', req.query);
    // const event = eventModel.findById()
    res.send('workiing');

});
exports.updateEvent = catchAsyncErrors(async (req, res, next) => {
    console.log('at least aaya to');
    // console.log(req.params.id);

    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, `./static/img/event-img/`);
        },
        filename: function (req, file, cb) {
            cb(null, `${req.user.id}-${file.originalname}`);
        }
    });

    const fileFilter = (req, file, cb) => {
        if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/webp') {
            return cb(null, true);
        } else {
            return cb(null, false);
        }
    };
    let upload = multer({ storage, limits: { fileSize: 1024 * 1024 * 5 }, fileFilter });
    let images = [];
    let newEvent = {};
    let moreInfo = {};
    upload.array('event_image', 5)(req, {}, async (err) => {
        if (err) {
            console.log('err aaya');
            console.log(err);
            console.log('laude idr to aana bhi mt');
            throw err;
        } else {
            if (req.files.length == 0) {
                console.log('error');
                req.files.forEach((file) => {
                    fs.unlinkSync(`./static/img/event-img/${req.user.id}-${file.originalname}`);
                });
                console.log('files are removed');
                return next(new ErrorHandler('Image not found', 403));
            } else {
                req.files.forEach((file) => {
                    let obj = {
                        name: file.originalname,
                        url: `${req.user.id}-${file.originalname}`,
                        size: file.size,
                        mimetype: file.mimetype
                    };
                    images.push(obj);
                });
                const { event_name: name, event_price: price, event_description: description, event_category: category, event_stock: stock, about_event, specifications } = req.body;
                if (about_event) {
                    moreInfo.about_event = about_event;
                }
                if (specifications) {
                    moreInfo.specifications = specifications;
                }
                if (!name || !price || !description || !category || !stock || !images) {
                    req.files.forEach((file) => {
                        console.log(file.originalname);
                        fs.unlinkSync(`./static/img/event-img/${file.originalname}`);
                    });
                    console.log('files are removed');
                    return next(new ErrorHandler('Correctly fill the form'));
                } else {
                    newEvent = {
                        name,
                        price,
                        description,
                        category,
                        stock,
                        images,
                        eventOwnerId: req.user._id
                    };
                    if (Object.keys(moreInfo).length > 0) {
                        newEvent.moreInfo = moreInfo;
                    }
                    await eventModel.findByIdAndUpdate(req.params.id, { $set: newEvent }, { new: true, runValidators: true }).then(finalEvent => {
                        console.log('Updated event', finalEvent);
                        return res.redirect('/api/v1/manager/manage-event');
                    }).catch(err => {
                        return next(new ErrorHandler(`No event with id ${err.value}`, 400));
                    });
                }
            }
        }
    });
});
exports.deleteEvent = catchAsyncErrors(async (req, res) => {
    // console.log(req.body);
    console.log(req.params.id);
    const event = await eventModel.findByIdAndDelete(req.params.id);
    console.log(event);
    res.redirect('/api/v1/manager/manage-event');

});
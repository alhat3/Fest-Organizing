const express = require('express');
const port = 5000 || process.env.PORT;
const hostname = '127.0.0.1';
//Hnadling Uncaught Execption
// process.on('uncaughtException', err => {
//     console.log(`Error: ${err.message}`);
//     console.log('Shutting down the server due to Uncaught Exception');
//     process.exit(1);
// });
const connectDB = require('./db/connect');
const catchAsyncErrors = require('./middleware/catchAsyncErrors');
const expressEjsLayouts = require('express-ejs-layouts');
const errorMiddleware = require('./middleware/error');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();
const cookieParser = require('cookie-parser');
app.set('view engine', 'ejs');
app.set('layout', './layouts/layout.ejs');
app.set('views', 'views');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(expressEjsLayouts);
mongoose.set('strictQuery', true);
mongoose.set('strictPopulate', false);
app.use('/static', express.static('static'));
app.use('/api/v1/static', express.static('static'));
app.use('/api/v1/manager/static', express.static('static'));
app.use('/api/static', express.static('static'));
//Routes
const router = require('./routes/routes');
const userRoute = require('./routes/userRoute');
const eventRoute = require('./routes/eventRoute');
const { isAuthenticatedUser } = require('./middleware/auth.js');
const jwt = require('jsonwebtoken');
const eventModel = require('./models/eventModel.js');
const userModel = require('./models/userModel.js');
app.use('/api/v1', router);
app.use('/api/v1', userRoute);
app.use('/api/v1', eventRoute);
app.use(errorMiddleware);


app.get('/', isAuthenticatedUser, catchAsyncErrors(async (req, res) => {
    const sportsEvents = await eventModel.find({ category: 'Sports' });
    const artsEvents = await eventModel.find({category:'Arts'})
    const talentEvents = await eventModel.find({category:'Talent Hunt'})
    const hackathonEvents = await eventModel.find({category:'Hackathon'})
    console.log(artsEvents)
    res.render('index', { userId: req.user?.id, token: req.token, artsEvents, sportsEvents, talentEvents,hackathonEvents });
    // res.render('index', { userId: '1231235412', token: req.token });
}));
app.post('/api/v1/makeManager/', catchAsyncErrors(async (req, res, next) => {
    const verify = jwt.verify(req.cookies.token, process.env.JWT_SECRET);
    const user = await userModel.findById('64c357629558f8fa9d659257');

    // user.roles.push('admin');
    // user.roles.push('manager');//seller
    // await user.save();
    // await admin.save();
    res.json({
        // nhBits: user.length,
        success: true,
        user
    });
}));
const start = async () => {
    try {
        connectDB(process.env.MONGO_URI);
        const server = app.listen(port, () => {
            console.log(`This server is running on port http://${hostname}:${port}`);
        });
        process.on("unhandledRejection", err => {
            console.log(`Error: ${err.message}`);
            console.log('Shutting down the server due to Unhandled Promise Rejection');
            server.close(() => {
                process.exit(1);
            });
        });
    } catch (err) {
        console.log(err);
    }
};
start();

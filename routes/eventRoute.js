const express = require('express');
const multer = require('multer');
const upload = multer();
const { createEvent, getAllEvents, getEvent, updateEvent, deleteEvent, uploadImages } = require('../controllers/eventController');
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth');
const router = express.Router();
//Get
router.post('/get-all-events', isAuthenticatedUser, authorizeRoles('admin', 'manager', 'user'), getAllEvents);
//Post
router.route('/event/:id').get(isAuthenticatedUser, authorizeRoles('admin', 'manager', 'user'), getEvent).post(isAuthenticatedUser, authorizeRoles('admin', 'manager', 'user'), getEvent);

router.post('/manager/event/create-event', isAuthenticatedUser, authorizeRoles('admin', 'manager'), createEvent);
router.post('/manager/event/update-event/:id', isAuthenticatedUser, authorizeRoles('admin', 'manager'), updateEvent);
router.post('/manager/event/delete-event/:id', isAuthenticatedUser, authorizeRoles('admin', 'manager'), deleteEvent);


module.exports = router;
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
require('dotenv').config();
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please Enter Your Username'],
        maxLength: [30, 'Name cannot exceed 3o characters'],
        minLength: [4, 'Name should have more than 4 characters']
    },

    email: {
        type: String,
        validate: [validator.isEmail, 'Please Enter Valid Email'],
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: [true, 'Please Enter Your Password'],
        minLength: [6, 'Password should be greater than 5 characters'],
        select: false
    },
    avatar: {
        public_Id: {
            type: String,
        },
        url: {
            type: String,
        }
    },
    roles: {
        type: Array,
        default: ['user']
    },
    recoveryEmail: {
        type: String,

    },
    otp: {
        type: String,
        default: undefined
    },

});
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
});

//JWT TOKEN
userSchema.methods.generateToken = function (expireTime) {
    return jwt.sign({ id: this.id }, process.env.JWT_SECRET, {
        expiresIn: expireTime
    });
};
//Compare password 
userSchema.methods.comparePassword = async function (enteredPassword) {
    return bcrypt.compare(enteredPassword, this.password);
};
//Generating Password Reset Token
userSchema.methods.getResetPasswordToken = function () {
    const resetToken = crypto.randomBytes(20).toString('hex');
    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
    return resetToken;
};
module.exports = mongoose.model('user', userSchema);
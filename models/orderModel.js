const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema({
    basicInfo: {

        event: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        entryFee: {
            type: Number,
            required: true
        },
        phone: {
            type: Number,
            required: true
        }
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    paymentInfo: {
        id: {
            type: String,
            required: true
        },
        status: {
            type: String,
            required: true
        }
    },
    paidAt: {
        type: Date,
        required: true
    },

    orderStatus: {
        type: String,
        required: true,
        default: 'Processing'
    },
    createdAt: {
        type: Date,
        default: Date.now

    }
});
module.exports = mongoose.model('order', orderSchema);
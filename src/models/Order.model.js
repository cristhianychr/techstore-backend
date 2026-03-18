import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    name: String,

    sku: String,

    price: Number,

    quantity: Number,

    subtotal: Number
});

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    items: [orderItemSchema],

    totalAmount: {
        type: Number,
        required: true
    },

    status: {
        type: String,
        enum: ['PENDING', 'PAID', 'SHIPPED', 'CANCELLED'],
        default: 'PENDING'
    }
}, { timestamps: true });

export const Order = mongoose.model('Order', orderSchema);
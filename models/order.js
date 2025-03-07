const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    customerName: {
      type: String,
      required: [true, 'Customer name is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
    },
    itemDescription: {
      type: String,
      required: [true, 'Item description is required'],
    },
    file: {
      type: Buffer,
      required: false,
    },
    status: {
      type: String,
      enum: ['pending', 'processing', 'completed', 'cancelled'],
      default: 'pending',
    },
    shippingAddress: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', OrderSchema);

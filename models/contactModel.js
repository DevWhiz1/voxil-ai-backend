const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      trim: true,
    },
    company: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        'Please provide a valid email address',
      ],
    },
    phone: {
      type: String,
      trim: true,
      default: '',
    },
    service: {
      type: String,
    },
    budget: {
      type: String,

      default: '',
    },
    timeline: {
      type: String,
      default: '',
    },
    source: {
      type: String,
      default: '',
    },
    message: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Contact', contactSchema);

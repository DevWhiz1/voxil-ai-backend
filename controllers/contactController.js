const asyncHandler = require('../middleware/asyncHandler');
const Contact = require('../models/contactModel');

// @desc    Submit a contact form query
// @route   POST /api/contact
// @access  Public
const submitContactForm = asyncHandler(async (req, res) => {
  const { fullname, company, email, phone, service, budget, timeline, source, message } = req.body;

  if (!email) {
    res.status(400);
    throw new Error('Email is required');
  }

  const contact = await Contact.create({
    fullname,
    company,
    email,
    phone,
    service,
    budget,
    timeline,
    source,
    message,
  });

  res.status(201).json({
    success: true,
    message: 'Your message has been received. We will get back to you soon!',
    data: contact,
  });
});

// @desc    Get all contact queries
// @route   GET /api/contact
// @access  Public (should be restricted to admin in production)
const getContactQueries = asyncHandler(async (req, res) => {
  const contacts = await Contact.find().sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: contacts.length,
    data: contacts,
  });
});

module.exports = {
  submitContactForm,
  getContactQueries,
};

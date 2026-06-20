const express = require('express');
const router = express.Router();
const { submitContactForm, getContactQueries } = require('../controllers/contactController');

router.route('/').post(submitContactForm).get(getContactQueries);

module.exports = router;

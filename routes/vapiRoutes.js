const express = require('express');
const router = express.Router();
const { handleVapiWebhook } = require('../controllers/vapiController');

router.post('/', handleVapiWebhook);

module.exports = router;

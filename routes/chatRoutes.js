const express = require('express');
const router = express.Router();
const { startSession, getSessionHistory, sendMessage } = require('../controllers/chatController');

// Route to initialize/start a session
router.route('/session').post(startSession);

// Route to get session history
router.route('/session/:sessionId').get(getSessionHistory);

// Route to send a message to the bot
router.route('/message').post(sendMessage);

module.exports = router;

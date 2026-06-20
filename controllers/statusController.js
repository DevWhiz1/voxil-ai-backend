const mongoose = require('mongoose');
const asyncHandler = require('../middleware/asyncHandler');

// @desc    Get API & DB Connection status
// @route   GET /api/status
// @access  Public
const getStatus = asyncHandler(async (req, res) => {
  const dbState = mongoose.connection.readyState;
  const dbStates = {
    0: 'Disconnected',
    1: 'Connected',
    2: 'Connecting',
    3: 'Disconnecting',
  };

  res.status(200).json({
    success: true,
    message: 'API is running successfully',
    timestamp: new Date().toISOString(),
    database: {
      status: dbStates[dbState] || 'Unknown',
      host: mongoose.connection.host || 'N/A',
    },
  });
});

module.exports = {
  getStatus,
};

const mongoose = require('mongoose');

const vapiCallSchema = new mongoose.Schema(
  {
    vapiCallId: {
      type: String,
      required: true,
      unique: true, // Use as idempotency key to avoid duplicates
    },
    customerNumber: {
      type: String,
    },
    startedAt: {
      type: Date,
    },
    endedAt: {
      type: Date,
    },
    endedReason: {
      type: String,
    },
    transcript: {
      type: String,
    },
    messages: {
      type: Array,
    },
    recording: {
      type: mongoose.Schema.Types.Mixed,
    },
    structuredOutputs: {
      type: mongoose.Schema.Types.Mixed,
    },
    rawWebhook: {
      type: mongoose.Schema.Types.Mixed,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('VapiCall', vapiCallSchema);

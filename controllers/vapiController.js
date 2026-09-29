const VapiCall = require('../models/vapiCallModel');

// @desc    Handle Vapi webhooks
// @route   POST /api/voice
// @access  Public
const handleVapiWebhook = async (req, res) => {
  const message = req.body?.message;

  if (!message?.type) {
    return res.status(400).json({ error: 'Invalid Vapi webhook' });
  }

  try {
    switch (message.type) {
      case 'status-update': {
        console.log('Call status:', {
          callId: message.call?.id,
          status: message.status,
        });
        return res.status(200).json({ received: true });
      }

      case 'end-of-call-report': {
        const structuredOutputs = message.artifact?.structuredOutputs ?? {};

        const callData = {
          vapiCallId: message.call?.id,
          customerNumber: message.call?.customer?.number,
          startedAt: message.call?.startedAt,
          endedAt: message.call?.endedAt,
          endedReason: message.endedReason,
          transcript: message.artifact?.transcript,
          messages: message.artifact?.messages,
          recording: message.artifact?.recording,
          structuredOutputs,
          rawWebhook: req.body,
        };

        if (callData.vapiCallId) {
          // Use findOneAndUpdate with upsert to prevent duplicate records (Idempotency)
          await VapiCall.findOneAndUpdate(
            { vapiCallId: callData.vapiCallId },
            { $set: callData },
            { upsert: true, new: true }
          );
        } else {
          // Fallback if no call ID
          await VapiCall.create(callData);
        }

        return res.status(200).json({ received: true });
      }

      case 'tool-calls': {
        // Required only when custom Function tools are attached.
        const results = (message.toolCallList ?? []).map((toolCall) => ({
          toolCallId: toolCall.id,
          error: `Unsupported backend tool: ${toolCall.name}`,
        }));
        return res.status(200).json({ results });
      }

      default:
        // Accept unfamiliar future values
        return res.status(200).json({ received: true });
    }
  } catch (error) {
    console.error('Vapi webhook error:', error);
    // Informational events can be retried on a server error.
    return res.status(500).json({ error: 'Webhook processing failed' });
  }
};

module.exports = {
  handleVapiWebhook,
};

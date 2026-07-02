const dotenv = require('dotenv');
// Load environment variables
dotenv.config();

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');
const statusRoutes = require('./routes/statusRoutes');
const contactRoutes = require('./routes/contactRoutes');
const chatRoutes = require('./routes/chatRoutes');

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Status / health route
app.use('/api/status', statusRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/chat', chatRoutes);

// Root route fallback
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Voxil AI API' });
});

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
  });
}

module.exports = app;

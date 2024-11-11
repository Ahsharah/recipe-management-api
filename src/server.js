const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const recipeRoutes = require('./routes/recipes'); // Add this line

// Middleware
app.use(express.json());

// Routes
app.use('/api/recipes', recipeRoutes); // Add this line

// Basic route for testing
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to Recipe Management API' });
});

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Could not connect to MongoDB:', err));

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
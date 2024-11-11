const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

// Setting up our express app
const app = express();

// Bringing in all our routes
const recipeRoutes = require('./routes/recipes');
const categoryRoutes = require('./routes/categories');
const reviewRoutes = require('./routes/reviews');

// Middleware for parsing JSON
app.use(express.json());

// Setting up our routes
app.use('/api/recipes', recipeRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/reviews', reviewRoutes);

// Welcome route
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to Recipe Management API' });
});

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Could not connect to MongoDB:', err));

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err.stack);
    res.status(500).json({ 
        message: 'Something went wrong!' 
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ 
        message: 'Route not found' 
    });
});
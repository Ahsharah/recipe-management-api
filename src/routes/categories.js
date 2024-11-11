// Hey! Here's the main server file where all the magic happens! 🌟
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

// Setting up our express app - think of it like getting our kitchen ready to cook!
const app = express();

// Bringing in our recipe and category recipes - like getting our cookbooks ready
const recipeRoutes = require('./routes/recipes');
const categoryRoutes = require('./routes/categories');

// This middleware helps us handle JSON data - it's like having a good set of measuring tools
app.use(express.json());

// Setting up our routes - like creating different stations in our kitchen
app.use('/api/recipes', recipeRoutes);
app.use('/api/categories', categoryRoutes);

// Our welcome message - just a friendly hello when someone visits! 👋
app.get('/', (req, res) => {
   res.json({ message: 'Welcome to Recipe Management API' });
});

// Connecting to MongoDB - like plugging in all our kitchen appliances
mongoose.connect(process.env.MONGODB_URI)
   .then(() => console.log('🎉 Woohoo! Connected to MongoDB!'))
   .catch((err) => console.error('Oops! MongoDB connection error:', err));

// Starting up our server - like opening our kitchen for business!
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
   console.log(`🚀 Server is up and running on port ${PORT} - Let's get cooking!`);
});

// Error handling - for when things don't go as planned
app.use((err, req, res, next) => {
   console.error('Uh oh! Something went wrong:', err.stack);
   res.status(500).json({ 
       message: 'Something broke in our kitchen! We\'re on it!' 
   });
});

// 404 handler - for when someone tries to find a page that doesn't exist
app.use((req, res) => {
   res.status(404).json({ 
       message: 'Oops! Looks like this page is missing from our cookbook!' 
   });
});
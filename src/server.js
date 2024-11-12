// 🌟 Welcome to my Recipe Management API! Here's where the magic happens! 

// 📚 Getting all our essential tools
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

// 🛠️ Setting up our express app (it's like preheating the oven!)
const app = express();

// 🔄 Bringing in all our recipe-related routes
const recipeRoutes = require('./routes/recipes');
const categoryRoutes = require('./routes/categories');
const reviewRoutes = require('./routes/reviews');

// 🎯 Middleware to help us handle JSON data
app.use(express.json());

// ⚡ Handling potential JSON parsing errors
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        return res.status(400).json({ 
            message: "Oops! That's not valid JSON. Double-check your request!" 
        });
    }
    next();
});

// 🚀 Setting up our main routes
app.use('/api/recipes', recipeRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/reviews', reviewRoutes);

// 👋 Welcome route - say hello!
app.get('/', (req, res) => {
    res.json({ 
        message: 'Welcome to my Recipe Management API!',
        endpoints: {
            recipes: '/api/recipes',
            categories: '/api/categories',
            reviews: '/api/reviews'
        },
        status: '🟢 All systems go!'
    });
});

// 🔌 MongoDB connection with better error handling
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('🎉 Successfully connected to MongoDB!');
    })
    .catch((err) => {
        console.error('😢 MongoDB connection error:', err);
        process.exit(1); // Exit if we can't connect to database
    });

// 📡 Handle MongoDB connection events
mongoose.connection.on('error', err => {
    console.error('🔴 MongoDB connection error:', err);
});

mongoose.connection.on('disconnected', () => {
    console.log('🟡 MongoDB disconnected - checking connection...');
});

mongoose.connection.on('reconnected', () => {
    console.log('🟢 MongoDB reconnected!');
});

// 🚦 Starting our server
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
    console.log(`🚀 Server is up and running on port ${PORT}!`);
    console.log(`📝 API Documentation available at http://localhost:${PORT}`);
});

// 🛡️ Global error handling middleware
app.use((err, req, res, next) => {
    console.error('🔴 Error:', err.stack);
    
    // Handle different types of errors
    if (err.name === 'ValidationError') {
        return res.status(400).json({ 
            message: 'Validation Error',
            details: Object.values(err.errors).map(error => error.message)
        });
    }
    
    if (err.name === 'CastError') {
        return res.status(400).json({ 
            message: 'Invalid ID format. Please check your request.'
        });
    }

    // Generic error response
    res.status(err.status || 500).json({ 
        message: err.message || 'Oops! Something went wrong on our end!',
        status: 'error'
    });
});

// 🚫 404 handler - for routes that don't exist
app.use((req, res) => {
    res.status(404).json({ 
        message: 'Hmm... This route doesn\'t exist! Check the URL and try again.',
        availableRoutes: {
            recipes: '/api/recipes',
            categories: '/api/categories',
            reviews: '/api/reviews'
        }
    });
});

// 🔄 Graceful shutdown handling
process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);

async function gracefulShutdown() {
    console.log('🔄 Received shutdown signal. Cleaning up...');
    try {
        await mongoose.connection.close();
        console.log('📡 MongoDB connection closed.');
        server.close(() => {
            console.log('🚪 Server closed. Goodbye!');
            process.exit(0);
        });
    } catch (err) {
        console.error('💥 Error during shutdown:', err);
        process.exit(1);
    }
}

// ⚠️ Unhandled promise rejection handler
process.on('unhandledRejection', (reason, promise) => {
    console.error('🔴 Unhandled Promise Rejection:', reason);
    // Don't exit the process, but log it
});

// 💥 Uncaught exception handler
process.on('uncaughtException', (error) => {
    console.error('💥 Uncaught Exception:', error);
    gracefulShutdown();
});
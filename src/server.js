// 🌟 Welcome to my Recipe Management API - Where Code Meets Cooking! 
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

// 🛠️ Getting our kitchen tools ready (setting up express)
const app = express();

// 📚 Organizing our recipe collections (routes)
const recipeRoutes = require('./routes/recipes');
const categoryRoutes = require('./routes/categories');
const reviewRoutes = require('./routes/reviews');

// 🔨 Setting up our kitchen tools (middleware)
app.use(express.json());

// 🛡️ Safety first! Handling JSON parsing errors
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        return res.status(400).json({ 
            message: "Whoops! That's not valid JSON. Check your ingredients and try again!" 
        });
    }
    next();
});

// 🗺️ Setting up our recipe routes - where to find everything
app.use('/api/recipes', recipeRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/reviews', reviewRoutes);

// 👋 Welcome message - the front door to our API kitchen!
app.get('/', (req, res) => {
    res.json({ 
        message: 'Welcome to My Recipe Management API!',
        creator: 'Made with ❤️ by Alexandria',
        availableEndpoints: {
            recipes: '/api/recipes',
            categories: '/api/categories',
            reviews: '/api/reviews'
        },
        status: '🟢 Kitchen is Open!'
    });
});

// 🔌 Connecting to our database (like plugging in our appliances)
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('🎉 Yes! Connected to MongoDB!');
    } catch (err) {
        console.error('😢 Database connection failed:', err.message);
        process.exit(1);
    }
};

// 📡 Keeping an eye on our database connection
mongoose.connection.on('error', err => {
    console.error('🔴 Database error:', err);
});

mongoose.connection.on('disconnected', () => {
    console.log('🟡 Lost database connection - trying to reconnect...');
});

mongoose.connection.on('reconnected', () => {
    console.log('🟢 Back online! Database reconnected');
});

// 🚀 Starting our server (opening the kitchen)
const startServer = async () => {
    try {
        await connectDB();
        
        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
            console.log(`
🍳 = = = = = = = = = = = = = = = = = = = = = =
🚀 Server is sizzling on port ${PORT}!
📖 API Documentation: http://localhost:${PORT}
👩‍🍳 Ready to cook up some amazing recipes!
= = = = = = = = = = = = = = = = = = = = = = =`);
        });
    } catch (error) {
        console.error('💥 Server startup failed:', error);
        process.exit(1);
    }
};

// 🛡️ Global error handling - catching any kitchen mishaps
app.use((err, req, res, next) => {
    console.error('🔴 Oops! Error:', err.stack);
    
    // Handle different types of errors
    if (err.name === 'ValidationError') {
        return res.status(400).json({ 
            message: 'Recipe validation failed!',
            details: Object.values(err.errors).map(error => error.message)
        });
    }
    
    if (err.name === 'CastError') {
        return res.status(400).json({ 
            message: 'Hmm... that ID doesn\'t look right. Double-check it!'
        });
    }

    res.status(err.status || 500).json({ 
        message: err.message || 'Oops! Something went wrong in the kitchen!',
        status: 'error'
    });
});

// 🚫 404 handler - when someone tries a route that doesn't exist
app.use((req, res) => {
    res.status(404).json({ 
        message: 'Oops! This isn\'t a recipe we know about!',
        tip: 'Check the URL and try again',
        availableRoutes: {
            recipes: '/api/recipes',
            categories: '/api/categories',
            reviews: '/api/reviews'
        }
    });
});

// 🔄 Graceful shutdown - cleaning up the kitchen before we close
async function gracefulShutdown(signal) {
    console.log(`\n${signal} received. Cleaning up the kitchen...`);
    try {
        await mongoose.connection.close();
        console.log('📦 Database connection closed safely.');
        process.exit(0);
    } catch (err) {
        console.error('💥 Error during cleanup:', err);
        process.exit(1);
    }
}

// 🛑 Handling different ways our server might need to shut down
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

// ⚠️ Catching any unhandled problems
process.on('unhandledRejection', (reason, promise) => {
    console.error('🚨 Unhandled Promise Rejection:', reason);
    // Log it but don't crash the server
});

process.on('uncaughtException', (error) => {
    console.error('💥 Uncaught Exception:', error);
    gracefulShutdown('UNCAUGHT EXCEPTION');
});

// 🎬 Action! Start the server
startServer();
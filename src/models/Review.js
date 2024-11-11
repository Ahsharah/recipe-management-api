const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    recipeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Recipe',
        required: [true, 'Recipe reference is required']
    },
    rating: {
        type: Number,
        required: [true, 'Rating is required'],
        min: [1, 'Rating must be at least 1'],
        max: [5, 'Rating cannot be more than 5']
    },
    comment: {
        type: String,
        required: [true, 'Review comment is required'],
        trim: true,
        minlength: [5, 'Comment must be at least 5 characters long'],
        maxlength: [500, 'Comment cannot exceed 500 characters']
    },
    userName: {
        type: String,
        required: [true, 'User name is required'],
        trim: true,
        minlength: [2, 'Username must be at least 2 characters long'],
        maxlength: [50, 'Username cannot exceed 50 characters']
    },
    createdAt: {
        type: Date,
        default: Date.now,
        immutable: true
    }
});

// Compound index for efficient queries
reviewSchema.index({ recipeId: 1, createdAt: -1 });

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
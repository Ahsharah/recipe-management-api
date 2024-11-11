const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    ingredients: [{
        name: String,
        amount: String,
        unit: String
    }],
    instructions: [{
        type: String,
        required: true
    }],
    prepTime: {
        type: Number,
        min: 0
    },
    cookTime: {
        type: Number,
        min: 0
    },
    difficulty: {
        type: String,
        enum: ['Easy', 'Medium', 'Hard'],
        default: 'Medium'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Index for quick searches by title
recipeSchema.index({ title: 1 });

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
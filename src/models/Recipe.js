const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Recipe title is required'],
        trim: true,
        minlength: [3, 'Title must be at least 3 characters long'],
        maxlength: [100, 'Title cannot be more than 100 characters']
    },
    ingredients: [{
        name: {
            type: String,
            required: [true, 'Ingredient name is required'],
            trim: true
        },
        amount: {
            type: String,
            required: [true, 'Amount is required'],
            trim: true
        },
        unit: {
            type: String,
            required: [true, 'Unit is required'],
            trim: true,
            enum: {
                values: ['cups', 'tablespoons', 'teaspoons', 'ounces', 'pounds', 'grams', 'pieces', 'to taste'],
                message: '{VALUE} is not a supported unit'
            }
        },
        _id: false
    }],
    instructions: [{
        type: String,
        required: [true, 'Instructions are required'],
        trim: true,
        minlength: [10, 'Each instruction step must be at least 10 characters']
    }],
    prepTime: {
        type: Number,
        required: [true, 'Prep time is required'],
        min: [0, 'Prep time cannot be negative'],
        max: [1440, 'Prep time cannot be more than 24 hours']
    },
    cookTime: {
        type: Number,
        required: [true, 'Cook time is required'],
        min: [0, 'Cook time cannot be negative'],
        max: [1440, 'Cook time cannot be more than 24 hours']
    },
    difficulty: {
        type: String,
        required: [true, 'Difficulty level is required'],
        enum: {
            values: ['Easy', 'Medium', 'Hard'],
            message: '{VALUE} is not a supported difficulty level'
        }
    },
    createdAt: {
        type: Date,
        default: Date.now,
        immutable: true // Can't be modified after creation
    }
});

// Index for quick searches by title
recipeSchema.index({ title: 1 });

// Custom validation: must have at least one ingredient
recipeSchema.path('ingredients').validate(function(ingredients) {
    return ingredients.length > 0;
}, 'Recipe must have at least one ingredient');

// Custom validation: must have at least one instruction
recipeSchema.path('instructions').validate(function(instructions) {
    return instructions.length > 0;
}, 'Recipe must have at least one instruction');

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
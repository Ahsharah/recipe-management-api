// 🍳 My Recipe model - where the cooking magic happens!
const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Every delicious recipe needs a title!'],
        trim: true,
        minlength: [3, 'Title must be at least 3 characters long'],
        maxlength: [100, 'Whoa! Keep the title under 100 characters']
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: [true, 'Recipe must belong to a category - where should we file this yummy dish?']
    },
    ingredients: [{
        name: {
            type: String,
            required: [true, 'What ingredients do we need?'],
            trim: true
        },
        amount: {
            type: String,
            required: [true, 'How much do we need?'],
            trim: true
        },
        unit: {
            type: String,
            required: [true, 'Cups? Tablespoons? What are we measuring with?'],
            trim: true,
            enum: {
                values: ['cups', 'tablespoons', 'teaspoons', 'ounces', 'pounds', 'grams', 'pieces', 'to taste'],
                message: 'Oops! {VALUE} is not a unit we use. Stick to the basics!'
            }
        }
    }],
    instructions: [{
        type: String,
        required: [true, 'We need steps to make this!'],
        trim: true,
        minlength: [10, 'Each step needs more detail - help us cook it right!']
    }],
    prepTime: {
        type: Number,
        required: [true, 'How long does it take to prep?'],
        min: [0, "Prep time can't be negative!"],
        max: [1440, 'This recipe takes longer than a day to prep?!']
    },
    cookTime: {
        type: Number,
        required: [true, 'How long does it take to cook?'],
        min: [0, "Cook time can't be negative!"],
        max: [1440, 'This recipe takes longer than a day to cook?!']
    },
    difficulty: {
        type: String,
        required: [true, 'How tricky is this to make?'],
        enum: {
            values: ['Easy', 'Medium', 'Hard'],
            message: '{VALUE} is not a valid difficulty level'
        }
    },
    createdAt: {
        type: Date,
        default: Date.now,
        immutable: true
    }
});

// 🔍 Make searching for recipes super fast!
recipeSchema.index({ title: 1 });
recipeSchema.index({ categoryId: 1 });

// ✅ Make sure we have ingredients
recipeSchema.path('ingredients').validate(function(ingredients) {
    return ingredients.length > 0;
}, 'Come on, a recipe needs at least one ingredient!');

// ✅ Make sure we have instructions
recipeSchema.path('instructions').validate(function(instructions) {
    return instructions.length > 0;
}, 'We need at least one step to make this!');

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
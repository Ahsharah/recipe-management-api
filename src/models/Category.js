// 🌟 My awesome Category model - where we organize all our yummy recipes!
const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Hey! Every category needs a name!'],
        unique: true,
        trim: true,
        minlength: [2, 'Category name must be longer than that!'],
        maxlength: [30, 'Whoa there! Keep the name under 30 characters']
    },
    description: {
        type: String,
        required: [true, 'We need to know what this category is about!'],
        trim: true,
        minlength: [10, 'Description needs to be a bit longer'],
        maxlength: [200, 'Keep it under 200 characters please!']
    },
    createdAt: {
        type: Date,
        default: Date.now,
        immutable: true // Once set, that's it!
    }
}, {
    // Let's make sure we can populate those virtual fields
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// 🔍 This helps us find recipes in each category super fast!
categorySchema.virtual('recipes', {
    ref: 'Recipe',
    localField: '_id',
    foreignField: 'categoryId'
});

// 📝 Make sure category names are unique (case-insensitive)
categorySchema.index({ name: 1 }, { 
    unique: true,
    collation: { locale: 'en', strength: 2 }
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Category name is required'],
        unique: true,
        trim: true,
        minlength: [2, 'Category name must be at least 2 characters'],
        maxlength: [30, 'Category name cannot exceed 30 characters'],
        validate: {
            validator: function(v) {
                // No special characters except spaces and hyphens
                return /^[a-zA-Z0-9\s-]+$/.test(v);
            },
            message: props => `${props.value} contains invalid characters!`
        }
    },
    description: {
        type: String,
        trim: true,
        required: [true, 'Category description is required'],
        minlength: [10, 'Description must be at least 10 characters'],
        maxlength: [200, 'Description cannot exceed 200 characters']
    },
    createdAt: {
        type: Date,
        default: Date.now,
        immutable: true
    }
});

// Case-insensitive index for unique category names
categorySchema.index({ name: 1 }, { 
    unique: true,
    collation: { locale: 'en', strength: 2 }
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
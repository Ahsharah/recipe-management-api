const mongoose = require('mongoose');
const Recipe = require('../models/Recipe');
const Category = require('../models/Category');
const Review = require('../models/Review');
require('dotenv').config();

const sampleCategories = [
    { name: "Breakfast", description: "Start your day with these delicious breakfast recipes" },
    { name: "Main Dishes", description: "Hearty and satisfying main course recipes" },
    { name: "Desserts", description: "Sweet treats and dessert recipes for any occasion" },
    { name: "Appetizers", description: "Perfect starters and party snacks" },
    { name: "Vegetarian", description: "Delicious meat-free recipes for everyone" },
    { name: "Quick Meals", description: "Fast and easy recipes ready in 30 minutes or less" }
];

const sampleRecipes = [
    {
        title: "Classic Pancakes",
        ingredients: [
            { name: "flour", amount: "2", unit: "cups" },
            { name: "milk", amount: "1", unit: "cups" },
            { name: "eggs", amount: "2", unit: "pieces" }
        ],
        instructions: [
            "Mix dry ingredients",
            "Combine with wet ingredients",
            "Cook on griddle until golden brown"
        ],
        prepTime: 10,
        cookTime: 15,
        difficulty: "Easy"
    },
    {
        title: "Spaghetti Carbonara",
        ingredients: [
            { name: "spaghetti", amount: "1", unit: "pounds" },
            { name: "eggs", amount: "3", unit: "pieces" },
            { name: "parmesan", amount: "1", unit: "cups" }
        ],
        instructions: [
            "Boil pasta according to package",
            "Prepare sauce with eggs and cheese",
            "Combine and serve hot"
        ],
        prepTime: 15,
        cookTime: 20,
        difficulty: "Medium"
    }
    // Add more recipes...
];

// We'll add reviews after we have recipe IDs
const createSampleData = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        // Clear existing data
        await Promise.all([
            Recipe.deleteMany({}),
            Category.deleteMany({}),
            Review.deleteMany({})
        ]);

        // Insert categories
        const categories = await Category.insertMany(sampleCategories);
        console.log('Categories created');

        // Insert recipes
        const recipes = await Recipe.insertMany(sampleRecipes);
        console.log('Recipes created');

        // Create reviews for recipes
        const sampleReviews = recipes.flatMap(recipe => ([
            {
                recipeId: recipe._id,
                rating: 5,
                comment: "Absolutely delicious! Will make again.",
                userName: "FoodLover1"
            },
            {
                recipeId: recipe._id,
                rating: 4,
                comment: "Great recipe, added my own twist.",
                userName: "ChefJohn"
            }
        ]));

        await Review.insertMany(sampleReviews);
        console.log('Reviews created');

        console.log('Sample data created successfully!');
    } catch (error) {
        console.error('Error creating sample data:', error);
    } finally {
        await mongoose.disconnect();
    }
};

createSampleData();
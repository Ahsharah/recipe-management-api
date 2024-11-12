const express = require('express');
const router = express.Router();
const Category = require('../models/Category');

// Get all our recipe categories!
router.get('/', async (req, res) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Find a specific category
router.get('/:id', async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (category) {
            res.json(category);
        } else {
            res.status(404).json({ message: 'Category not found!' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create a new category
router.post('/', async (req, res) => {
    const category = new Category({
        name: req.body.name,
        description: req.body.description
    });

    try {
        const newCategory = await category.save();
        res.status(201).json(newCategory);
    } catch (error) {
        // Handle duplicate category names nicely
        if (error.code === 11000) {
            return res.status(400).json({ 
                message: 'This category already exists! Try a different name.' 
            });
        }
        res.status(400).json({ message: error.message });
    }
});

// Update a category
router.put('/:id', async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        if (req.body.name) category.name = req.body.name;
        if (req.body.description) category.description = req.body.description;

        const updatedCategory = await category.save();
        res.json(updatedCategory);
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ 
                message: 'This category name is already taken!' 
            });
        }
        res.status(400).json({ message: error.message });
    }
});

// Delete a category
router.delete('/:id', async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        
        await category.deleteOne();
        res.json({ message: 'Category has been removed!' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
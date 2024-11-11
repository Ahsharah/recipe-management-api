const express = require('express');
const router = express.Router();
const Review = require('../models/Review');
const Recipe = require('../models/Recipe');

// GET all reviews or filter by recipe
router.get('/', async (req, res) => {
    try {
        const filter = req.query.recipeId ? { recipeId: req.query.recipeId } : {};
        const reviews = await Review.find(filter).sort({ createdAt: -1 });
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET single review
router.get('/:id', async (req, res) => {
    try {
        const review = await Review.findById(req.params.id);
        if (review) {
            res.json(review);
        } else {
            res.status(404).json({ message: 'Review not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST new review
router.post('/', async (req, res) => {
    try {
        // Check if recipe exists
        const recipeExists = await Recipe.findById(req.body.recipeId);
        if (!recipeExists) {
            return res.status(404).json({ message: 'Recipe not found' });
        }

        const review = new Review({
            recipeId: req.body.recipeId,
            rating: req.body.rating,
            comment: req.body.comment,
            userName: req.body.userName
        });

        const newReview = await review.save();
        res.status(201).json(newReview);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Update your server.js to include the new routes
router.put('/:id', async (req, res) => {
    try {
        const review = await Review.findById(req.params.id);
        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }

        if (req.body.rating) review.rating = req.body.rating;
        if (req.body.comment) review.comment = req.body.comment;
        
        const updatedReview = await review.save();
        res.json(updatedReview);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// DELETE review
router.delete('/:id', async (req, res) => {
    try {
        const review = await Review.findById(req.params.id);
        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }
        
        await review.deleteOne();
        res.json({ message: 'Review deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
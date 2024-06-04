const express = require('express');
const Restaurant = require('./models/Restaurant');

const router = express.Router();

// Create a new restaurant
router.post('/', async (req, res) => {
    try {
        const restaurant = new Restaurant(req.body);
        await restaurant.save();
        res.status(201).send(restaurant);
    } catch (error) {
        res.status(400).send({
            error: error.message,
            details: error.errors
        });
    }
});

// Retrieve restaurant details by ID
router.get('/:id', async (req, res) => {
    try {
        const restaurant = await Restaurant.findById(req.params.id);
        if (!restaurant) {
            return res.status(404).send();
        }
        res.send(restaurant);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Update restaurant information by ID
router.put('/:id', async (req, res) => {
    try {
        const restaurant = await Restaurant.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!restaurant) {
            return res.status(404).send();
        }
        res.send(restaurant);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Delete a restaurant by ID
router.delete('/:id', async (req, res) => {
    try {
        const restaurant = await Restaurant.findByIdAndDelete(req.params.id);
        if (!restaurant) {
            return res.status(404).send();
        }
        res.send(restaurant);
    } catch (error) {
        res.status(500).send(error);
    }
});

// List all restaurants
router.get('/', async (req, res) => {
    try {
        const restaurants = await Restaurant.find({});
        res.send(restaurants);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;

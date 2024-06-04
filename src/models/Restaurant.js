const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    address: {
        type: String,
        required: [true, 'Address is required']
    },
    telephone: {
        type: String,
        required: [true, 'Telephone is required']
    }
});

module.exports = mongoose.model('Restaurant', restaurantSchema);


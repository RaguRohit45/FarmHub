const mongoose = require('mongoose');

const farmerSchema = new mongoose.Schema({
    fname: { type: String, required: true },
    femail: { type: String, required: true, unique: true },
    fpassword: { type: String, required: true }
});

const Farmer = mongoose.model('Farmer Details', farmerSchema);

module.exports = Farmer;
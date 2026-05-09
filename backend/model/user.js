const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, default: '' },
    dateOfBirth: { type: Date, default: null },
    gender: { type: String, enum: ['', 'Male', 'Female', 'Other', 'Prefer not to say'], default: '' },
    occupation: { type: String, default: '' }
});

const User = mongoose.model('User Details', userSchema);

module.exports = User;
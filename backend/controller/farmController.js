const User = require('../model/user');
const Farmer = require('../model/farmer');
const generateToken = require('../utility/token');
const signupUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await User.create({ name, email, password });
        res.status(201).json({ message: 'User created successfully', user });
    } catch (error) {
        res.status(500).json({ message: 'Error creating user', error });
    }
};

const signupFarmer = async (req, res) => {
    try {
        const { fname, femail, fpassword } = req.body;
        const farmer = await Farmer.create({ fname, femail, fpassword });
        res.status(201).json({ message: 'Farmer created successfully', farmer });
    } catch (error) {
        res.status(500).json({ message: 'Error creating farmer', error });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }
        if (user.password !== password) {
            return res.status(401).json({ message: 'Invalid password' });
        }
        const token = generateToken(user);
        res.status(200).json({ message: 'User logged in successfully', user, token });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in user', error });
    }
};

const loginFarmer = async (req, res) => {
    try {
        const { femail, fpassword } = req.body;
        const farmer = await Farmer.findOne({ femail });
        if (!farmer) {
            return res.status(401).json({ message: 'Farmer not found' });
        }
        if (farmer.fpassword !== fpassword) {
            return res.status(401).json({ message: 'Invalid password' });
        }
        const token = generateToken(farmer);
        res.status(200).json({ message: 'Farmer logged in successfully', farmer, token });
    }catch (error) {
        res.status(500).json({ message: 'Error logging in farmer', error });
    }
}

module.exports = { signupUser, signupFarmer, loginUser, loginFarmer };

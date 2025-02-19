const User = require("../models/User");
const jwt = require("jsonwebtoken");

// const generateToken = (user) => {
//     return jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
// };

// Signup
exports.signup = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) return res.status(400).json({ message: "All fields are required" });

        const userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ message: "Email already in use" });

        const user = await User.create({ username, email, password });
        res.status(201).json({ user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Login
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) return res.status(400).json({ message: "All fields are required" });

        const user = await User.findOne({ email });
        if (!user || !(await user.comparePassword(password))) return res.status(401).json({ message: "Invalid credentials" });

        res.json({ user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

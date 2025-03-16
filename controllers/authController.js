const User = require("../models/User");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
    try {
        const { username, email, password, profileImage } = req.body;

        if (!username || !email || !password || !profileImage) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ message: "Email already in use" });

        const user = await User.create({ username, email, password, profileImage });

        res.status(201).json({ user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


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

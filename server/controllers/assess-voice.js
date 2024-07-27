const gemini = require('../utils/gemini');
const jwt = require('jsonwebtoken');
const userModel = require('../models/user');
const dotenv = require('dotenv');
dotenv.config();

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const assess_voice = async (req, res) => {
    const { question, answer } = req.body;
    const voice = `${question} ${answer}`;
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: "Unauthorized: No token provided" });
        }

        let user;
        try {
            user = jwt.verify(token, JWT_SECRET_KEY);
        } catch (error) {
            return res.status(401).json({ message: "Unauthorized: Invalid token" });
        }

        const existingUser = await userModel.findOne({ email: user.email });
        if (!existingUser) {
            return res.status(404).json({ message: "User not found" });
        }

        const response = await gemini.run(voice);  // Run Gemini and await the response

        existingUser.scores.push(response.text()); 
        await existingUser.save();

        return res.status(200).json({ response });

    } catch (error) {
        console.error("Error in assess_voice:", error);
        return res.status(500).json({ message: "Something went wrong in assess_voice" });
    }
};

module.exports = assess_voice;  // Correctly export the function

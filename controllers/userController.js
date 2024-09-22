import User from '../models/userModel.js'; // Ensure to import the User model
import bcrypt from 'bcryptjs';

export const registerUser = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const userExistsByEmail = await User.findOne({ email });
        const userExistsByUsername = await User.findOne({ username });

        if (userExistsByEmail) {
            return res.status(400).json({ message: 'Email already in use' });
        }

        if (userExistsByUsername) {
            return res.status(400).json({ message: 'Username already taken' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, email, password: hashedPassword });

        await user.save();
        res.status(201).json({
            message: 'User registered successfully',
            userId: user._id // Include the user ID in the response
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

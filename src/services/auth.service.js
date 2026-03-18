import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { User } from '../models/User.model.js';
import { CustomError } from '../utils/CustomError.js';

export const registerUserService = async (data) => {
    const { name, email, password } = data;

    if (!name || !email || !password) {
        throw new CustomError('All fields are required', 400);
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new CustomError('Email already registered', 400);
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
        name,
        email,
        password: hashedPassword
    });

    return user;
};

export const loginUserService = async (data) => {
    const { email, password } = data;

    if (!email || !password) {
        throw new CustomError('Email and password are required', 401);
    }

    const user = await User.findOne({email});
    if (!user) {
        throw new CustomError('Invalid credentials', 401);
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new CustomError('Invalid credentials', 401);
    }

    const token = jwt.sign(
        {
            userId: user._id,
            role: user.role
        },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRES_IN
        }
    );

    return {
        token,
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        }
    };
};
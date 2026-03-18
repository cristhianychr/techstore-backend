import { registerUserService } from '../services/auth.service.js';
import { loginUserService } from '../services/auth.service.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const register = asyncHandler(async (req, res) => {
    const user = await registerUserService(req.body);
    res.status(201).json({
        message: 'User registered succesfully',
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        }
    });
});


export const login = asyncHandler(async (req, res) => {
    const result = await loginUserService(req.body);
    res.status(200).json({
        message: 'Login successful',
        ...result
    });

});


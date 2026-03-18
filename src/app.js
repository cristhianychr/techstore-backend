import express from 'express';
import authRoutes from './routes/auth.routes.js';
import adminRoutes from './routes/admin.routes.js';
import categoryRoutes from './routes/category.routes.js';
import productRoutes from './routes/product.routes.js';
import orderRoutes from './routes/order.routes.js';
import { authenticate } from './middlewares/auth.middleware.js';
import { errorHandler } from './middlewares/error.middleware.js';

const app = express();

app.use(express.json());

app.use('/api/auth', authRoutes);
// Protected route example (Authenticate middleware will verify the token before granting access)
app.get('/api/profile', authenticate, (req, res) => {
    res.json({
        message: 'Access granted',
        user: req.user
    });
});
// Admin routes (Protected by authentication and role-based authorization)
app.use('/api/admin', adminRoutes);
// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ 
                status: 'OK',
                message: 'TechStore API running'
            })
});
// Category routes
app.use('/api/categories', categoryRoutes);
// Product routes
app.use('/api/products', productRoutes);
// Order routes
app.use('/api/orders', orderRoutes);

app.use(errorHandler);

export default app;
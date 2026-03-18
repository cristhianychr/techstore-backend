import { Router } from 'express';
import { authenticate } from '../middlewares/auth.middleware.js';
import { authorizeRoles } from '../middlewares/authorize.middleware.js';

const router = Router();

router.get('/dashboard',
            authenticate,
            authorizeRoles('ADMIN'),
            (req,res) => {
                res.json({ message: 'Welcome Admin Dashboard' });
            });

export default router;
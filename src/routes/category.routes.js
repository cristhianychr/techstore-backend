import { Router } from 'express';
import {
    createCategory,
    getCategories,
    updateCategory,
    deleteCategory
} from '../controllers/category.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';
import { authorizeRoles } from '../middlewares/authorize.middleware.js';
import { validate } from '../middlewares/validate.middleaware.js';
import { createCategorySchema,
        updateCategorySchema } from '../validations/category.validation.js';

const router = Router();

router.get('/', getCategories);
router.post(
    '/', 
    authenticate, 
    authorizeRoles('ADMIN'),
    validate(createCategorySchema),
    createCategory
);
router.put(
    '/:id',
    authenticate, 
    authorizeRoles('ADMIN'),
    validate(updateCategorySchema),
    updateCategory
);
router.delete(
    '/:id',
    authenticate, 
    authorizeRoles('ADMIN'),
    deleteCategory
);

export default router;
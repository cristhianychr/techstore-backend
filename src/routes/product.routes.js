import Router from 'express'; 
import {
    createProduct,
    getProducts,
    updateProduct,
    deleteProduct
} from '../controllers/product.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';
import { authorizeRoles } from '../middlewares/authorize.middleware.js';
import { validate } from '../middlewares/validate.middleaware.js';
import { createProductSchema,
        updateProductSchema } from '../validations/product.validation.js';

const router = Router();

router.get('/', getProducts);
router.post('/', authenticate, authorizeRoles('ADMIN'), validate(createProductSchema), createProduct);
router.put('/:id', authenticate, authorizeRoles('ADMIN'), validate(updateProductSchema), updateProduct);
router.delete('/:id', authenticate, authorizeRoles('ADMIN'), deleteProduct)

export default router;

import Router from 'express'; 
import {
    createOrder,
    getOrders,
    getOrderById,
    updateOrder
} from '../controllers/order.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';
import { validate } from '../middlewares/validate.middleaware.js';
import { 
    createOrderSchema,
    updateOrderSchema
} from '../validations/order.validation.js';

const router = Router();

router.post('/', authenticate, validate(createOrderSchema), createOrder);
router.get('/', authenticate, getOrders);
router.get('/:id', authenticate, getOrderById);
router.patch('/:id/status', authenticate, validate(updateOrderSchema), updateOrder);

export default router;
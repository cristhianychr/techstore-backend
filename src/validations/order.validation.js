import { z } from 'zod';

export const orderItemSchema = z.object({
    productId: z.string().min(1, "Product ID is required"),
    quantity: z.number().int().positive("Quantity must be greater than 0")
});

export const createOrderSchema = z.object({
    items: z.array(orderItemSchema).min(1, "Order must be at least one item")    
}).refine((data) => {
    const ids = data.items.map(i => i.productId);
    return new Set(ids).size === ids.length;
}, {
    message: 'Order cannot contain duplicate products',
    path: ["items"]
});

export const updateOrderSchema = z.object({
    status: z.enum([
        'PENDING',
        'PAID',
        'SHIPPED',
        'CANCELLED'
    ])
});
import { z } from 'zod';

export const createProductSchema = z.object({
    sku: z.string().min(3),
    name: z.string().min(3),
    description: z.string().optional(),
    brand: z.string().min(2),
    category: z.string().length(24),
    price: z.number().min(0),
    stock: z.number().min(0)
});

export const updateProductSchema = z.object({
    name: z.string().min(3).optional(),
    description: z.string().optional(),
    brand: z.string().min(2).optional(),
    category: z.string().length(24).optional(),
    price: z.number().min(0).optional(),
    stock: z.number().min(0).optional()
});
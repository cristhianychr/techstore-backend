import {
    createProductService,
    getProductsService,
    updateProductService,
    deleteProductService
} from '../services/product.service.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const createProduct = asyncHandler(async (req, res) => {
    const product = await createProductService(req.body, req.user.userId);
    res.status(201).json(product);
});

export const getProducts = asyncHandler(async (req, res) => {
    const products = await getProductsService(req.query);
    res.status(200).json(products);
});

export const updateProduct = asyncHandler(async (req, res) => {
    const product = await updateProductService(req.params.id, req.body, req.user.userId);
    res.status(200).json(product);
});

export const deleteProduct = asyncHandler(async (req, res) => {
    await deleteProductService(req.params.id, req.user.userId);
    res.json({ message: 'Product deleted successfully' });
});
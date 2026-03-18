import {
    createCategoryService,
    getAllCategoriesService,
    updateCategoryService,
    deleteCategoryService
} from '../services/category.service.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const createCategory = asyncHandler(async (req, res) => {
    const category = await createCategoryService(req.body, req.user.userId);
    res.status(201).json(category);
});

export const getCategories = asyncHandler(async (req, res) => {
    const categories = await getAllCategoriesService();
    res.status(200).json(categories);
});

export const updateCategory = asyncHandler(async (req, res) => {
    const category = await updateCategoryService(req.params.id, req.body, req.user.userId);
    res.status(200).json(category);
});

export const deleteCategory = asyncHandler(async (req, res) => {
    await deleteCategoryService(req.params.id, req.user.userId);
    res.json({ message: 'Category deleted successfully' });
});
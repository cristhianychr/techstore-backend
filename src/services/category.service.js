import { Category } from '../models/Category.model.js';
import { CustomError } from '../utils/CustomError.js';
import { logAudit } from './audit.service.js';
import { withAudit } from '../middlewares/audit.middleware.js';
import { AUDIT_ACTIONS } from '../constants/audit.actions.js';
import { AUDIT_ENTITIES } from '../constants/audit.entities.js';

export const createCategoryService = withAudit(
    {
        action: AUDIT_ACTIONS.CREATE,
        entity: AUDIT_ENTITIES.CATEGORY
    },
    async (data, userId) => {
        const { name, description } = data;

        const exists = await Category.findOne({ name });
        if (exists) {
            throw new CustomError('Category already exists', 400);
        }

        const category = await Category.create({
            name,
            description
        });

        return {
            entityId: category._id,
            newData: category.toObject(),
            data: category
        };
    }
);

export const getAllCategoriesService = async () => {
    return await Category.find({ isActive: true }).sort({ name: 1 });
};

export const updateCategoryService = withAudit(
    {
        action: AUDIT_ACTIONS.UPDATE,
        entity: AUDIT_ENTITIES.CATEGORY
    },
    async (id, data, userId) => {
        const category = await Category.findById(id);

        if (!category || !category.isActive) {
            throw new CustomError('Category not found', 404);
        }

        const oldCategory = category.toObject();

        Object.assign(category, data);
        await category.save();

        return {
            entityId: category._id,
            oldData: oldCategory,
            newData: category.toObject(),
            data: category
        };
    }
);

export const deleteCategoryService = withAudit(
    {
        action: AUDIT_ACTIONS.DELETE,
        entity: AUDIT_ENTITIES.CATEGORY
    },
    async (id, userId) => {
        const category = await Category.findById(id);

        if (!category || !category.isActive) {
            throw new CustomError('Category not found', 404);
        }

        const oldCategory = category.toObject();

        category.isActive = false;
        await category.save();

        return {
            entityId: category._id,
            oldData: oldCategory,
            newData: category.toObject()
        };
    }
);
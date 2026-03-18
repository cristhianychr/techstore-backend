import { Product } from '../models/Product.model.js'
import { Category } from '../models/Category.model.js'
import { CustomError } from '../utils/CustomError.js';
import { withAudit } from '../middlewares/audit.middleware.js';
import { AUDIT_ACTIONS } from '../constants/audit.actions.js';
import { AUDIT_ENTITIES } from '../constants/audit.entities.js';

export const createProductService = withAudit(
    {
        action: AUDIT_ACTIONS.CREATE,
        entity: AUDIT_ENTITIES.PRODUCT
    },
    async (data, userId) => {
        const { sku, name, brand, category, price, stock } = data;

        const categoryExists = await Category.findById(category);
        if (!categoryExists || !categoryExists.isActive) {
            throw new CustomError('Invalid category', 404);
        }

        const existingSku = await Product.findOne({ sku });
        if (existingSku) {
            throw new CustomError('SKU already exists', 400);
        }

        const product = await Product.create(data);

        return {
            entityId: product._id,
            newData: product.toObject(),
            data: product
        };
    }
);

export const getProductsService = async (query) => {
    const { 
        search, 
        category,
        brand, 
        minPrice, 
        maxPrice,
        page = 1,
        limit = 10 
    } = query;

    const filters = { isActive: true };

    if (search) {
        filters.name = { $regex: search, $options: 'i' };
    }

    if (category) {
        filters.category = category;
    }

    if (brand) {
        filters.brand = { $regex: brand, $options: 'i' };
    }

    if (minPrice || maxPrice) {
        filters.price = {};
        if (minPrice) filters.price.$gte = Number(minPrice);
        if (maxPrice) filters.price.$lte = Number(maxPrice);
    }

    const pageNumber = Number(page);
    const limitNumber = Number(limit);
    const skip = (pageNumber-1)*limitNumber;

    const total = await Product.countDocuments(filters);

    const products = await Product.find(filters)
        .populate('category', 'name')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limitNumber);

    const totalPages = Math.ceil(total/limitNumber);

    return {
        data: products,
        total,
        page: pageNumber,
        limit: limitNumber,
        totalPages,
        hasNextPage: pageNumber < totalPages,
        hasPrevPage: pageNumber > 1
    }

};

export const updateProductService = withAudit(
    {
        action: AUDIT_ACTIONS.UPDATE,
        entity: AUDIT_ENTITIES.PRODUCT
    },
    async (id, data, userId) => {
        const product = await Product.findById(id);
        
        if(!product || !product.isActive) {
            throw new CustomError('Product not found', 404);
        }

        if(data.category) {
            const categoryExists = await Category.findById(data.category);
            if (!categoryExists || !categoryExists.isActive) {
                throw new CustomError('Invalid category', 400);
            }
        }

        const oldProduct = product.toObject();

        Object.assign(product, data);

        await product.save();

        return {
            entityId: product._id,
            oldData: oldProduct,
            newData: product.toObject(),
            data: product
        };
    }
);

export const deleteProductService = withAudit(
    {
        action: AUDIT_ACTIONS.DELETE,
        entity: AUDIT_ENTITIES.PRODUCT
    }
    ,async (id, userId) => {
        const product = await Product.findById(id);

        if(!product || !product.isActive) {
            throw new CustomError('Product not found', 404);
        }

        const oldProduct = product.toObject();

        product.isActive = false;

        await product.save();

        return {
            entityId: product._id,
            oldData: oldProduct,
            newData: product.toObject()
        };
    }
);


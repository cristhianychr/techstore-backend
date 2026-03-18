import mongoose from 'mongoose';
import { Order } from '../models/Order.model.js';
import { Product } from '../models/Product.model.js';
import { CustomError } from '../utils/CustomError.js';
import { withAudit } from '../middlewares/audit.middleware.js';
import { AUDIT_ACTIONS } from '../constants/audit.actions.js';
import { AUDIT_ENTITIES } from '../constants/audit.entities.js';

export const createOrderService = withAudit(
    {
        action: AUDIT_ACTIONS.CREATE,
        entity: AUDIT_ENTITIES.ORDER
    },
    async (data, userId) => {

        const session = await mongoose.startSession();

        session.startTransaction();

        try {
            const { items } = data;

            if(!items || items.length === 0) {
                throw new CustomError('Order must contain items', 400);
            }

            const orderItems = [];
            let totalAmount = 0;

            for (const item of items) {
                const product = await Product.findById(item.productId).session(session);

                if (!product || !product.isActive) {
                    throw new CustomError('Product not found', 404);
                }

                if (product.stock < item.quantity) {
                    throw new CustomError(`Insufficient stock for ${product.name}, solo hay ${product.stock} unidades`, 400);
                }

                const subtotal = item.quantity * product.price;

                orderItems.push({
                    product: product._id, 
                    name: product.name,
                    sku: product.sku,
                    price: product.price,
                    quantity: item.quantity,
                    subtotal
                });

                totalAmount += subtotal;

                product.stock -= item.quantity;

                await product.save({ session });
            }

            const order = await Order.create([{
                user: userId,
                items: orderItems,
                totalAmount
            }], { session });

            await session.commitTransaction();

            return {
                entityId: order[0]._id,
                newData: order[0].toObject(),
                data: order[0]
            };            
        } catch (error) {

            await session.abortTransaction();
            throw error;

        } finally {

            session.endSession();

        }

    }
);

export const getOrdersService = async (query) => {
    const { page = 1, limit = 10 } = query;

    const pageNumber = Number(page);
    const limitNumber = Number(limit);

    const skip = (pageNumber - 1) * limitNumber;

    const total = await Order.countDocuments();

    const orders = await Order.find()
        .populate('user', 'name email')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limitNumber);
    
    return {
        data: orders,
        total,
        page: pageNumber
   };
};

export const getOrderByIdService = async (id) => {
    const order = await Order.findById(id)
        .populate('user', 'name email')
        .populate('items.product', 'name sku')
    
    if (!order) {
        throw new CustomError('Order not found', 404);
    }

    return order;
};

export const updateOrderService = withAudit(
    {
        action: AUDIT_ACTIONS.UPDATE,
        entity: AUDIT_ENTITIES.ORDER
    },
    async (id, status, userId) => {

        const session = await mongoose.startSession();

        session.startTransaction();

        try {
            const order = await Order.findById(id).session(session);

            if (!order) {
                throw new CustomError('Order not found', 404);
            }

            const oldOrder = order.toObject();

            if ( status === order.status ) {
                throw new CustomError(`Order has already been ${order.status}`, 400);
            }

            if ( status === 'CANCELLED' && order.status !== 'CANCELLED' ) {
                for ( const item of order.items ) {

                    const product = await Product.findById(item.product).session(session);

                    if (product) {
                        product.stock += item.quantity;
                        await product.save({ session });
                    }
                }
            }

            order.status = status;

            await order.save({ session });

            await session.commitTransaction();

            return {
                entityId: order._id,
                oldData: oldOrder,
                newData: order.toObject(),
                data: order
            };
        } catch (error) {

            await session.abortTransaction();
            throw error;

        } finally {

            session.endSession();

        }
        
    }
);
import {
    createOrderService,
    getOrdersService,
    getOrderByIdService,
    updateOrderService
} from '../services/order.service.js';

import { asyncHandler } from '../utils/asyncHandler.js';
  
export const createOrder = asyncHandler(async (req, res) => {
    const order = await createOrderService(req.body, req.user.userId);
    res.status(201).json(order);
});

export const getOrders = asyncHandler(async (req, res) => {
    const orders = await getOrdersService(req.query);
    res.status(200).json(orders);
});

export const getOrderById = asyncHandler(async (req, res) => {
    const order = await getOrderByIdService(req.params.id);
    res.status(200).json(order);
});

export const updateOrder = asyncHandler(async (req, res) => {
    const order = await updateOrderService(req.params.id, req.body.status, req.user.userId);
    res.status(200).json(order);
});
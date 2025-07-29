import { includes } from "zod/v4";
import Order from "../models/Order.js";
import OrderItem from "../models/OrderItem.js";
import Products from "../models/ProductModel.js";
import User from "../models/UserModel.js";

const createOrder = async (req, res) => {
  try {
    const {
      body: { userId, products },
    } = req;

    // Validate if the request is null. user, products, and total all can't be null.
    if (!userId || !Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ message: "Invalid order data." });
    }
    //Validate if the user existed, if no, send error message.
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    //Validate if all products valid and existed, if no, send error message.
    const productIds = products.map((p) => p.productId);
    const validProducts = await Products.findAll({ where: { id: productIds } });
    if (validProducts.length !== productIds.length) {
      return res
        .status(400)
        .json({ message: "One or more products not found" });
    }
    const priceMap = {};
    validProducts.forEach((product) => {
      priceMap[product.id] = product.price;
    });

    let total = 0;
    for (const item of products) {
      const price = priceMap[item.productId];
      total += price * item.quantity;
    }
    console.log(total);

    //Create Order
    const newOrder = await Order.create({ userId, total });

    //Create OrderItems
    const orderItems = products.map((p) => ({
      orderId: newOrder.id,
      productId: p.productId,
      quantity: p.quantity,
    }));

    await OrderItem.bulkCreate(orderItems);

    //Response
    res.status(201).json({
      message: "Order created successfully!",
      orderId: newOrder.id,
      products,
      total: total.toFixed(2),
    });
  } catch (error) {
    console.error("Create order error", error);
    res.status(500).json({ message: "Server error creating order." });
  }
};

const getOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({
      include: {
        model: OrderItem,
        as: "products",
        attributes: ["productId", "quantity"],
      },
    });
    res.json(orders);
  } catch (error) {
    console.error("Error fetching the Orders", error);
    res.status(500).json({ message: "Server error retrieving orders" });
  }
};

const getOrderById = async (req, res) => {
  try {
    const id = +req.params.id;
    const order = await Order.findByPk(id);
    res.json(order);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Errors" });
  }
};

const updateOrder = async (req, res) => {
  try {
    const {
      body: { userId, products },
      params: { id },
    } = req;

    const order = await Order.findByPk(id);
    if (!order) return res.status(404).json({ error: "Order not found" });
    await order.update(req.body);
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const {
      params: { id },
    } = req;
    const order = await Order.findByPk(id);
    if (!order) return res.status(404).json({ error: "Order not found" });
    await order.destroy();
    res.json({ message: "Order deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { getOrders, getOrderById, createOrder, updateOrder, deleteOrder };

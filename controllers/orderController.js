import Order from "../models/OrderModel.js";
import OrderItem from "../models/OrderItem.js";

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

const createOrder = async (req, res) => {
  try {
    const {
      body: { userId, total, products },
    } = req;

    // Validate if the request is null.
    const newOrder = await Order.create({ userId, total });
    const orderItems = products.map((p) => ({
      orderId: newOrder.id,
      productId: p.productId,
      quantity: p.quantity,
    }));
    await OrderItem.bulkCreate(orderItems);
    res
      .status(201)
      .json({ message: "Order created successfully!", orderId: newOrder.id });
  } catch (error) {
    console.error(error);

    res.status(500).json({ message: "Server error creating order." });
  }
};

const updateOrder = async (req, res) => {
  try {
    const {
      body: { userId, products, total },
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

import Order from "../models/Order.js";
import OrderItem from "../models/OrderItem.js";
import Products from "../models/ProductModel.js";
import User from "../models/UserModel.js";

const calculateTotalPrice = (validProducts, products) => {
  const priceMap = {};
  validProducts.forEach((product) => {
    priceMap[product.id] = product.price;
  });

  let total = 0;
  for (const item of products) {
    const price = priceMap[item.productId];
    total += price * item.quantity;
  }
  return total;
  // console.log(total);
};

const createOrder = async (req, res) => {
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
    return res.status(400).json({ message: "One or more products not found" });
  }
  const total = calculateTotalPrice(validProducts, products);

  //Create Order
  const newOrder = await Order.create({ userId, total });

  //Create OrderItems: {orderId:1,productId:2,quantity:2}
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
    products, //This is where you decide to show the two models in one response
    total: total.toFixed(2),
  });
};

const getOrders = async (req, res) => {
  const orders = await Order.findAll({
    include: {
      model: OrderItem,
      as: "products",
      attributes: ["productId", "quantity"],
    },
  });
  res.json(orders);
};

const getOrderById = async (req, res) => {
  const {
    params: { id },
  } = req;
  const order = await Order.findByPk(id, {
    include: {
      model: OrderItem,
      as: "products",
      attributes: ["productId", "quantity"],
    },
  });
  if (!order) throw new Error("Order not found");
  res.json(order);
};

const updateOrder = async (req, res) => {
  const {
    params: { id },
    body: { products }, // expecting products: [{ productId, quantity }]
  } = req;

  const order = await Order.findByPk(id, {
    include: {
      model: OrderItem,
      as: "products",
      attributes: ["id", "productId", "quantity"],
    },
  });
  if (!order) throw new Error("Order not found");

  if (products && Array.isArray(products)) {
    //Remove existing order items
    await OrderItem.destroy({ where: { orderId: id } });

    //Get product prices
    const productIds = products.map((p) => p.productId);
    // console.log(productIds);
    const validProducts = await Products.findAll({ where: { id: productIds } });

    const total = calculateTotalPrice(validProducts, products);

    //create new order items
    const orderItems = products.map((p) => ({
      orderId: order.id,
      productId: p.productId,
      quantity: p.quantity,
    }));
    await OrderItem.bulkCreate(orderItems);

    //Update order total
    await order.update({ total, ...req.body });
  } else {
    // If not updating products, just update other fields

    await order.update(req.body);
  }
  // Fetch updated order
  const updatedOrder = await Order.findByPk(id, {
    include: {
      model: OrderItem,
      as: "products",
      attributes: ["productId", "quantity"],
    },
  });
  res.json(updatedOrder);
};

const deleteOrder = async (req, res) => {
  const {
    params: { id },
  } = req;
  const order = await Order.findByPk(id);
  if (!order) throw new Error("Order not found");
  await order.destroy();
  res.json({ message: "Order deleted" });
};

export { getOrders, getOrderById, createOrder, updateOrder, deleteOrder };

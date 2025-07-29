import User from "../models/UserModel.js";
import Products from "../models/ProductModel.js";

import Order from "../models/OrderModel.js";
import OrderItem from "../models/OrderItem.js";
import sequelize from "./dbConnection.js";

Order.hasMany(OrderItem, { foreignKey: "orderId", as: "products" });
OrderItem.belongsTo(Order, { foreignKey: "orderId" });

User.hasMany(Products, { foreignKey: "userId" }); // Define a one-to-many relationship
Products.belongsTo(User, { foreignKey: "userId" }); // Define the inverse relationship

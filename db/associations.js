import User from "../models/UserModel.js";
import Products from "../models/ProductModel.js";

import Order from "../models/Order.js";
import OrderItem from "../models/OrderItem.js";
import sequelize from "./dbConnection.js";

User.hasMany(Order, { foreignKey: "userId", onDelete: "CASCADE" });
Order.belongsTo(User, { foreignKey: "userId" });

Order.hasMany(OrderItem, {
  foreignKey: "orderId",
  as: "products",
  onDelete: "CASCADE",
});
OrderItem.belongsTo(Order, { foreignKey: "orderId" });

Products.hasMany(OrderItem, { foreignKey: "productId" });
OrderItem.belongsTo(Products, { foreignKey: "productId" });

User.hasMany(Products, { foreignKey: "userId" }); // Define a one-to-many relationship
Products.belongsTo(User, { foreignKey: "userId" }); // Define the inverse relationship

sequelize.sync({ alter: true });

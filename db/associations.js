import User from "./models/UserModel.js";
import Order from "../models/OrderModel.js";
import OrderItem from "../models/OrderItem.js";
import sequelize from "./db/dbConnection.js";

Order.hasMany(OrderItem, { foreignKey: "orderId", as: "products" });
OrderItem.belongsTo(Order, { foreignKey: "orderId" });

sequelize.sync({ alter: true }); // Sync the database, altering tables if necessary

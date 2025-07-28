/**
 * Order
id: Integer
userId: Integer
products: Array of objects containing productId (Integer) and quantity (Integer)
total: Float
 */

import sequelize from "../db/dbConnection.js";
import { DataTypes } from "sequelize";

const Order = sequelize.define("Order", {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  total: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});

export default Order;

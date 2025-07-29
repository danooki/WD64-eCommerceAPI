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

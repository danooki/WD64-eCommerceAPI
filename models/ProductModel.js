import { DataTypes } from "sequelize";
import sequelize from "../db/dbConnection.js";

const Products = sequelize.define("Products", {
  name: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.STRING, allowNull: false },
  price: { type: DataTypes.FLOAT, allowNull: false },
  categoryId: { type: DataTypes.INTEGER, allowNull: false },
});
sequelize.sync();

export default Products;

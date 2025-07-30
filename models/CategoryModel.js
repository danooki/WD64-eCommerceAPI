import sequelize from "../db/dbConnection.js";
import { DataTypes } from "sequelize";

const Category = sequelize.define("Category", {
  /*   categoryID: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }, */
  categoryName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default Category;

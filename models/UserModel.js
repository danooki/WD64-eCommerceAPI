import sequelize from "../db/dbConnection.js";
import { DataTypes } from "sequelize";

const User = sequelize.define("User", {
  completeName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default User;

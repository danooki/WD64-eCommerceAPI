import User from "../models/UserModel.js";
import Products from "../models/ProductModel.js";

import sequelize from "./dbConnection.js";

User.hasMany(Products, { foreignKey: "userId" }); // Define a one-to-many relationship
Products.belongsTo(User, { foreignKey: "userId" }); // Define the inverse relationship

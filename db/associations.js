import User from "./models/UserModel.js";
import sequelize from "./db/dbConnection.js";

sequelize.sync({ alter: true }); // Sync the database, altering tables if necessary

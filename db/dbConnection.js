import { Sequelize } from "sequelize";

const sequelize = new Sequelize(process.env.NEON_URI, { logging: false });
export default sequelize; // Export the sequelize instance for use in other parts of the application
// This allows you to connect to the database using the URI stored in the environment variable NEON_URI

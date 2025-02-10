import { Sequelize } from "sequelize";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const isProduction = process.env.IS_PRODUCTION === "true";

const sequelize = isProduction
  ? new Sequelize(process.env.DB_URL as string, {
      logging: false,
    })
  : new Sequelize(
      process.env.DB_NAME as string,
      process.env.DB_USER as string,
      process.env.DB_PASSWORD as string,
      {
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT) || 3306,
        dialect: process.env.DB_DIALECT as any,
        logging: false,
      }
    );

export default sequelize;

import { Model, DataTypes } from "sequelize";
import sequelize from "../config/db";

export class Admin extends Model {
  public id!: number;
  public adminId!: number;
  public fullName!: string;
  public email!: string;
  public password!: string;
  public readonly createdAt!: Date;
}

Admin.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    adminId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    fullName: {
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
  },
  {
    sequelize,
    tableName: "admin",
    timestamps: false,
  }
);

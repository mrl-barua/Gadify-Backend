import { Model, DataTypes } from "sequelize";
import sequelize from "../config/db";

export class Proponents extends Model {
  public id!: number;
  public name!: string;
  public email!: string;
  public createdAt!: Date;
  public updatedAt!: Date;
}

Proponents.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: "proponents",
    timestamps: true,
  }
);

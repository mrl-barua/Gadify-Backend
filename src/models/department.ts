import { Model, DataTypes } from "sequelize";
import sequelize from "../config/db";

export class Department extends Model {
  public id!: number;
  public name!: string;
  public createdAt!: Date;
  public updatedAt!: Date;

  // Define any additional methods for database interactions here
}

Department.init(
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
    tableName: "departments",
    timestamps: true,
  }
);

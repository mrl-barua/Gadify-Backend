import { Model, DataTypes } from "sequelize";
import sequelize from "../config/db";

export class Submission extends Model {
  public id!: number;
  public title!: string;
  public description!: string;
  public createdAt!: Date;
  public updatedAt!: Date;

  // Define any additional methods for database interactions here
}

Submission.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
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
    tableName: "submissions",
    timestamps: true,
  }
);

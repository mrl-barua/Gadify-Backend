import { Model, DataTypes } from "sequelize";
import sequelize from "../config/db";

export class Remarks extends Model {
  public id!: number;
  public submissionId!: number;
  public evaluatorId!: number;
  public comment!: string;
  public createdAt!: Date;
  public updatedAt!: Date;
}

Remarks.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    submissionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    evaluatorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    comment: {
      type: DataTypes.TEXT,
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
    tableName: "remarks",
  }
);

import { Model, DataTypes } from "sequelize";
import sequelize from "../config/db";

export class Remarks extends Model {
  public id!: number;
  public timestamp!: Date;
  public remarks!: string;
  public submissionId!: number;
}

Remarks.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    timestamp: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    remarks: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    submissionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "remarks",
    timestamps: false,
  }
);

import { Model, DataTypes } from "sequelize";
import sequelize from "../config/db";

export class Remarks extends Model {
  public id!: number;
  public remarksId!: string;
  public remarks!: string;
}

Remarks.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    remarksId: {
      type: DataTypes.STRING(10),
      allowNull: false,
      unique: true,
    },
    remarks: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "remarks",
    timestamps: false,
  }
);

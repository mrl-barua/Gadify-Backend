import { Model, DataTypes } from "sequelize";
import sequelize from "../config/db";

export class Campus extends Model {
  public id!: number;
  public campusId!: string;
  public campusName!: string;
  public campusAddress!: string;
}

Campus.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    campusId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    campusName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    campusAddress: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "Campus",
    timestamps: false,
  }
);

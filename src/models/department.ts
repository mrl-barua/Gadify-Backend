import { Model, DataTypes } from "sequelize";
import sequelize from "../config/db";
import { Campus } from "./campus";

export class Department extends Model {
  public id!: number;
  public departmentId!: string;
  public campusId!: number;
  public departmentName!: string;
}

Department.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    departmentId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    campusId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    departmentName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "Department",
    timestamps: false,
  }
);
Department.belongsTo(Campus, {
  foreignKey: "campusId",
  as: "campus",
});

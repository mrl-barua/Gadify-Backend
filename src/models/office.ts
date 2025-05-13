import { Model, DataTypes } from "sequelize";
import sequelize from "../config/db";
import { Campus } from "./campus";
import { Department } from "./department";

export class Office extends Model {
  public id!: number;
  public officeId!: string;
  public departmentId!: number;
  public officeName!: string;
}

Office.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    officeId: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    departmentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    officeName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "office",
    timestamps: false,
  }
);

Office.belongsTo(Department, {
  foreignKey: "departmentId",
  as: "department",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

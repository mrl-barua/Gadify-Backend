import { Model, DataTypes } from "sequelize";
import sequelize from "../config/db";
import { Department } from "./department";
import { Office } from "./office";

export class Evaluator extends Model {
  public id!: number;
  public evaluatorId!: string;
  public departmentId!: number;
  public officeId!: number;
  public fullName!: string;
  public email!: string;
  public password!: string;
  public signature!: Buffer | null;
  public createdAt!: Date;
}

Evaluator.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    evaluatorId: {
      type: DataTypes.STRING(10),
      allowNull: false,
      unique: true,
    },
    departmentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    officeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    fullName: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    signature: {
      type: DataTypes.BLOB,
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: "evaluator",
    timestamps: false,
  }
);

Evaluator.belongsTo(Department, {
  foreignKey: "departmentId",
  as: "department",
});
Evaluator.belongsTo(Office, { foreignKey: "officeId", as: "office" });

Department.hasMany(Evaluator, { foreignKey: "departmentId", as: "evaluators" });
Office.hasMany(Evaluator, { foreignKey: "officeId", as: "evaluators" });

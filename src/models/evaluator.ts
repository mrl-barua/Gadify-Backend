import { Model, DataTypes } from "sequelize";
import sequelize from "../config/db";
import { Campus } from "./campus";
import { Department } from "./department";
import { Office } from "./office";

export class Evaluator extends Model {
  public id!: number;
  public evaluatorId!: string;
  public campusId!: number;
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
    campusId: {
      type: DataTypes.INTEGER,
      allowNull: false,
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
    tableName: "Evaluator",
    timestamps: false,
  }
);

// Associations
Evaluator.belongsTo(Campus, { foreignKey: "campusId", as: "campus" });
Evaluator.belongsTo(Department, {
  foreignKey: "departmentId",
  as: "department",
});
Evaluator.belongsTo(Office, { foreignKey: "officeId", as: "office" });

Campus.hasMany(Evaluator, { foreignKey: "campusId", as: "evaluators" });
Department.hasMany(Evaluator, { foreignKey: "departmentId", as: "evaluators" });
Office.hasMany(Evaluator, { foreignKey: "officeId", as: "evaluators" });

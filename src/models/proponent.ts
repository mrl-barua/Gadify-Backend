import { Model, DataTypes } from "sequelize";
import sequelize from "../config/db";
import { Department } from "./department";

export enum ProponentType {
  Insider = "Insider",
  Outsider = "Outsider",
}

export enum ProponentStatus {
  Pending = "Pending",
  Approved = "Approved",
  Rejected = "Rejected",
}

export class Proponent extends Model {
  public id!: number;
  public proponentId!: string;
  public departmentId!: number;
  public proponentType!: ProponentType;
  public proponentStatus!: ProponentStatus;
  public fullName!: string;
  public email!: string;
  public password!: string;
  public isDeleted!: boolean;
  public readonly createdAt!: Date;
}

Proponent.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    proponentId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    departmentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    proponentType: {
      type: DataTypes.ENUM,
      values: Object.values(ProponentType),
      allowNull: false,
    },
    proponentStatus: {
      type: DataTypes.ENUM,
      values: Object.values(ProponentStatus),
      allowNull: false,
    },
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: "proponent",
    timestamps: false,
  }
);
Proponent.belongsTo(Department, {
  foreignKey: "departmentId",
  as: "department",
});
Department.hasMany(Proponent, {
  foreignKey: "departmentId",
  as: "proponent",
});

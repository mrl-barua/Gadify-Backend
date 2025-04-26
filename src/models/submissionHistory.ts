import { Model, DataTypes } from "sequelize";
import sequelize from "../config/db";

export class SubmissionHistory extends Model {
  public id!: number;
  public timestamp!: Date;
  public description!: string;
  public changedBy!: string;
  public submissionId!: number;
}

SubmissionHistory.init(
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
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    changedBy: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    submissionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "submissionhistory",
    timestamps: false,
  }
);

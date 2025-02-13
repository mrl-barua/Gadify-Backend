import { Model, DataTypes } from "sequelize";
import sequelize from "../config/db";

export class SubmissionEvaluators extends Model {
  public id!: number;
  public submissionId!: number;
  public evaluatorId!: number;

  // timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

SubmissionEvaluators.init(
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
  },
  {
    sequelize,
    tableName: "submissionevaluator",
    timestamps: false,
  }
);

import { Model, DataTypes } from "sequelize";
import sequelize from "../config/db";
export class SubmissionProponents extends Model {
  public id!: number;
  public submissionId!: number;
  public proponentsId!: number;

  // timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

SubmissionProponents.init(
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
    proponentsId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "submission_proponents",
  }
);

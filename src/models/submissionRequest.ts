import { Model, DataTypes } from "sequelize";
import sequelize from "../config/db";
import { Submission } from "./submission";

export class SubmissionRequest extends Model {
  public id!: number;
  public submissionId!: number;
  public resourcesLink!: string;
  public createdAt!: Date;
  public updatedAt!: Date;
}

SubmissionRequest.init(
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
    resourcesLink: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "SubmissionRequests",
    timestamps: true,
  }
);

SubmissionRequest.belongsTo(Submission, {
  foreignKey: "submissionId",
  as: "submission",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

import { Model, DataTypes } from "sequelize";
import sequelize from "../config/db";
import { Submission } from "./submission";
import { Evaluator } from "./evaluator";

export class SubmissionEvaluation extends Model {
  public id!: number;
  public submissionId!: number;
  public evaluatorId!: number;
  public createdAt!: Date;
  public updatedAt!: Date;
}

SubmissionEvaluation.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    submissionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Submission,
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    evaluatorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Evaluator,
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: "submissionevaluation",
    timestamps: true,
  }
);

Submission.hasMany(SubmissionEvaluation, {
  foreignKey: "submissionId",
  as: "evaluations",
});
Evaluator.hasMany(SubmissionEvaluation, {
  foreignKey: "evaluatorId",
  as: "evaluations",
});
SubmissionEvaluation.belongsTo(Submission, {
  foreignKey: "submissionId",
  as: "submission",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
SubmissionEvaluation.belongsTo(Evaluator, {
  foreignKey: "evaluatorId",
  as: "evaluator",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

export default SubmissionEvaluation;

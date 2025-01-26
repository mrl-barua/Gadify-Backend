import { Model, DataTypes } from "sequelize";
import sequelize from "../config/db";
import { Proponents } from "./proponents";
import { Evaluator } from "./evaluator";
import { Remarks } from "./remarks";

export class Submission extends Model {
  public id!: number;
  public submissionId!: string;
  public proponentId!: number;
  public evaluatorId!: number;
  public fileType!: "Link" | "File";
  public proposalTitle!: string;
  public proposalDescription!: string;
  public resourcesLink!: string;
  public submissionStatus!: "Pending" | "Approved" | "Rejected";
  public remarksId!: number;
  public createdAt!: Date;
}

Submission.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    submissionId: {
      type: DataTypes.STRING(10),
      unique: true,
      allowNull: false,
    },
    proponentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Proponents",
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    evaluatorId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "Evaluator",
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    fileType: {
      type: DataTypes.ENUM("Link", "File"),
      allowNull: false,
    },
    proposalTitle: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    proposalDescription: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    resourcesLink: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    submissionStatus: {
      type: DataTypes.ENUM(
        "OnHold",
        "Evaluation",
        "Completed",
        "ForCorrection"
      ),
      allowNull: false,
    },
    remarksId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "Remarks",
        key: "id",
      },
      onDelete: "SET NULL",
      onUpdate: "CASCADE",
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: "Submission",
    timestamps: false,
  }
);

Submission.belongsTo(Proponents, {
  foreignKey: "proponentId",
  as: "proponent",
});
Submission.belongsTo(Evaluator, { foreignKey: "evaluatorId", as: "evaluator" });
Submission.belongsTo(Remarks, { foreignKey: "remarksId", as: "remarks" });

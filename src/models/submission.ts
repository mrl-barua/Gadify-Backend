import { Model, DataTypes } from "sequelize";
import sequelize from "../config/db";
import { Proponent } from "./proponent";
import { Remarks } from "./remarks";

export class Submission extends Model {
  public id!: number;
  public submissionId!: string;
  public proponentId!: number;

  public fileType!: "Link" | "File";
  public proposalTitle!: string;
  public proposalDescription!: string;
  public submissionStatus!:
    | "OnHold"
    | "Evaluation"
    | "Completed"
    | "ForCorrection";
  public totalScore!: number;
  public gadScoreRemark!: string;
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
        model: "Proponent",
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

    submissionStatus: {
      type: DataTypes.ENUM(
        "OnHold",
        "Evaluation",
        "Completed",
        "ForCorrection"
      ),
      allowNull: false,
    },
    totalScore: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    gadScoreRemark: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      get() {
        const rawDate = this.getDataValue("createdAt");
        return rawDate
          ? new Date(rawDate).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })
          : null;
      },
    },
  },
  {
    sequelize,
    tableName: "submission",
    timestamps: false,
  }
);

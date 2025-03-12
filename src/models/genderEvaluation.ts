import { Model, DataTypes } from "sequelize";
import sequelize from "../config/db";

export class GenderEvaluationSection extends Model {
  public id!: number;
  public element!: string;
  public isMainSection!: boolean;
}

export class GenderEvaluationAssessment extends Model {
  public id!: number;
  public sectionId!: number;
  public submissionEvaluationId!: number;
  public doneNo!: boolean;
  public donePartly!: boolean;
  public doneYes!: boolean;
  public score!: number;
  public comments?: string;
}

GenderEvaluationSection.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    element: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    isMainSection: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "genderevaluationsection",
    timestamps: false,
  }
);

GenderEvaluationAssessment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    sectionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "genderevaluationsection",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    submissionEvaluationId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "submissionevaluation",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    doneNo: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    donePartly: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    doneYes: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    score: {
      type: DataTypes.DECIMAL(3, 1),
      allowNull: false,
    },
    comments: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "genderevaluationassessment",
    timestamps: false,
  }
);

export default GenderEvaluationAssessment;

import { SubmissionEvaluation } from "../models/submissionEvaluation";
import { Submission } from "../models/submission";
import { Evaluator } from "../models/evaluator";
import {
  GenderEvaluationAssessment,
  GenderEvaluationSection,
} from "../models/genderEvaluation";
import sequelize from "./db";

export const setupAssociations = () => {
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

  SubmissionEvaluation.hasMany(GenderEvaluationAssessment, {
    foreignKey: "submissionEvaluationId",
    as: "assessments", // ✅ Match alias
  });

  GenderEvaluationAssessment.belongsTo(SubmissionEvaluation, {
    foreignKey: "submissionEvaluationId",
    as: "submissionEvaluation",
  });

  GenderEvaluationAssessment.belongsTo(GenderEvaluationSection, {
    foreignKey: "sectionId",
    as: "section", // ✅ Ensure consistency
  });
};

import { SubmissionEvaluation } from "../models/submissionEvaluation";
import { Submission } from "../models/submission";
import { Evaluator } from "../models/evaluator";
import { SubmissionEvaluators } from "../models/submissionEvaluators";
import { SubmissionFiles } from "../models/submissionFiles";
import { Proponent } from "../models/proponent";
import { Remarks } from "../models/remarks";
import { SubmissionHistory } from "../models/submissionHistory";
import {
  GenderEvaluationAssessment,
  GenderEvaluationSection,
} from "../models/genderEvaluation";

export const setupAssociations = () => {
  Submission.belongsTo(Proponent, {
    foreignKey: "proponentId",
    as: "proponent",
  });

  Submission.hasMany(SubmissionFiles, {
    foreignKey: "submissionId",
    as: "submissionFiles",
  });

  SubmissionFiles.belongsTo(Submission, {
    foreignKey: "submissionId",
    as: "parentSubmission",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });

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
    as: "evaluatedSubmission",
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
    as: "assessments",
  });

  SubmissionEvaluators.belongsTo(Submission, {
    foreignKey: "submissionId",
    as: "submission",
  });

  SubmissionEvaluators.belongsTo(Evaluator, {
    foreignKey: "evaluatorId",
    as: "evaluator",
  });

  SubmissionEvaluators.belongsTo(SubmissionEvaluation, {
    foreignKey: "submissionEvaluationId",
    as: "submissionEvaluation",
  });

  Submission.hasMany(SubmissionEvaluators, {
    foreignKey: "submissionId",
    as: "evaluators",
  });

  SubmissionEvaluation.hasMany(GenderEvaluationAssessment, {
    foreignKey: "submissionEvaluationId",
    as: "genderAssessments",
  });

  GenderEvaluationAssessment.belongsTo(SubmissionEvaluation, {
    foreignKey: "submissionEvaluationId",
    as: "submissionEvaluation",
  });

  GenderEvaluationAssessment.belongsTo(GenderEvaluationSection, {
    foreignKey: "sectionId",
    as: "section",
  });

  SubmissionHistory.belongsTo(Submission, {
    foreignKey: "submissionId",
    as: "submission",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
  Submission.hasMany(SubmissionHistory, {
    foreignKey: "submissionId",
    as: "submissionHistory",
  });

  Remarks.belongsTo(Submission, {
    foreignKey: "submissionId",
    as: "submission",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
  Submission.hasMany(Remarks, {
    foreignKey: "submissionId",
    as: "remarks",
  });
};

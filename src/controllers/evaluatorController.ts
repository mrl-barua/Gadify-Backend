import { Request, Response } from "express";
import { Evaluator } from "../models/evaluator";
import { Department } from "../models/department";
import { Campus } from "../models/campus";
import { Office } from "../models/office";
import { Submission } from "../models/submission";
import { SubmissionEvaluation } from "../models/submissionEvaluation";
import { SubmissionEvaluators } from "../models/submissionEvaluators";
import { SubmissionFiles } from "../models/submissionFiles";
import { Admin } from "../models/admin";
import { Proponent } from "../models/proponent";
import { Remarks } from "../models/remarks";
import { SubmissionHistory } from "../models/submissionHistory";
import { Op } from "sequelize";
import { proposalEvaluationCompletedMail } from "../service/mail-templates/proposalEvaluationCompletedMail";
import { proposalSubmissionMail } from "../service/mail-templates/proposalSubmissionMail";
import {
  GenderEvaluationAssessment,
  GenderEvaluationSection,
} from "../models/genderEvaluation";

export const GetAllEvaluators = async (req: Request, res: Response) => {
  try {
    const evaluators = await Evaluator.findAll({
      include: [
        {
          model: Office,
          as: "office",
          attributes: ["officeId", "officeName"],
          include: [
            {
              model: Department,
              as: "department",
              attributes: ["departmentId", "departmentName", "campusId"],
              include: [
                {
                  model: Campus,
                  as: "campus",
                  attributes: ["campusId", "campusName", "campusAddress"],
                },
              ],
            },
          ],
        },
      ],
    });
    res.json(evaluators);
  } catch (error) {
    const errorMessage = (error as Error).message;
    res.status(500).json({
      error: "error getting evaluators with details",
      details: errorMessage,
    });
  }
};

export const CreateEvaluator = async (req: Request, res: Response) => {
  const { officeId, fullName, email, password } = req.body;

  const missingFields = [];
  if (!officeId) missingFields.push("officeId");
  if (!fullName) missingFields.push("fullName");
  if (!email) missingFields.push("email");
  if (!password) missingFields.push("password");

  if (missingFields.length > 0) {
    return res.status(400).json({
      message: `${missingFields.join(", ")} are required`,
    });
  }

  try {
    const lastEvaluator = await Evaluator.findOne({
      order: [["id", "DESC"]],
    });

    const newEvaluatorId = lastEvaluator
      ? `EV-${String(lastEvaluator.id + 1).padStart(4, "0")}`
      : "EV-0001";

    const evaluatorEmailExist = await Evaluator.findOne({
      where: { email },
    });
    if (evaluatorEmailExist) {
      return res.status(400).json({
        message: "Email already exists in the database, please use another",
      });
    }

    const newEvaluator = await Evaluator.create({
      evaluatorId: newEvaluatorId,
      officeId,
      fullName,
      email,
      password,
    });
    res.status(201).json(newEvaluator);
  } catch (error) {
    const errorMessage = (error as Error).message;
    res.status(500).json({
      error: "Error creating Evaluator",
      messageDetails: errorMessage,
    });
  }
};

export const UpdateEvaluator = async (req: Request, res: Response) => {
  const { id, officeId, fullName, email } = req.body;

  const missingFields = [];
  if (!officeId) missingFields.push("officeId");
  if (!fullName) missingFields.push("fullName");
  if (!email) missingFields.push("email");

  if (missingFields.length > 0) {
    return res.status(400).json({
      message: `${missingFields.join(", ")} are required`,
    });
  }

  try {
    const evaluator = await Evaluator.findByPk(id);
    if (!evaluator) {
      return res.status(404).json({
        message: "Evaluator not found",
      });
    }
    evaluator.officeId = officeId;
    evaluator.fullName = fullName;
    evaluator.email = email;

    await evaluator.save();

    res.status(200).json(evaluator);
  } catch (error) {
    const errorMessage = (error as Error).message;
    res.status(500).json({
      error: "Error updating Evaluator",
      messageDetails: errorMessage,
    });
  }
};

export const AddEvaluatorSignature = async (req: Request, res: Response) => {
  const { evaluatorId, signature } = req.body;

  if (!evaluatorId || !signature) {
    return res.status(400).json({
      message: "evaluatorId and signature are required",
    });
  }

  try {
    const evaluator = await Evaluator.findOne({
      where: { evaluatorId },
    });

    if (!evaluator) {
      return res.status(404).json({
        message: "Evaluator not found",
      });
    }

    evaluator.signature = signature;
    await evaluator.save();

    res.status(200).json({
      message: "Signature added successfully",
      evaluator,
    });
  } catch (error) {
    const errorMessage = (error as Error).message;
    res.status(500).json({
      error: "Error adding signature",
      messageDetails: errorMessage,
    });
  }
};

export const GetSubmissionToBeEvaluated = async (
  req: Request,
  res: Response
) => {
  const { evaluatorId } = req.body;
  try {
    const evaluationToBeEvaluated = await SubmissionEvaluators.findAll({
      where: { evaluatorId },
      attributes: ["id", "evaluatorId", "submissionId"], 
      include: [
        {
          model: Submission,
          as: "submission",
          where: {
            submissionStatus: {
              [Op.in]: ["Evaluation", "Completed"],
            },
          },
          attributes: [
            "id",
            "submissionId",
            "proponentId",
            "fileType",
            "proposalTitle",
            "submissionStatus",
            "totalScore",
            "createdAt",
          ],
          include: [
            {
              model: Proponent,
              as: "proponent",
              attributes: [
                "proponentId",
                "departmentId",
                "proponentType",
                "proponentStatus",
                "fullName",
              ],
              include: [
                {
                  model: Department,
                  as: "department",
                  attributes: ["departmentId", "campusId", "departmentName"],
                  include: [
                    {
                      model: Campus,
                      as: "campus",
                      attributes: ["campusId", "campusName", "campusAddress"],
                    },
                  ],
                },
              ],
            },
            {
              model: Remarks,
              as: "remarks",
              attributes: ["timestamp", "remarks"],
            },
            {
              model: SubmissionFiles,
              as: "submissionFiles",
              attributes: ["resourcesLink"],
            },
          ],
        },
      ],
    });

    res.json(evaluationToBeEvaluated);
  } catch (error) {
    const errorMessage = (error as Error).message;
    res.status(500).json({
      error: "Error getting submission to be evaluated",
      messageDetails: errorMessage,
    });
  }
};

export const GetEvaluatorById = async (req: Request, res: Response) => {
  const { id } = req.body;

  try {
    const evaluator = await Evaluator.findByPk(id, {
      include: [
        {
          model: Office,
          as: "office",
          attributes: ["officeId", "officeName"],
          include: [
            {
              model: Department,
              as: "department",
              attributes: ["departmentId", "departmentName", "campusId"],
              include: [
                {
                  model: Campus,
                  as: "campus",
                  attributes: ["campusId", "campusName", "campusAddress"],
                },
              ],
            },
          ],
        },
      ],
    });
    if (!evaluator) {
      return res.status(404).json({
        message: "Evaluator not found",
      });
    }
    res.json(evaluator);
  } catch (error) {
    const errorMessage = (error as Error).message;
    res.status(500).json({
      error: "Error getting evaluator",
      messageDetails: errorMessage,
    });
  }
};

export const EvaluateSubmission = async (req: Request, res: Response) => {
  const { submissionId, evaluatorId, genderAssessments, actorName } = req.body;

  if (!submissionId || !evaluatorId || !Array.isArray(genderAssessments)) {
    return res.status(400).json({
      message: "submissionId, evaluatorId, and genderAssessments are required",
    });
  }

  try {
    const submission = await Submission.findByPk(submissionId);
    if (!submission) {
      return res.status(404).json({ message: "Submission not found" });
    }

    const evaluator = await Evaluator.findByPk(evaluatorId);
    if (!evaluator) {
      return res.status(404).json({ message: "Evaluator not found" });
    }

    const existingEvaluation = await SubmissionEvaluation.findOne({
      where: { submissionId, evaluatorId },
    });

    if (existingEvaluation) {
      return res.status(400).json({
        message: "This submission has already been evaluated by this evaluator",
      });
    }

    const evaluation = await SubmissionEvaluation.create({
      submissionId,
      evaluatorId,
    });

    const assessmentRecords = await Promise.all(
      genderAssessments.map(async (assessment) => {
        const { sectionId, doneNo, donePartly, doneYes, score, comments } =
          assessment;

        const section = await GenderEvaluationSection.findByPk(sectionId);
        if (!section) {
          throw new Error(
            `Gender Evaluation Section with ID ${sectionId} not found`
          );
        }

        return await GenderEvaluationAssessment.create({
          submissionEvaluationId: evaluation.id,
          sectionId,
          doneNo,
          donePartly,
          doneYes,
          score,
          comments,
        });
      })
    );

    submission.submissionStatus = "Completed";
    submission.evaluatedAt = new Date();
    await submission.save();

    const Admins = await Admin.findAll();
    Admins.forEach(async (admin) => {
      proposalEvaluationCompletedMail(admin.email, submission.proposalTitle);
    });

    await SubmissionHistory.create({
      timestamp: new Date(),
      description: `Evaluator ${actorName} completed and submitted their evaluation for the submission with ID: ${submission.submissionId}. (Status changed from 'For Evaluation' to 'Completed')`,
      changedBy: actorName,
      submissionId: submissionId,
    });

    res.status(201).json({
      message: "Submission evaluated successfully",
      evaluation,
      genderAssessments: assessmentRecords,
    });
  } catch (error) {
    res.status(500).json({
      error: "Error evaluating submission",
      messageDetails: (error as Error).message,
    });
  }
};

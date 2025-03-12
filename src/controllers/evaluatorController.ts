import { Request, Response } from "express";
import { Evaluator } from "../models/evaluator";
import { Department } from "../models/department";
import { Campus } from "../models/campus";
import { Office } from "../models/office";
import { Submission } from "../models/submission";
import { SubmissionEvaluation } from "../models/submissionEvaluation";
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
  const { departmentId, officeId, fullName, email, password } = req.body;

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
  const { submissionId, evaluatorId, sectionId, assessmentId } = req.body;

  if (!submissionId || !evaluatorId || !sectionId || !assessmentId) {
    return res.status(400).json({
      message:
        "submissionId, evaluatorId, projectId, sectionId, and assessmentId are required",
    });
  }

  try {
    // Check if submission exists
    const submission = await Submission.findByPk(submissionId);
    if (!submission) {
      return res.status(404).json({
        message: "Submission not found",
      });
    }

    // Check if evaluator exists
    const evaluator = await Evaluator.findByPk(evaluatorId);
    if (!evaluator) {
      return res.status(404).json({
        message: "Evaluator not found",
      });
    }

    // Check if Gender Evaluation Section exists
    const section = await GenderEvaluationSection.findByPk(sectionId);
    if (!section) {
      return res.status(404).json({
        message: "Gender Evaluation Section not found",
      });
    }

    // Check if Gender Evaluation Assessment exists
    const assessment = await GenderEvaluationAssessment.findByPk(assessmentId);
    if (!assessment) {
      return res.status(404).json({
        message: "Gender Evaluation Assessment not found",
      });
    }

    // Check if evaluation already exists
    const existingEvaluation = await SubmissionEvaluation.findOne({
      where: { submissionId, evaluatorId },
    });

    if (existingEvaluation) {
      return res.status(400).json({
        message: "This submission has already been evaluated by this evaluator",
      });
    }

    // Create new evaluation entry
    const evaluation = await SubmissionEvaluation.create({
      submissionId,
      evaluatorId,
      sectionId,
      assessmentId,
    });

    res.status(201).json({
      message: "Submission evaluated successfully",
      evaluation,
    });
  } catch (error) {
    res.status(500).json({
      error: "Error evaluating submission",
      messageDetails: (error as Error).message,
    });
  }
};

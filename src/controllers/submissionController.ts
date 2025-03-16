import { Request, Response } from "express";
import { Submission } from "../models/submission";
import { SubmissionEvaluators } from "../models/submissionEvaluators";
import { SubmissionFiles } from "../models/submissionFiles";
import { Proponents } from "../models/proponents";
import { Evaluator } from "../models/evaluator";
import { Remarks } from "../models/remarks";
import { Department } from "../models/department";
import { Campus } from "../models/campus";
import { SubmissionEvaluation } from "../models/submissionEvaluation";
import {
  GenderEvaluationAssessment,
  GenderEvaluationSection,
} from "../models/genderEvaluation";
import { Op } from "sequelize";

export const GetAllSubmissions = async (req: Request, res: Response) => {
  try {
    const submissions = await Submission.findAll({
      include: [
        {
          model: Proponents,
          as: "proponent",
          attributes: [
            "proponentId",
            "departmentId",
            "proponentType",
            "proponentStatus",
            "fullName",
            "userName",
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
          attributes: ["remarksId", "remarks"],
        },
        {
          model: SubmissionFiles,
          as: "submissionFiles",
          attributes: ["resourcesLink"],
        },
      ],
    });
    res.json(submissions);
  } catch (error) {
    const errorMessage = (error as Error).message;
    res.status(500).json({
      error: "error getting submissions with details",
      details: errorMessage,
    });
  }
};

export const GetSubmissionsByProponentId = async (
  req: Request,
  res: Response
) => {
  const { proponentId } = req.body;

  try {
    const submissions = await Submission.findAll({
      where: { proponentId },
      include: [
        {
          model: Proponents,
          as: "proponent",
          attributes: [
            "proponentId",
            "departmentId",
            "proponentType",
            "proponentStatus",
            "fullName",
            "userName",
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
          attributes: ["remarksId", "remarks"],
        },
        {
          model: SubmissionFiles,
          as: "submissionFiles",
          attributes: ["resourcesLink"],
        },
      ],
    });
    res.json(submissions);
  } catch (error) {
    const errorMessage = (error as Error).message;
    res.status(500).json({
      error: "error getting submissions with details",
      details: errorMessage,
    });
  }
};

export const CreateSubmission = async (req: Request, res: Response) => {
  const {
    proponentId,
    fileType,
    proposalTitle,
    proposalDescription,
    submissionStatus,
    remarksId,
    submissionFiles,
  } = req.body;

  const missingFields = [];
  if (!proponentId) missingFields.push("proponentId");
  if (!fileType) missingFields.push("fileType");
  if (!proposalTitle) missingFields.push("proposalTitle");
  if (!submissionStatus) missingFields.push("submissionStatus");

  if (missingFields.length > 0) {
    return res.status(400).json({
      message: `${missingFields.join(", ")} are required`,
    });
  }

  if (fileType !== "Link" && fileType !== "File") {
    return res.status(400).json({
      message: "fileType must be either 'Link' or 'File'",
    });
  }

  try {
    const lastSubmission = await Submission.findOne({
      order: [["id", "DESC"]],
    });

    const newSubmissionId = lastSubmission
      ? `SUB-${String(lastSubmission.id + 1).padStart(4, "0")}`
      : "SUB-0001";

    const newSubmission = await Submission.create({
      submissionId: newSubmissionId,
      proponentId,
      fileType,
      proposalTitle,
      proposalDescription,
      submissionStatus,
      remarksId,
    });

    if (submissionFiles && Array.isArray(submissionFiles)) {
      const fileRecords = submissionFiles.map((file) => ({
        submissionId: newSubmission.id,
        resourcesLink: file,
      }));

      await SubmissionFiles.bulkCreate(fileRecords);
    }
    const submissionWithFiles = await Submission.findOne({
      where: { id: newSubmission.id },
      include: [
        {
          model: SubmissionFiles,
          as: "submissionFiles",
          attributes: ["resourcesLink"],
        },
      ],
    });

    res.status(201).json(submissionWithFiles);
  } catch (error) {
    const errorMessage = (error as Error).message;
    res.status(500).json({
      error: "Error creating Submission",
      messageDetails: errorMessage,
    });
  }
};

export const AddSubmissionRemarks = async (req: Request, res: Response) => {
  const { submissionId, remarksId } = req.body;

  if (!submissionId || !remarksId) {
    return res.status(400).json({
      message: "submissionId and remarksId are required",
    });
  }

  try {
    const submission = await Submission.findOne({
      where: { submissionId },
    });

    if (!submission) {
      return res.status(404).json({
        message: "Submission not found",
      });
    }

    submission.remarksId = remarksId;
    await submission.save();

    res.status(200).json({
      message: "Remarks added successfully",
      submission,
    });
  } catch (error) {
    const errorMessage = (error as Error).message;
    res.status(500).json({
      error: "Error adding remarks",
      messageDetails: errorMessage,
    });
  }
};

export const GetSubmissionById = async (req: Request, res: Response) => {
  const { Id } = req.body;

  try {
    const submission = await Submission.findOne({
      where: { id: Id },
      include: [
        {
          model: Proponents,
          as: "proponent",
          attributes: [
            "proponentId",
            "departmentId",
            "proponentType",
            "proponentStatus",
            "fullName",
            "userName",
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
          attributes: ["remarksId", "remarks"],
        },
        {
          model: SubmissionFiles,
          as: "submissionFiles",
          attributes: ["resourcesLink"],
        },
      ],
    });

    if (!submission) {
      return res.status(404).json({
        message: "Submission not found",
      });
    }

    res.json(submission);
  } catch (error) {
    const errorMessage = (error as Error).message;
    res.status(500).json({
      error: "Error getting submission",
      messageDetails: errorMessage,
    });
  }
};

export const AssignEvaluatorsToSubmission = async (
  req: Request,
  res: Response
) => {
  const { submissionId, evaluatorIds } = req.body;

  if (!submissionId || !evaluatorIds || !Array.isArray(evaluatorIds)) {
    return res.status(400).json({
      message: "submissionId and evaluatorIds are required",
    });
  }

  try {
    const submission = await Submission.findOne({
      where: { id: submissionId },
    });

    if (!submission) {
      return res.status(404).json({
        message: "Submission not found",
      });
    }

    const now = new Date();

    const existingEvaluators = await SubmissionEvaluators.findAll({
      where: { submissionId },
      attributes: ["evaluatorId"],
    });

    const existingEvaluatorIds = existingEvaluators.map((e) => e.evaluatorId);

    const newEvaluators = evaluatorIds
      .filter((id: number) => !existingEvaluatorIds.includes(id))
      .map((evaluatorId: number) => ({
        submissionId,
        evaluatorId,
        createdAt: now,
        updatedAt: now,
      }));

    const evaluatorsToRemove = existingEvaluatorIds.filter(
      (id) => !evaluatorIds.includes(id)
    );

    if (evaluatorsToRemove.length > 0) {
      await SubmissionEvaluators.destroy({
        where: {
          submissionId,
          evaluatorId: evaluatorsToRemove,
        },
      });
    }

    if (newEvaluators.length > 0) {
      await SubmissionEvaluators.bulkCreate(newEvaluators);
    }

    res.status(200).json({
      message: "Evaluators updated successfully",
    });
  } catch (error) {
    console.error("Error updating evaluators:", error);

    if (error instanceof Error) {
      if (error.name === "SequelizeUniqueConstraintError") {
        return res.status(400).json({
          error: "Unique Constraint Error",
          messageDetails:
            "This evaluator is already assigned to the submission.",
        });
      } else if (error.name === "SequelizeValidationError") {
        return res.status(400).json({
          error: "Validation Error",
          messageDetails: error.message,
        });
      }
    }

    res.status(500).json({
      error: "Unknown Server Error",
      messageDetails: (error as Error).message,
    });
  }
};

export const GetEvaluatorsBySubmission = async (
  req: Request,
  res: Response
) => {
  const { submissionId } = req.body;

  if (!submissionId) {
    return res.status(400).json({
      message: "Submission ID is required",
    });
  }

  try {
    const submission = await Submission.findOne({
      where: { id: submissionId },
    });

    if (!submission) {
      return res.status(404).json({
        message: "Submission not found",
      });
    }

    const submissionEvaluators = await SubmissionEvaluators.findAll({
      where: { submissionId },
      attributes: ["evaluatorId", "createdAt", "updatedAt"],
    });

    if (submissionEvaluators.length === 0) {
      return res.status(404).json({
        message: "No evaluators found for this submission",
      });
    }

    const evaluatorIds = submissionEvaluators.map((se) => se.evaluatorId);

    const evaluators = await Evaluator.findAll({
      where: { id: { [Op.in]: evaluatorIds } },
    });

    const response = {
      id: submission.id,
      submission,
      evaluatorsId: evaluatorIds,
      evaluators,
      createdAt: submissionEvaluators[0].createdAt,
      updatedAt: submissionEvaluators[0].updatedAt,
    };

    res.status(200).json(response);
  } catch (error) {
    console.error("Error fetching evaluators:", error);
    res.status(500).json({
      error: "Error fetching evaluators",
      messageDetails: (error as Error).message,
    });
  }
};

export const GetSubmissionEvaluationById = async (
  req: Request,
  res: Response
) => {
  const { submissionId } = req.body;

  if (!submissionId) {
    return res.status(400).json({
      message: "Submission ID is required",
    });
  }

  try {
    const evaluation = await SubmissionEvaluation.findOne({
      where: { submissionId },
      include: [
        {
          model: Submission,
          as: "evaluatedSubmission",
          attributes: [
            "id",
            "submissionId",
            "proponentId",
            "fileType",
            "proposalTitle",
            "proposalDescription",
            "submissionStatus",
            "remarksId",
          ],
        },
        {
          model: Evaluator,
          as: "evaluator",
          attributes: ["id", "officeId", "fullName", "email"],
        },
        {
          model: GenderEvaluationAssessment,
          as: "assessments",
          attributes: [
            "id",
            "sectionId",
            "submissionEvaluationId",
            "doneNo",
            "donePartly",
            "doneYes",
            "score",
            "comments",
          ],
          include: [
            {
              model: GenderEvaluationSection,
              as: "section",
              attributes: ["id", "element", "isMainSection"],
            },
          ],
        },
      ],
    });

    if (!evaluation) {
      console.error("Evaluation not found");
    }

    res.status(200).json(evaluation);
  } catch (error) {
    console.error("Error fetching submission evaluation:", error);
    res.status(500).json({
      error: "Error fetching submission evaluation",
      messageDetails: (error as Error).message,
    });
  }
};

export const GetSubmissionEvaluation = async (submissionId: number) => {
  try {
    const evaluation = await SubmissionEvaluation.findOne({
      where: { submissionId },
      include: [
        {
          model: Submission,
          as: "submission",
          attributes: [
            "id",
            "submissionId",
            "proponentId",
            "fileType",
            "proposalTitle",
            "proposalDescription",
            "submissionStatus",
            "remarksId",
          ],
        },
        {
          model: Evaluator,
          as: "evaluator",
          attributes: ["id", "officeId", "fullName", "email"],
        },
        {
          model: GenderEvaluationAssessment,
          as: "assessments",
          attributes: [
            "id",
            "sectionId",
            "submissionEvaluationId",
            "doneNo",
            "donePartly",
            "doneYes",
            "score",
            "comments",
          ],
          include: [
            {
              model: GenderEvaluationSection,
              as: "section",
              attributes: ["id", "element", "isMainSection"],
            },
          ],
        },
      ],
    });

    if (!evaluation) {
      console.error("Evaluation not found");
    }

    return evaluation ? evaluation.toJSON() : null;
  } catch (error) {
    const errorMessage = (error as Error).message;
    console.error("Error fetching submission evaluation:", errorMessage);
  }
};

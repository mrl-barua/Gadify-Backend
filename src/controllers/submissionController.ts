import { Request, Response } from "express";
import { Submission } from "../models/submission";
import { SubmissionEvaluators } from "../models/submissionEvaluators";
import { Proponents } from "../models/proponents";
import { Evaluator } from "../models/evaluator";
import { Remarks } from "../models/remarks";
import { Department } from "../models/department";
import { Campus } from "../models/campus";
import { Office } from "../models/office";
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
          model: Evaluator,
          as: "evaluator",
          attributes: [
            "evaluatorId",
            "campusId",
            "departmentId",
            "officeId",
            "fullName",
            "email",
          ],
          include: [
            {
              model: Campus,
              as: "campus",
              attributes: ["campusId", "campusName", "campusAddress"],
            },
            {
              model: Office,
              as: "office",
              attributes: [
                "officeId",
                "campusId",
                "departmentId",
                "officeName",
              ],
              include: [
                {
                  model: Campus,
                  as: "campus",
                  attributes: ["campusId", "campusName", "campusAddress"],
                },
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
          ],
        },
        {
          model: Remarks,
          as: "remarks",
          attributes: ["remarksId", "remarks"],
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
          model: Evaluator,
          as: "evaluator",
          attributes: [
            "evaluatorId",
            "campusId",
            "departmentId",
            "officeId",
            "fullName",
            "email",
          ],
          include: [
            {
              model: Campus,
              as: "campus",
              attributes: ["campusId", "campusName", "campusAddress"],
            },
            {
              model: Office,
              as: "office",
              attributes: [
                "officeId",
                "campusId",
                "departmentId",
                "officeName",
              ],
              include: [
                {
                  model: Campus,
                  as: "campus",
                  attributes: ["campusId", "campusName", "campusAddress"],
                },
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
          ],
        },
        {
          model: Remarks,
          as: "remarks",
          attributes: ["remarksId", "remarks"],
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
    evaluatorId,
    fileType,
    proposalTitle,
    proposalDescription,
    resourcesLink,
    submissionStatus,
    remarksId,
  } = req.body;

  // Input validation
  const missingFields = [];
  if (!proponentId) missingFields.push("proponentId");
  if (!evaluatorId) missingFields.push("evaluatorId");
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
      evaluatorId,
      fileType,
      proposalTitle,
      proposalDescription,
      resourcesLink,
      submissionStatus,
      remarksId,
    });
    res.status(201).json(newSubmission);
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
          model: Evaluator,
          as: "evaluator",
          attributes: [
            "evaluatorId",
            "campusId",
            "departmentId",
            "officeId",
            "fullName",
            "email",
          ],
          include: [
            {
              model: Campus,
              as: "campus",
              attributes: ["campusId", "campusName", "campusAddress"],
            },
            {
              model: Office,
              as: "office",
              attributes: [
                "officeId",
                "campusId",
                "departmentId",
                "officeName",
              ],
              include: [
                {
                  model: Campus,
                  as: "campus",
                  attributes: ["campusId", "campusName", "campusAddress"],
                },
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
          ],
        },
        {
          model: Remarks,
          as: "remarks",
          attributes: ["remarksId", "remarks"],
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

  if (
    !submissionId ||
    !evaluatorIds ||
    !Array.isArray(evaluatorIds) ||
    evaluatorIds.length === 0
  ) {
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

    // Prevent duplicate entries by filtering out existing records
    const existingEvaluators = await SubmissionEvaluators.findAll({
      where: { submissionId, evaluatorId: evaluatorIds },
      attributes: ["evaluatorId"],
    });

    const existingEvaluatorIds = existingEvaluators.map((e) => e.evaluatorId);

    // Filter out evaluators that are already assigned
    const newEvaluators = evaluatorIds
      .filter((id: number) => !existingEvaluatorIds.includes(id))
      .map((evaluatorId: number) => ({
        submissionId: submission.id,
        evaluatorId,
        createdAt: now,
        updatedAt: now,
      }));

    if (newEvaluators.length > 0) {
      await SubmissionEvaluators.bulkCreate(newEvaluators);
    }

    res.status(200).json({
      message: "Evaluators assigned successfully",
    });
  } catch (error) {
    console.error("Error assigning evaluators:", error);

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
    // Fetch submission
    const submission = await Submission.findOne({
      where: { id: submissionId },
    });

    if (!submission) {
      return res.status(404).json({
        message: "Submission not found",
      });
    }

    // Fetch assigned evaluators
    const submissionEvaluators = await SubmissionEvaluators.findAll({
      where: { submissionId },
      attributes: ["evaluatorId", "createdAt", "updatedAt"],
    });

    if (submissionEvaluators.length === 0) {
      return res.status(404).json({
        message: "No evaluators found for this submission",
      });
    }

    // Extract evaluator IDs
    const evaluatorIds = submissionEvaluators.map((se) => se.evaluatorId);

    // Fetch evaluator details
    const evaluators = await Evaluator.findAll({
      where: { id: { [Op.in]: evaluatorIds } },
    });

    // Format response
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

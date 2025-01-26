import { Request, Response } from "express";
import { Submission } from "../models/submission";
import { Proponents } from "../models/proponents";
import { Evaluator } from "../models/evaluator";
import { Remarks } from "../models/remarks";
import { Department } from "../models/department";
import { Campus } from "../models/campus";
import { Office } from "../models/office";

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

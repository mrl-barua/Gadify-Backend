import { Request, Response } from "express";
import { Submission } from "../models/submission";
import { SubmissionEvaluators } from "../models/submissionEvaluators";
import { SubmissionFiles } from "../models/submissionFiles";
import { Proponent } from "../models/proponent";
import { Evaluator } from "../models/evaluator";
import { Remarks } from "../models/remarks";
import { Department } from "../models/department";
import { Campus } from "../models/campus";
import { Admin } from "../models/admin";
import { SubmissionEvaluation } from "../models/submissionEvaluation";
import { SubmissionHistory } from "../models/submissionHistory";
import { proposalAssignedMail } from "../service/mail-templates/proposalAssignedMail";
import { proposalAwaitingAssignmentMail } from "../service/mail-templates/proposalAwaitingAssignmentMail";
import {
  GenderEvaluationAssessment,
  GenderEvaluationSection,
} from "../models/genderEvaluation";
import { Op } from "sequelize";
import { proposalSubmissionMail } from "../service/mail-templates/proposalSubmissionMail";
import { compileFunction } from "vm";

export const GetAllSubmissions = async (req: Request, res: Response) => {
  try {
    const submissions = await Submission.findAll({
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
        {
          model: SubmissionHistory,
          as: "submissionHistory",
          attributes: ["id", "timestamp", "description", "changedBy"],
          separate: true,
          order: [["timestamp", "DESC"]],
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

export const GetAllOnHoldSubmissions = async (req: Request, res: Response) => {
  const { page = 1, limit = 10, searchFilter = "" } = req.body;
  const search =
    searchFilter && String(searchFilter).trim() !== ""
      ? String(searchFilter).trim()
      : null;

  const whereCondition: any = {
    submissionStatus: "OnHold",
  };

  if (search) {
    whereCondition[Op.or] = [
      { submissionId: { [Op.like]: `%${search}%` } },
      { proposalTitle: { [Op.like]: `%${search}%` } },
      { proposalDescription: { [Op.like]: `%${search}%` } },
    ];
  }
  try {
    const pageNumber = Math.max(Number(page), 1);
    const limitNumber = Math.max(Number(limit), 1);
    const offset = (Number(pageNumber) - 1) * Number(limitNumber);

    const { rows: submissions, count: total } =
      await Submission.findAndCountAll({
        where: whereCondition,
        order: [["id", "ASC"]],
        limit: Number(limit),
        offset,
        distinct: true,
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
          {
            model: SubmissionHistory,
            as: "submissionHistory",
            attributes: ["id", "timestamp", "description", "changedBy"],
            separate: true,
            order: [["timestamp", "DESC"]],
          },
        ],
      });
    const totalPages = Math.ceil(total / Number(limit));
    const currentPage = pageNumber > totalPages ? totalPages : pageNumber;

    res.json({
      CompletedProponentCount: total,
      CurrentPage: currentPage,
      TotalPages: totalPages,
      Submissions: submissions,
    });
  } catch (error) {
    const errorMessage = (error as Error).message;
    res.status(500).json({
      error: "error getting submissions with details",
      details: errorMessage,
    });
  }
};

export const GetAllForEvaluationSubmissions = async (
  req: Request,
  res: Response
) => {
  const { page = 1, limit = 10, searchFilter = "" } = req.body;
  const search =
    searchFilter && String(searchFilter).trim() !== ""
      ? String(searchFilter).trim()
      : null;

  const whereCondition: any = {
    submissionStatus: "Evaluation",
  };

  if (search) {
    whereCondition[Op.or] = [
      { submissionId: { [Op.like]: `%${search}%` } },
      { proposalTitle: { [Op.like]: `%${search}%` } },
      { proposalDescription: { [Op.like]: `%${search}%` } },
    ];
  }
  try {
    const pageNumber = Math.max(Number(page), 1);
    const limitNumber = Math.max(Number(limit), 1);
    const offset = (Number(pageNumber) - 1) * Number(limitNumber);

    const { rows: submissions, count: total } =
      await Submission.findAndCountAll({
        where: whereCondition,
        order: [["id", "ASC"]],
        limit: Number(limit),
        offset,
        distinct: true,
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
          {
            model: SubmissionHistory,
            as: "submissionHistory",
            attributes: ["id", "timestamp", "description", "changedBy"],
            separate: true,
            order: [["timestamp", "DESC"]],
          },
        ],
      });
    const totalPages = Math.ceil(total / Number(limit));
    const currentPage = Number(page);

    res.json({
      CompletedProponentCount: total,
      CurrentPage: currentPage,
      TotalPages: totalPages,
      Submissions: submissions,
    });
  } catch (error) {
    const errorMessage = (error as Error).message;
    res.status(500).json({
      error: "error getting submissions with details",
      details: errorMessage,
    });
  }
};

export const GetAllForCorrectionSubmissions = async (
  req: Request,
  res: Response
) => {
  const { page = 1, limit = 10, searchFilter = "" } = req.body;
  const search =
    searchFilter && String(searchFilter).trim() !== ""
      ? String(searchFilter).trim()
      : null;

  const whereCondition: any = {
    submissionStatus: "ForCorrection",
  };

  if (search) {
    whereCondition[Op.or] = [
      { submissionId: { [Op.like]: `%${search}%` } },
      { proposalTitle: { [Op.like]: `%${search}%` } },
      { proposalDescription: { [Op.like]: `%${search}%` } },
    ];
  }
  try {
    const pageNumber = Math.max(Number(page), 1);
    const limitNumber = Math.max(Number(limit), 1);
    const offset = (Number(pageNumber) - 1) * Number(limitNumber);

    const { rows: submissions, count: total } =
      await Submission.findAndCountAll({
        where: whereCondition,
        order: [["id", "ASC"]],
        limit: Number(limit),
        offset,
        distinct: true,
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
          {
            model: SubmissionHistory,
            as: "submissionHistory",
            attributes: ["id", "timestamp", "description", "changedBy"],
            separate: true,
            order: [["timestamp", "DESC"]],
          },
        ],
      });
    const totalPages = Math.ceil(total / Number(limit));
    const currentPage = Number(page);

    res.json({
      CompletedProponentCount: total,
      CurrentPage: currentPage,
      TotalPages: totalPages,
      Submissions: submissions,
    });
  } catch (error) {
    const errorMessage = (error as Error).message;
    res.status(500).json({
      error: "error getting submissions with details",
      details: errorMessage,
    });
  }
};

export const GetAllCompletedSubmissions = async (
  req: Request,
  res: Response
) => {
  const { page = 1, limit = 10, searchFilter = "" } = req.body;
  const search =
    searchFilter && String(searchFilter).trim() !== ""
      ? String(searchFilter).trim()
      : null;

  const whereCondition: any = {
    submissionStatus: "Completed",
  };

  if (search) {
    whereCondition[Op.or] = [
      { submissionId: { [Op.like]: `%${search}%` } },
      { proposalTitle: { [Op.like]: `%${search}%` } },
      { proposalDescription: { [Op.like]: `%${search}%` } },
    ];
  }
  try {
    const pageNumber = Math.max(Number(page), 1);
    const limitNumber = Math.max(Number(limit), 1);
    const offset = (Number(pageNumber) - 1) * Number(limitNumber);

    const { rows: submissions, count: total } =
      await Submission.findAndCountAll({
        where: whereCondition,
        order: [["id", "ASC"]],
        limit: Number(limit),
        offset,
        distinct: true,
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
          {
            model: SubmissionHistory,
            as: "submissionHistory",
            attributes: ["id", "timestamp", "description", "changedBy"],
            separate: true,
            order: [["timestamp", "DESC"]],
          },
        ],
      });
    const totalPages = Math.ceil(total / Number(limit));
    const currentPage = Number(page);

    res.json({
      CompletedProponentCount: total,
      CurrentPage: currentPage,
      TotalPages: totalPages,
      Submissions: submissions,
    });
  } catch (error) {
    const errorMessage = (error as Error).message;
    res.status(500).json({
      error: "error getting submissions with details",
      details: errorMessage,
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
        {
          model: SubmissionHistory,
          as: "submissionHistory",
          attributes: ["id", "timestamp", "description", "changedBy"],
          separate: true,
          order: [["timestamp", "DESC"]],
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
        {
          model: SubmissionHistory,
          as: "submissionHistory",
          attributes: ["id", "timestamp", "description", "changedBy"],
          separate: true,
          order: [["timestamp", "DESC"]],
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

    const Admins = await Admin.findAll();
    Admins.forEach(async (admin) => {
      proposalAwaitingAssignmentMail(admin.email, proposalTitle);
    });

    const proponent = await Proponent.findOne({
      where: { id: proponentId },
    });

    if (!proponent) {
      return res.status(404).json({
        message: "Proponent not found",
      });
    }

    let proponentName = "Unknown Proponent";

    if (proponent) {
      proposalSubmissionMail(
        proponent.email,
        proponent.fullName,
        proposalTitle
      );
      proponentName = proponent.fullName;
    }

    await SubmissionHistory.create({
      timestamp: new Date(),
      description: `Submission created with ID: ${newSubmissionId} by Proponent: ${proponentName}`,
      changedBy: proponentName,
      submissionId: newSubmission.id,
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

export const UpdateSubmission = async (req: Request, res: Response) => {
  const {
    id,
    submissionId,
    fileType,
    proposalTitle,
    proposalDescription,
    submissionStatus,
    submissionFiles,
    actorName,
  } = req.body;

  const missingFields = [];
  if (!id) missingFields.push("id");
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
    const existingSubmission = await Submission.findOne({
      where: { id },
      include: [{ model: SubmissionFiles, as: "submissionFiles" }],
    });

    if (!existingSubmission) {
      return res.status(404).json({
        message: "Submission not found",
      });
    }

    existingSubmission.fileType = fileType;
    existingSubmission.proposalTitle = proposalTitle;
    existingSubmission.proposalDescription = proposalDescription;
    existingSubmission.submissionStatus = submissionStatus;
    await existingSubmission.save();

    if (submissionFiles && Array.isArray(submissionFiles)) {
      await SubmissionFiles.destroy({
        where: { submissionId: existingSubmission.id },
      });

      const fileRecords = submissionFiles.map((file) => {
        if (typeof file.resourcesLink !== "string") {
          throw new Error(`Invalid resourcesLink: ${file.resourcesLink}`);
        }
        return {
          submissionId: existingSubmission.id,
          resourcesLink: file.resourcesLink,
        };
      });

      // Bulk create the new file records
      await SubmissionFiles.bulkCreate(fileRecords);
    }

    const updatedSubmission = await Submission.findOne({
      where: { id: existingSubmission.id },
      include: [
        {
          model: SubmissionFiles,
          as: "submissionFiles",
          attributes: ["resourcesLink"],
        },
      ],
    });

    await SubmissionHistory.create({
      timestamp: new Date(),
      description: `Submission with ID: ${submissionId} updated. by Proponent: ${actorName}`,
      changedBy: actorName,
      submissionId: existingSubmission.id,
    });

    res.status(200).json(updatedSubmission);
  } catch (error) {
    const errorMessage = (error as Error).message;
    res.status(500).json({
      error: "Error updating Submission",
      messageDetails: errorMessage,
    });
  }
};

export const AssignEvaluatorsToSubmission = async (
  req: Request,
  res: Response
) => {
  const { submissionId, evaluatorIds, actorName } = req.body;

  if (
    !submissionId ||
    !evaluatorIds ||
    !actorName ||
    !Array.isArray(evaluatorIds)
  ) {
    return res.status(400).json({
      message: "submissionId, actorName and evaluatorIds are required",
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

    const evaluators = await Evaluator.findAll({
      where: { id: evaluatorIds },
    });

    for (const evaluator of evaluators) {
      await proposalAssignedMail(
        evaluator.email,
        evaluator.fullName,
        submission.proposalTitle
      );

      await SubmissionHistory.create({
        timestamp: new Date(),
        description: `Evaluator ${evaluator.fullName} assigned to submission with ID: ${submission.submissionId}`,
        changedBy: actorName,
        submissionId: submission.id,
      });
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
      order: [["assessments", "sectionId", "ASC"]],
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

            "totalScore",
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
      order: [["assessments", "sectionId", "ASC"]],
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
            "totalScore",
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

export const ApproveSubmission = async (req: Request, res: Response) => {
  const { submissionId, actorName } = req.body;

  if (!submissionId || !actorName) {
    return res.status(400).json({
      message: "submissionId and actorName is required",
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

    submission.submissionStatus = "Completed";
    await submission.save();

    await SubmissionHistory.create({
      timestamp: new Date(),
      description: `Submission approved with ID: ${submission.submissionId} by ${actorName}`,
      changedBy: "Admin",
      submissionId: submission.id,
    });

    res.status(200).json({
      message: "Submission approved successfully",
    });
  } catch (error) {
    const errorMessage = (error as Error).message;
    res.status(500).json({
      error: "Error approving submission",
      messageDetails: errorMessage,
    });
  }
};

export const ForCorrectionSubmission = async (req: Request, res: Response) => {
  const { submissionId, actorName, remarks } = req.body;

  if (!submissionId || !actorName) {
    return res.status(400).json({
      message: "submissionId and actorName is required",
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

    submission.submissionStatus = "ForCorrection";
    await submission.save();

    await SubmissionHistory.create({
      timestamp: new Date(),
      description: `Submission marked for correction with ID: ${submission.submissionId} by ${actorName}`,
      changedBy: actorName,
      submissionId: submission.id,
    });

    if (remarks.length > 0) {
      const newRemark = `${actorName}: ${remarks}`;
      await Remarks.create({
        timestamp: new Date(),
        remarks: newRemark,
        submissionId: submission.id,
      });
    }

    res.status(200).json({
      message: "Submission marked for correction successfully",
    });
  } catch (error) {
    const errorMessage = (error as Error).message;
    res.status(500).json({
      error: "Error marking submission for correction",
      messageDetails: errorMessage,
    });
  }
};

export const ForEvaluationSubmission = async (req: Request, res: Response) => {
  const { submissionId, actorName, remarks } = req.body;

  if (!submissionId || !actorName) {
    return res.status(400).json({
      message: "submissionId and actorName is required",
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

    submission.submissionStatus = "Evaluation";
    await submission.save();

    await SubmissionHistory.create({
      timestamp: new Date(),
      description: `Submission marked for evaluation with ID: ${submission.submissionId} by ${actorName}`,
      changedBy: actorName,
      submissionId: submission.id,
    });

    if (remarks.length > 0) {
      const newRemark = `${actorName}: ${remarks}`;
      await Remarks.create({
        timestamp: new Date(),
        remarks: newRemark,
        submissionId: submission.id,
      });
    }

    res.status(200).json({
      message: "Submission marked for evaluation successfully",
    });
  } catch (error) {
    const errorMessage = (error as Error).message;
    res.status(500).json({
      error: "Error marking submission for evaluation",
      messageDetails: errorMessage,
    });
  }
};

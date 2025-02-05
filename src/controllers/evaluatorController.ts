import { Request, Response } from "express";
import { Evaluator } from "../models/evaluator";
import { Department } from "../models/department";
import { Campus } from "../models/campus";
import { Office } from "../models/office";

export const GetAllEvaluators = async (req: Request, res: Response) => {
  try {
    const evaluators = await Evaluator.findAll();
    res.json(evaluators);
  } catch (error) {
    const errorMessage = (error as Error).message;
    res
      .status(500)
      .json({ error: "error getting evaluators", details: errorMessage });
  }
};

export const GetEvaluatorsWithDetails = async (req: Request, res: Response) => {
  try {
    const evaluators = await Evaluator.findAll({
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
        {
          model: Office,
          as: "office",
          attributes: ["officeId", "officeName"],
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
  const { campusId, departmentId, officeId, fullName, email, password } =
    req.body;

  // Input validation
  const missingFields = [];
  if (!campusId) missingFields.push("campusId");
  if (!departmentId) missingFields.push("departmentId");
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
      campusId,
      departmentId,
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
  const { id } = req.params;
  const { campusId, departmentId, officeId, fullName, email, password } =
    req.body;

  // Input validation
  const missingFields = [];
  if (!campusId) missingFields.push("campusId");
  if (!departmentId) missingFields.push("departmentId");
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
    const evaluator = await Evaluator.findByPk(id);
    if (!evaluator) {
      return res.status(404).json({
        message: "Evaluator not found",
      });
    }

    evaluator.campusId = campusId;
    evaluator.departmentId = departmentId;
    evaluator.officeId = officeId;
    evaluator.fullName = fullName;
    evaluator.email = email;
    evaluator.password = password;

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

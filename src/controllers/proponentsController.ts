import { Request, Response } from "express";
import { Proponents } from "../models/proponents";
import { Department } from "../models/department";
import { Campus } from "../models/campus";

export const GetAllProponents = async (req: Request, res: Response) => {
  try {
    const proponents = await Proponents.findAll({
      where: { isDeleted: false },
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
    });
    res.json(proponents);
  } catch (error) {
    const errorMessage = (error as Error).message;
    res.status(500).json({
      error: "error getting proponents with department",
      details: errorMessage,
    });
  }
};

export const CreateProponents = async (req: Request, res: Response) => {
  const {
    departmentId,
    proponentType,
    proponentStatus,
    fullName,
    userName,
    password,
  } = req.body;

  // Input validation
  const missingFields = [];
  if (!departmentId) missingFields.push("departmentId");
  if (!proponentType) missingFields.push("proponentType");
  if (!proponentStatus) missingFields.push("proponentStatus");
  if (!fullName) missingFields.push("fullName");
  if (!userName) missingFields.push("userName");
  if (!password) missingFields.push("password");

  if (missingFields.length > 0) {
    return res.status(400).json({
      message: `${missingFields.join(", ")} are required`,
    });
  }

  try {
    const lastProponents = await Proponents.findOne({
      order: [["id", "DESC"]],
    });

    const newProponentsId =
      proponentType === "Inside"
        ? lastProponents
          ? `IN-${String(lastProponents.id + 1).padStart(4, "0")}`
          : "IN-0001"
        : proponentType === "Outside"
        ? lastProponents
          ? `OUT-${String(lastProponents.id + 1).padStart(4, "0")}`
          : "OUT-0001"
        : null;

    const proponentsUserNameExist = await Proponents.findOne({
      where: { userName },
    });
    if (proponentsUserNameExist) {
      return res.status(400).json({
        message: "Username already exist in the database, please use another",
      });
    }

    const newProponents = await Proponents.create({
      proponentId: newProponentsId,
      departmentId,
      proponentType,
      proponentStatus,
      fullName,
      userName,
      password,
    });
    res.status(201).json(newProponents);
  } catch (error) {
    const errorMessage = (error as Error).message;
    res.status(500).json({
      error: "Error creating Proponents",
      messageDetails: errorMessage,
    });
  }
};

export const UpdateProponents = async (req: Request, res: Response) => {
  const { id } = req.params;
  const {
    departmentId,
    proponentType,
    proponentStatus,
    fullName,
    userName,
    email,
    password,
  } = req.body;

  // Input validation
  const missingFields = [];
  if (!departmentId) missingFields.push("departmentId");
  if (!proponentType) missingFields.push("proponentType");
  if (!proponentStatus) missingFields.push("proponentStatus");
  if (!fullName) missingFields.push("fullName");
  if (!userName) missingFields.push("userName");
  if (!email) missingFields.push("email");
  if (!password) missingFields.push("password");

  if (missingFields.length > 0) {
    return res.status(400).json({
      message: `${missingFields.join(", ")} are required`,
    });
  }

  try {
    const proponents = await Proponents.findByPk(id);
    if (!proponents) {
      return res.status(404).json({
        message: "Proponents not found",
      });
    }

    const proponentsUserNameExist = await Proponents.findOne({
      where: { userName },
    });
    if (proponentsUserNameExist && proponentsUserNameExist.id !== Number(id)) {
      return res.status(400).json({
        message: "Username already exist in the database, please use another",
      });
    }

    await proponents.update({
      departmentId,
      proponentType,
      proponentStatus,
      fullName,
      userName,
      email,
      password,
    });
    res.json(proponents);
  } catch (error) {
    const errorMessage = (error as Error).message;
    res.status(500).json({
      error: "Error updating proponents",
      messageDetails: errorMessage,
    });
  }
};

export const DeleteProponents = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const proponents = await Proponents.findByPk(id);
    if (!proponents) {
      return res.status(404).json({
        message: "Proponents not found",
      });
    }

    await proponents.update({
      isDeleted: true,
    });
    res.json(proponents);
  } catch (error) {
    const errorMessage = (error as Error).message;
    res.status(500).json({
      error: "Error deleting proponents",
      messageDetails: errorMessage,
    });
  }
};

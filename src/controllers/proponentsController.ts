import { Request, Response } from "express";
import { Proponent } from "../models/proponent";
import { Department } from "../models/department";
import { Campus } from "../models/campus";

export const GetAllProponents = async (req: Request, res: Response) => {
  try {
    const proponents = await Proponent.findAll({
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

export const GetProponentById = async (req: Request, res: Response) => {
  const { id } = req.body;

  try {
    const proponent = await Proponent.findByPk(id, {
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
    if (!proponent) {
      return res.status(404).json({
        message: "Proponent not found",
      });
    }
    res.json(proponent);
  } catch (error) {
    const errorMessage = (error as Error).message;
    res.status(500).json({
      error: "Error getting proponent",
      messageDetails: errorMessage,
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
    email,
    password,
  } = req.body;

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
    const lastProponents = await Proponent.findOne({
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

    const proponentsUserNameExist = await Proponent.findOne({
      where: { userName },
    });
    if (proponentsUserNameExist) {
      return res.status(400).json({
        message: "Username already exist in the database, please use another",
      });
    }

    const newProponents = await Proponent.create({
      proponentId: newProponentsId,
      departmentId,
      proponentType,
      proponentStatus,
      fullName,
      userName,
      email,
      password,
    });
    res.status(201).json(newProponents);
  } catch (error) {
    const errorMessage = (error as Error).message;
    res.status(500).json({
      error: "Error creating Proponent",
      messageDetails: errorMessage,
    });
  }
};

export const UpdateProponents = async (req: Request, res: Response) => {
  const {
    id,
    departmentId,
    proponentType,
    proponentStatus,
    fullName,
    userName,
    email,
  } = req.body;

  const missingFields = [];
  if (!departmentId) missingFields.push("departmentId");
  if (!proponentType) missingFields.push("proponentType");
  if (!proponentStatus) missingFields.push("proponentStatus");
  if (!fullName) missingFields.push("fullName");
  if (!userName) missingFields.push("userName");
  if (!email) missingFields.push("email");

  if (missingFields.length > 0) {
    return res.status(400).json({
      message: `${missingFields.join(", ")} are required`,
    });
  }

  try {
    const proponents = await Proponent.findByPk(id);
    if (!proponents) {
      return res.status(404).json({
        message: "Proponent not found",
      });
    }

    const proponentsUserNameExist = await Proponent.findOne({
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
    const proponents = await Proponent.findByPk(id);
    if (!proponents) {
      return res.status(404).json({
        message: "Proponent not found",
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

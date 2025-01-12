import { Request, Response } from "express";
import { Proponents } from "../models/proponents";

export const GetAllProponents = async (req: Request, res: Response) => {
  try {
    const proponents = await Proponents.findAll();
    res.json(proponents);
  } catch (error) {
    const errorMessage = (error as Error).message;
    res
      .status(500)
      .json({ error: "error getting new proponents", details: errorMessage });
  }
};

export const CreateProponents = async (req: Request, res: Response) => {
  const { departmentId, proponentType, proponentStatus, fullName, password } =
    req.body;

  // Input validation
  const missingFields = [];
  if (!departmentId) missingFields.push("departmentId");
  if (!proponentType) missingFields.push("proponentType");
  if (!proponentStatus) missingFields.push("proponentStatus");
  if (!fullName) missingFields.push("fullName");
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
    const newProponentsId = lastProponents
      ? `A-${String(lastProponents.id + 1).padStart(4, "0")}`
      : "A-0001";
    const newProponents = await Proponents.create({
      proponentId: newProponentsId,
      departmentId,
      proponentType,
      proponentStatus,
      fullName,
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

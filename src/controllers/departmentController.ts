import { Request, Response } from "express";
import { Department } from "../models/department";

export const GetAllDepartments = async (req: Request, res: Response) => {
  try {
    const departments = await Department.findAll();
    res.json(departments);
  } catch (error) {
    const errorMessage = (error as Error).message;
    res
      .status(500)
      .json({ error: "Error getting departments", details: errorMessage });
  }
};

export const CreateDepartment = async (req: Request, res: Response) => {
  const { campusId, departmentName } = req.body;

  // Input validation
  const missingFields = [];
  if (!campusId) missingFields.push("campusId");
  if (!departmentName) missingFields.push("departmentName");

  if (missingFields.length > 0) {
    return res.status(400).json({
      message: `${missingFields.join(", ")} are required`,
    });
  }

  try {
    const lastDepartment = await Department.findOne({
      order: [["id", "DESC"]],
    });
    const newDepartmentId = lastDepartment
      ? `D-${String(lastDepartment.id + 1).padStart(4, "0")}`
      : "D-0001";
    const newDepartment = await Department.create({
      departmentId: newDepartmentId,
      campusId,
      departmentName,
    });
    res.status(201).json(newDepartment);
  } catch (error) {
    const errorMessage = (error as Error).message;
    res.status(500).json({
      error: "Error creating department",
      messageDetails: errorMessage,
    });
  }
};

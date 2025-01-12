import { Request, Response } from "express";
import { Admin } from "../models/admin";

export const GetAllAdmin = async (req: Request, res: Response) => {
  try {
    const admins = await Admin.findAll();
    res.json(admins);
  } catch (error) {
    const errorMessage = (error as Error).message;
    res
      .status(500)
      .json({ error: "error creating new admin", details: errorMessage });
  }
};

export const CreateAdmin = async (req: Request, res: Response) => {
  const { fullName, email, password } = req.body;

  // Input validation
  const missingFields = [];
  if (!fullName) missingFields.push("FullName");
  if (!email) missingFields.push("Email");
  if (!password) missingFields.push("Password");

  if (missingFields.length > 0) {
    return res.status(400).json({
      message: `${missingFields.join(", ")} are required`,
    });
  }

  try {
    const lastAdmin = await Admin.findOne({ order: [["id", "DESC"]] });
    const newAdminId = lastAdmin
      ? `A-${String(lastAdmin.id + 1).padStart(4, "0")}`
      : "A-0001";
    const newAdmin = await Admin.create({
      adminId: newAdminId,
      fullName,
      email,
      password,
    });
    res.status(201).json(newAdmin);
  } catch (error) {
    const errorMessage = (error as Error).message;
    res
      .status(500)
      .json({ error: "Error creating admin", messageDetails: errorMessage });
  }
};

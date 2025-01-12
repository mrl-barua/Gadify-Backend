import { Request, Response } from "express";
import { Campus } from "../models/campus";

export const GetAllCampus = async (req: Request, res: Response) => {
  try {
    const campuses = await Campus.findAll();
    res.json(campuses);
  } catch (error) {
    const errorMessage = (error as Error).message;
    res
      .status(500)
      .json({ error: "Error getting campuses", details: errorMessage });
  }
};

export const CreateCampus = async (req: Request, res: Response) => {
  const { campusName, campusAddress } = req.body;

  // Input validation
  const missingFields = [];
  if (!campusName) missingFields.push("Name");
  if (!campusAddress) missingFields.push("Location");

  if (missingFields.length > 0) {
    return res.status(400).json({
      message: `${missingFields.join(", ")} are required`,
    });
  }

  try {
    const lastCampus = await Campus.findOne({ order: [["id", "DESC"]] });
    const newCampusId = lastCampus
      ? `C-${String(lastCampus.id + 1).padStart(4, "0")}`
      : "C-0001";
    const newCampus = await Campus.create({
      campusId: newCampusId,
      campusName,
      campusAddress,
    });
    res.status(201).json(newCampus);
  } catch (error) {
    const errorMessage = (error as Error).message;
    res
      .status(500)
      .json({ error: "Error creating campus", messageDetails: errorMessage });
  }
};

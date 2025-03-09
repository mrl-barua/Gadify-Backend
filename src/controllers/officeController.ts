import { Request, Response } from "express";
import { Office } from "../models/office";
import { Department } from "../models/department";
import { Campus } from "../models/campus";

export const GetAllOffices = async (req: Request, res: Response) => {
  try {
    const offices = await Office.findAll({
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
    res.json(offices);
  } catch (error) {
    const errorMessage = (error as Error).message;
    res
      .status(500)
      .json({ error: "Error getting offices", details: errorMessage });
  }
};

export const CreateOffice = async (req: Request, res: Response) => {
  const { campusId, departmentId, officeName } = req.body;

  const missingFields = [];
  if (!campusId) missingFields.push("campusId");
  if (!departmentId) missingFields.push("departmentId");
  if (!officeName) missingFields.push("officeName");

  if (missingFields.length > 0) {
    return res.status(400).json({
      message: `${missingFields.join(", ")} are required`,
    });
  }

  try {
    const lastOffice = await Office.findOne({ order: [["id", "DESC"]] });
    const newOfficeId = lastOffice
      ? `O-${String(lastOffice.id + 1).padStart(4, "0")}`
      : "O-0001";
    const newOffice = await Office.create({
      officeId: newOfficeId,
      campusId,
      departmentId,
      officeName,
    });
    res.status(201).json(newOffice);
  } catch (error) {
    const errorMessage = (error as Error).message;
    res
      .status(500)
      .json({ error: "Error creating office", messageDetails: errorMessage });
  }
};

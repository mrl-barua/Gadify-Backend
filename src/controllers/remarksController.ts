import { Request, Response } from "express";
import { Remarks } from "../models/remarks";

export const GetAllRemarks = async (req: Request, res: Response) => {
  try {
    const remarks = await Remarks.findAll();
    res.json(remarks);
  } catch (error) {
    const errorMessage = (error as Error).message;
    res
      .status(500)
      .json({ error: "Error getting remarks", details: errorMessage });
  }
};

export const CreateRemark = async (req: Request, res: Response) => {
  const { remarks } = req.body;

  if (!remarks) {
    return res.status(400).json({
      message: "Remarks are required",
    });
  }

  try {
    const lastRemark = await Remarks.findOne({ order: [["id", "DESC"]] });
    const newRemarkId = lastRemark
      ? `R-${String(lastRemark.id + 1).padStart(4, "0")}`
      : "R-0001";
    const newRemark = await Remarks.create({
      remarksId: newRemarkId,
      remarks,
    });
    res.status(201).json(newRemark);
  } catch (error) {
    const errorMessage = (error as Error).message;
    res
      .status(500)
      .json({ error: "Error creating remark", messageDetails: errorMessage });
  }
};

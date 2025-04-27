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

import { Request, Response } from "express";
import { Admin } from "../models/admin";
import { Proponents, ProponentStatus } from "../models/proponents";
import { approveAccountMail } from "../service/mail-templates/approveAccountMail";
import { rejectAccountMail } from "../service/mail-templates/rejectAccountMail";

export const GetAllAdmin = async (req: Request, res: Response) => {
  try {
    const admins = await Admin.findAll();
    res.json(admins);
  } catch (error) {
    const errorMessage = (error as Error).message;
    res
      .status(500)
      .json({ error: "error getting new admin", details: errorMessage });
  }
};

export const CreateAdmin = async (req: Request, res: Response) => {
  const { fullName, email, password } = req.body;

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

export const ApproveProponent = async (req: Request, res: Response) => {
  const { proponentId } = req.body;

  if (!proponentId) {
    return res.status(400).json({ message: "Proponent ID is required" });
  }

  try {
    const proponent = await Proponents.findByPk(proponentId);
    if (!proponent) {
      return res.status(404).json({ message: "Proponent not found" });
    }

    proponent.proponentStatus = ProponentStatus.Approved;
    await proponent.save();

    try {
      approveAccountMail(proponent.email, proponent.fullName);
    } catch (error: any) {
      console.log(error);
    }

    res.status(200).json(proponent);
  } catch (error) {
    const errorMessage = (error as Error).message;
    res.status(500).json({
      error: "Error approving proponent",
      messageDetails: errorMessage,
    });
  }
};

export const RejectProponent = async (req: Request, res: Response) => {
  const { proponentId } = req.body;

  if (!proponentId) {
    return res.status(400).json({ message: "Proponent ID is required" });
  }

  try {
    const proponent = await Proponents.findByPk(proponentId);
    if (!proponent) {
      return res.status(404).json({ message: "Proponent not found" });
    }

    proponent.proponentStatus = ProponentStatus.Rejected;
    await proponent.save();

    rejectAccountMail(proponent.email, proponent.fullName);

    res.status(200).json(proponent);
  } catch (error) {
    const errorMessage = (error as Error).message;
    res.status(500).json({
      error: "Error rejecting proponent",
      messageDetails: errorMessage,
    });
  }
};

export const GetAdminById = async (req: Request, res: Response) => {
  const { id } = req.body;

  try {
    const admin = await Admin.findByPk(id);
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }
    res.json(admin);
  } catch (error) {
    const errorMessage = (error as Error).message;
    res.status(500).json({
      error: "Error getting admin",
      messageDetails: errorMessage,
    });
  }
};

export const UpdateAdmin = async (req: Request, res: Response) => {
  const { id, adminId, fullName, email } = req.body;

  const missingFields = [];
  if (!id) missingFields.push("id");
  if (!adminId) missingFields.push("adminId");
  if (!fullName) missingFields.push("fullName");
  if (!email) missingFields.push("email");

  if (missingFields.length > 0) {
    return res.status(400).json({
      message: `${missingFields.join(", ")} are required`,
    });
  }

  try {
    const admin = await Admin.findByPk(id);
    if (!admin) {
      return res.status(404).json({
        message: "Admin not found " + id,
      });
    }

    const adminUserNameExist = await Admin.findOne({
      where: { email },
    });
    if (adminUserNameExist && adminUserNameExist.id !== Number(id)) {
      return res.status(400).json({
        message: "Email already exist in the database, please use another",
      });
    }

    await admin.update({
      id,
      adminId,
      fullName,
      email,
    });
    res.json(admin);
  } catch (error) {
    const errorMessage = (error as Error).message;
    res.status(500).json({
      error: "Error updating proponents",
      messageDetails: errorMessage,
    });
  }
};

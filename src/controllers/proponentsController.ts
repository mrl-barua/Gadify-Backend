import { Request, Response } from "express";
import { Op } from "sequelize";
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

export const SearchProponents = async (req: Request, res: Response) => {
  const { searchTerm } = req.body;
  const search = searchTerm ? String(searchTerm) : null;
  try {
    const proponents = await Proponent.findAll({
      where: {
        isDeleted: false,
        [Op.or]: [
          { fullName: { [Op.like]: `%${search}%` } },
          { email: { [Op.like]: `%${search}%` } },
        ],
      },
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
      error: "Error searching proponents",
      details: errorMessage,
    });
  }
};

export const GetAllPendingProponents = async (req: Request, res: Response) => {
  const { page = 1, limit = 10, searchFilter = "" } = req.body;
  const search =
    searchFilter && String(searchFilter).trim() !== ""
      ? String(searchFilter).trim()
      : null;

  const whereCondition: any = {
    isDeleted: false,
    proponentStatus: "Pending",
  };

  if (search) {
    whereCondition[Op.or] = [
      { fullName: { [Op.like]: `%${search}%` } },
      { email: { [Op.like]: `%${search}%` } },
    ];
  }

  try {
    const pageNumber = Math.max(Number(page), 1);
    const limitNumber = Math.max(Number(limit), 1);
    const offset = (Number(pageNumber) - 1) * Number(limitNumber);

    const { rows: proponents, count: total } = await Proponent.findAndCountAll({
      where: whereCondition,
      order: [["id", "DESC"]],
      limit: Number(limit),
      offset,
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

    const totalPages = Math.ceil(total / Number(limit));
    const currentPage = Number(page);

    res.json({
      PendingProponentCount: total,
      CurrentPage: currentPage,
      TotalPages: totalPages,
      Proponents: proponents,
    });
  } catch (error) {
    const errorMessage = (error as Error).message;
    res.status(500).json({
      error: "Error getting proponents with department",
      details: errorMessage,
    });
  }
};

export const GetAllApprovedProponents = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const offset = (page - 1) * limit;

    const { rows: proponents, count: total } = await Proponent.findAndCountAll({
      where: {
        isDeleted: false,
        proponentStatus: "Approved",
      },
      order: [["id", "DESC"]],
      limit,
      offset,
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

export const GetAllRejectedProponents = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const offset = (page - 1) * limit;

    const { rows: proponents, count: total } = await Proponent.findAndCountAll({
      where: {
        isDeleted: false,
        proponentStatus: "Rejected",
      },
      order: [["id", "DESC"]],
      limit,
      offset,
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
    email,
    password,
  } = req.body;

  const missingFields = [];
  if (!departmentId) missingFields.push("departmentId");
  if (!proponentType) missingFields.push("proponentType");
  if (!proponentStatus) missingFields.push("proponentStatus");
  if (!fullName) missingFields.push("fullName");
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
      proponentType === "Insider"
        ? lastProponents
          ? `IN-${String(lastProponents.id + 1).padStart(4, "0")}`
          : "IN-0001"
        : proponentType === "Outsider"
        ? lastProponents
          ? `OUT-${String(lastProponents.id + 1).padStart(4, "0")}`
          : "OUT-0001"
        : null;

    const newProponents = await Proponent.create({
      proponentId: newProponentsId,
      departmentId,
      proponentType,
      proponentStatus,
      fullName,
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
  const { id, departmentId, proponentType, proponentStatus, fullName, email } =
    req.body;

  const missingFields = [];
  if (!departmentId) missingFields.push("departmentId");
  if (!proponentType) missingFields.push("proponentType");
  if (!proponentStatus) missingFields.push("proponentStatus");
  if (!fullName) missingFields.push("fullName");
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

    await proponents.update({
      departmentId,
      proponentType,
      proponentStatus,
      fullName,
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

import express, { Request, Response } from "express";
import { generateToken, hashPassword, comparePassword } from "../auth";
import { Proponents } from "../models/proponents";
import { BlacklistedToken } from "../models/blacklistedToken";
import jwt, { JwtPayload } from "jsonwebtoken";
const router = express.Router();

router.post("/register/proponent", async (req: Request, res: Response) => {
  const {
    departmentId,
    proponentType,
    proponentStatus,
    fullName,
    userName,
    password,
  } = req.body;

  const missingFields = [];
  if (!departmentId) missingFields.push("departmentId");
  if (!proponentType) missingFields.push("proponentType");
  if (!proponentStatus) missingFields.push("proponentStatus");
  if (!fullName) missingFields.push("fullName");
  if (!userName) missingFields.push("userName");
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

    const proponentsUserNameExist = await Proponents.findOne({
      where: { userName },
    });
    if (proponentsUserNameExist) {
      return res.status(400).json({
        message: "Username already exist in the database, please use another",
      });
    }

    const hashedPassword = await hashPassword(password);
    const proponent = await Proponents.create({
      proponentId: newProponentsId,
      departmentId,
      proponentType,
      proponentStatus: "Pending",
      fullName,
      userName,
      password: hashedPassword,
    });

    res
      .status(201)
      .json({ message: "proponents registered successfully", proponent });
  } catch (error) {
    return res.status(500).json({ message: "Error checking for username" });
  }
});

// User login
router.post("/login", async (req: Request, res: Response) => {
  const { userName, password } = req.body;

  if (!userName || !password) {
    return res
      .status(400)
      .json({ message: "username and password are required" });
  }

  console.log("Login request received with username:", userName);

  const proponent = await Proponents.findOne({ where: { userName } });
  if (!proponent) {
    return res.status(400).json({ message: "Invalid username or password" });
  }

  const validPassword = await comparePassword(password, proponent.password);
  if (!validPassword) {
    return res.status(400).json({ message: "Invalid username or password" });
  }

  const token = generateToken({
    id: proponent.id,
    username: proponent.userName,
  });
  res.json({ token });
});

router.post("/logout", async (req: Request, res: Response) => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    return res.status(400).json({ message: "Token is required." });
  }

  // Decode the token to extract expiration
  const decoded = jwt.decode(token) as jwt.JwtPayload;
  const expiresAt = new Date(decoded.exp! * 1000);

  // Save to blacklist
  await BlacklistedToken.create({ token, expiresAt });

  res.json({ message: "Token has been blacklisted." });
});

export default router;

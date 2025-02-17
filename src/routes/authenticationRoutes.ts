import express, { Request, Response } from "express";
import { generateToken, hashPassword, comparePassword } from "../auth";
import { Proponents } from "../models/proponents";
import { Admin } from "../models/admin";
import { Evaluator } from "../models/evaluator";
import { BlacklistedToken } from "../models/blacklistedToken";
import jwt, { JwtPayload } from "jsonwebtoken";
import e from "express";
const router = express.Router();

/* Proponent Login */
router.post("/login/proponent", async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "email and password are required" });
  }

  console.log("Login request received with email:", email);

  const proponent = await Proponents.findOne({ where: { email } });
  if (!proponent) {
    return res.status(400).json({ message: "Invalid email or password" });
  }

  if (proponent.proponentStatus === "Pending") {
    return res.status(400).json({ message: "Account approval is pending" });
  } else if (proponent.proponentStatus === "Rejected") {
    return res.status(403).json({
      message:
        "Your account has been rejected. Please contact the administrator for further assistance.",
    });
  }

  const validPassword = await comparePassword(password, proponent.password);
  if (!validPassword) {
    return res.status(400).json({ message: "Invalid username or password" });
  }

  const token = generateToken({
    id: proponent.id,
    username: proponent.userName,
    role: "proponent",
  });
  res.json({ token });
});

/* Proponent Register */
router.post("/register/proponent", async (req: Request, res: Response) => {
  const {
    departmentId,
    proponentType,
    proponentStatus,
    fullName,
    userName,
    email,
    password,
  } = req.body;

  const missingFields = [];
  if (!departmentId) missingFields.push("departmentId");
  if (!proponentType) missingFields.push("proponentType");
  if (!proponentStatus) missingFields.push("proponentStatus");
  if (!fullName) missingFields.push("fullName");
  if (!userName) missingFields.push("userName");
  if (!email) missingFields.push("email");
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
      email,
      password: hashedPassword,
    });

    res
      .status(201)
      .json({ message: "proponents registered successfully", proponent });
  } catch (error) {
    const errorMessage = (error as Error).message;
    return res
      .status(500)
      .json({ message: "Error checking for username", error: errorMessage });
  }
});

/* Admin Login */
router.post("/login/admin", async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "email and password are required" });
  }

  console.log("Login request received with email:", email);

  const admin = await Admin.findOne({ where: { email } });
  if (!admin) {
    return res.status(400).json({ message: "Invalid email" });
  }

  console.log("Admin Login - Entered Password:", password);
  console.log("Admin Login - Stored Hashed Password:", admin.password);

  const validPassword = await comparePassword(password, admin.password);
  console.log("Admin Login - Password Match:", validPassword);
  if (!validPassword) {
    return res.status(400).json({ message: "Invalid password" });
  }

  const token = generateToken({
    id: admin.id,
    username: admin.email,
    role: "admin",
  });
  res.json({ token });
});

/* Admin Register */
router.post("/register/admin", async (req: Request, res: Response) => {
  const { fullName, email, password } = req.body;

  const missingFields = [];
  if (!fullName) missingFields.push("fullName");
  if (!email) missingFields.push("email");
  if (!password) missingFields.push("password");

  if (missingFields.length > 0) {
    return res.status(400).json({
      message: `${missingFields.join(", ")} are required`,
    });
  }

  try {
    const foundAdmin = await Admin.findOne({ where: { email } });
    if (foundAdmin) {
      return res
        .status(400)
        .json({ message: "Email already registered, use another email" });
    }

    const hashedPassword = await hashPassword(password);
    console.log("Admin Registration - Hashed Password:", hashedPassword);

    const lastAdmin = await Admin.findOne({ order: [["id", "DESC"]] });
    const newAdminId = lastAdmin
      ? `A-${String(lastAdmin.id + 1).padStart(4, "0")}`
      : "A-0001";

    const newAdmin = await Admin.create({
      adminId: newAdminId,
      fullName,
      email,
      password: hashedPassword,
    });

    res.status(201).json(newAdmin);
  } catch (error) {
    const errorMessage = (error as Error).message;
    res
      .status(500)
      .json({ error: "Error creating admin", messageDetails: errorMessage });
  }
});

/* Evaluator Login */
router.post("/login/evaluator", async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "email and password are required" });
  }

  const evaluator = await Evaluator.findOne({ where: { email } });
  if (!evaluator) {
    return res.status(400).json({ message: "Invalid email or password" });
  }

  const validPassword = await comparePassword(password, evaluator.password);
  if (!validPassword) {
    return res.status(400).json({ message: "Invalid email or password" });
  }

  const token = generateToken({
    id: evaluator.id,
    username: evaluator.email,
    role: "evaluator",
  });
  res.json({ token });
});

/* Evaluator Register */
router.post("/register/evaluator", async (req: Request, res: Response) => {
  const { campusId, departmentId, officeId, fullName, email, password } =
    req.body;

  // Input validation
  const missingFields = [];
  if (!campusId) missingFields.push("campusId");
  if (!departmentId) missingFields.push("departmentId");
  if (!officeId) missingFields.push("officeId");
  if (!fullName) missingFields.push("fullName");
  if (!email) missingFields.push("email");
  if (!password) missingFields.push("password");

  if (missingFields.length > 0) {
    return res.status(400).json({
      message: `${missingFields.join(", ")} are required`,
    });
  }

  try {
    const lastEvaluator = await Evaluator.findOne({
      order: [["id", "DESC"]],
    });

    const newEvaluatorId = lastEvaluator
      ? `EV-${String(lastEvaluator.id + 1).padStart(4, "0")}`
      : "EV-0001";

    const evaluatorEmailExist = await Evaluator.findOne({
      where: { email },
    });
    if (evaluatorEmailExist) {
      return res.status(400).json({
        message: "Email already exists in the database, please use another",
      });
    }

    const hashedPassword = await hashPassword(password);
    const newEvaluator = await Evaluator.create({
      evaluatorId: newEvaluatorId,
      campusId,
      departmentId,
      officeId,
      fullName,
      email,
      password: hashedPassword,
    });
    res.status(201).json(newEvaluator);
  } catch (error) {
    const errorMessage = (error as Error).message;
    res.status(500).json({
      error: "Error creating Evaluator",
      messageDetails: errorMessage,
    });
  }
});

/* Logout */
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

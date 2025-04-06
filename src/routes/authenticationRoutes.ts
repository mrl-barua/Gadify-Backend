import express, { Request, Response } from "express";
import { generateToken, hashPassword, comparePassword } from "../auth";
import { Proponent } from "../models/proponent";
import { Admin } from "../models/admin";
import { Evaluator } from "../models/evaluator";
import { BlacklistedToken } from "../models/blacklistedToken";
import { sendMail } from "../service/mailService";
import { userSignUpPendinMail } from "../service/mail-templates/userSignUpPendingMail";
import crypto from "crypto";
import jwt from "jsonwebtoken";
const router = express.Router();

/* Proponent Login */
router.post("/login/proponent", async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "email and password are required" });
  }

  console.log("Login request received with email:", email);

  const proponent = await Proponent.findOne({ where: { email } });
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
    return res.status(400).json({ message: "Invalid email or password" });
  }

  const token = generateToken({
    id: proponent.id,
    username: proponent.fullName,
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

    const proponentsEmailExist = await Proponent.findOne({
      where: { email },
    });
    if (proponentsEmailExist) {
      return res.status(400).json({
        message: "Email already exist in the database, please use another",
      });
    }


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

    const hashedPassword = await hashPassword(password);
    const proponent = await Proponent.create({
      proponentId: newProponentsId,
      departmentId,
      proponentType,
      proponentStatus: "Pending",
      fullName,
      email,
      password: hashedPassword,
    });

    const Admins = await Admin.findAll();
    Admins.forEach(async (admin) => {
      await userSignUpPendinMail(admin.email);
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

/* Proponent change password */
router.post(
  "/changepassword/proponent",
  async (req: Request, res: Response) => {
    const { email, oldPassword, newPassword } = req.body;

    if (!email || !oldPassword || !newPassword) {
      return res.status(400).json({
        message: "email, old password, and new password are required",
      });
    }

    const proponent = await Proponent.findOne({ where: { email } });
    if (!proponent) {
      return res.status(400).json({ message: "Invalid email" });
    }

    const validPassword = await comparePassword(
      oldPassword,
      proponent.password
    );
    if (!validPassword) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const hashedPassword = await hashPassword(newPassword);
    proponent.password = hashedPassword;
    await proponent.save();

    res.json({ message: "Password changed successfully" });
  }
);

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
    username: admin.fullName,
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

/* Admin change password */
router.post("/changepassword/admin", async (req: Request, res: Response) => {
  const { email, oldPassword, newPassword } = req.body;

  if (!email || !oldPassword || !newPassword) {
    return res.status(400).json({
      message: "email, old password, and new password are required",
    });
  }

  const admin = await Admin.findOne({ where: { email } });
  if (!admin) {
    return res.status(400).json({ message: "Invalid email" });
  }

  const validPassword = await comparePassword(oldPassword, admin.password);
  if (!validPassword) {
    return res.status(400).json({ message: "Invalid password" });
  }

  const hashedPassword = await hashPassword(newPassword);
  admin.password = hashedPassword;
  await admin.save();

  res.json({ message: "Password changed successfully" });
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
    username: evaluator.fullName,
    role: "evaluator",
  });
  res.json({ token });
});

/* Evaluator Register */
router.post("/register/evaluator", async (req: Request, res: Response) => {
  const { officeId, fullName, email, password } = req.body;

  const missingFields = [];
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

/* Evaluator change password */
router.post(
  "/changepassword/evaluator",
  async (req: Request, res: Response) => {
    const { email, oldPassword, newPassword } = req.body;

    if (!email || !oldPassword || !newPassword) {
      return res.status(400).json({
        message: "email, old password, and new password are required",
      });
    }

    const evaluator = await Evaluator.findOne({ where: { email } });
    if (!evaluator) {
      return res.status(400).json({ message: "Invalid email" });
    }

    const validPassword = await comparePassword(
      oldPassword,
      evaluator.password
    );
    if (!validPassword) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const hashedPassword = await hashPassword(newPassword);
    evaluator.password = hashedPassword;
    await evaluator.save();

    res.json({ message: "Password changed successfully" });
  }
);

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

/* Forgot Password */
router.post("/forgotpassword", async (req: Request, res: Response) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required." });
  }

  const user =
    (await Proponent.findOne({ where: { email } })) ||
    (await Admin.findOne({ where: { email } })) ||
    (await Evaluator.findOne({ where: { email } }));

  if (!user) {
    return res.status(404).json({ message: "Email not found." });
  }

  const tempPassword = crypto.randomBytes(6).toString("hex");

  const hashedPassword = await hashPassword(tempPassword);

  await user.update({ password: hashedPassword });

  const subjectString = "Password Reset Request";
  const htmlString = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${subjectString}</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f4f4f4;
        margin: 0;
        padding: 0;
      }
      .email-container {
        max-width: 600px;
        margin: 20px auto;
        background: #ffffff;
        border: 1px solid #ddd;
        border-radius: 8px;
        overflow: hidden;
      }
      .email-header {
        background: #4caf50;
        color: white;
        text-align: center;
        padding: 20px 10px;
      }
      .email-body {
        padding: 20px;
        color: #333;
      }
      .email-footer {
        text-align: center;
        padding: 10px;
        background: #f4f4f4;
        color: #666;
        font-size: 0.9em;
      }
    </style>
  </head>
  <body>
    <div class="email-container">
      <div class="email-header">
        <h1>${subjectString}</h1>
      </div>
      <div class="email-body">
        <p>Dear ${user.fullName || "User"},</p>
        <p>You have requested to reset your password. Here is your temporary password:</p>
        <h2 style="color: #4caf50;">${tempPassword}</h2>
        <p>Please use this password to log in and make sure to update your password immediately.</p>
        <p>If you didn't request this reset, please ignore this email or contact support.</p>
        <p>Best regards,</p>
        <p>Gadify Team</p>
      </div>
      <div class="email-footer">
        <p>© ${new Date().getFullYear()} Gadify. All rights reserved.</p>
      </div>
    </div>
  </body>
  </html>
  `;

  try {
    await sendMail(email, subjectString, subjectString, htmlString);
    res.status(200).json({ message: "Temporary password sent to your email." });
  } catch (error) {
    res.status(500).json({ message: "Error sending email", error });
  }
});

export default router;

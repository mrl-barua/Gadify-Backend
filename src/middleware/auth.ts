import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";
import { Express } from "express";
import { BlacklistedToken } from "../models/blacklistedToken";
import user from "../express.d";

dotenv.config();

const secretKey = process.env.JWT_SECRET as string;

export const authenticateJWT = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, secretKey) as JwtPayload;
    req.user = decoded;
    // (req as Request & { user?: string | JwtPayload }).user = decoded;
    next();
  } catch (err) {
    res.status(400).json({ message: "Invalid token." });
  }
};

const isTokenBlacklisted = async (token: string): Promise<boolean> => {
  const blacklisted = await BlacklistedToken.findOne({ where: { token } });
  return !!blacklisted;
};

export const checkBlacklist = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  const blacklisted = await isTokenBlacklisted(token);
  if (blacklisted) {
    return res
      .status(403)
      .json({ message: "Invalid Token, Please Sign in Again" });
  }

  next();
};

export const blacklistToken = async (token: string, expiresAt: Date) => {
  await BlacklistedToken.create({ token, expiresAt });
};

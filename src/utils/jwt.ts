// filepath: /src/utils/jwt.ts
import jwt from "jsonwebtoken";

const secretKey = process.env.SECRET_KEY as string;

export const generateToken = (payload: object) => {
  return jwt.sign(payload, secretKey, { expiresIn: "1h" });
};

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, secretKey);
  } catch (error) {
    return null;
  }
};

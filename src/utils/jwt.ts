// filepath: /src/utils/jwt.ts
import jwt from "jsonwebtoken";

const secretKey = "your_secret_key"; // Replace with your secret key

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

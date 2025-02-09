import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

const secretKey = process.env.JWT_SECRET as string;

export const generateToken = (user: {
  id: number;
  username: string;
  role: string;
}) => {
  return jwt.sign(
    { id: user.id, username: user.username, role: user.role },
    secretKey,
    {
      expiresIn: "1h",
    }
  );
};

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, secretKey);
  } catch (err) {
    return null;
  }
};

export const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

export const comparePassword = async (password: string, hash: string) => {
  console.log("Comparing:", password, "with hash:", hash);
  const result = await bcrypt.compare(password, hash);
  console.log("Password Match Result:", result);
  return result;
};

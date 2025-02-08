import { Request, Response } from "express";
import multer from "multer";
import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import sharp from "sharp";

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    const uploadPath = path.join(__dirname, "../../uploads");
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (_req, file, cb) => {
    const fileExt = path.extname(file.originalname).toLowerCase();
    const randomName = `${uuidv4()}${fileExt}`;
    cb(null, randomName);
  },
});

const upload = multer({ storage });

export const uploadImage = [
  upload.single("image"),
  async (req: Request, res: Response) => {
    if (!req.file) {
      return res.status(400).send("No file uploaded.");
    }

    const originalPath = req.file.path;
    const fileExt = path.extname(req.file.filename).toLowerCase();
    const compressedPath = originalPath.replace(
      fileExt,
      `_compressed${fileExt}`
    );

    try {
      if (
        req.file.mimetype === "image/jpeg" ||
        req.file.mimetype === "image/png"
      ) {
        await sharp(originalPath)
          .resize({ width: 1000 }) // Resize if needed
          .jpeg({ quality: 80 }) // Optimize JPEG
          .png({ quality: 80 }) // Optimize PNG
          .toFile(compressedPath);

        fs.unlinkSync(originalPath);
        fs.renameSync(compressedPath, originalPath);
      }

      res.status(200).send({ image: req.file.filename });
    } catch (error) {
      console.error("Image processing error:", error);
      return res.status(500).send("Error processing image.");
    }
  },
];

export const getImage = (req: Request, res: Response) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, "../../uploads", filename);

  if (fs.existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    res.status(404).send("File not found.");
  }
};

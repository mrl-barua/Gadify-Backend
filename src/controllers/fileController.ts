import { Request, Response } from "express";
import multer from "multer";
import fs from "fs";
import path from "path";

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    const uploadPath = path.join(__dirname, "../../uploadedFiles");
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (_req, file, cb) => {
    const fileExt = path.extname(file.originalname).toLowerCase();
    const baseName = path.basename(file.originalname, fileExt);

    // Replace spaces with hyphens and remove special characters
    const sanitizedFileName = baseName
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^a-zA-Z0-9-_]/g, "");

    cb(null, `${sanitizedFileName}${fileExt}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB file size limit
  fileFilter: (_req, file, cb) => {
    const allowedMimeTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "text/plain",
    ];

    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type. Only PDF, DOCX, and TXT are allowed."));
    }
  },
});

export const uploadFile = [
  upload.single("file"),
  (req: Request, res: Response) => {
    if (!req.file) {
      return res.status(400).send({ error: "No file uploaded." });
    }

    res.status(200).send({ file: req.file.filename });
  },
];

export const getFile = (req: Request, res: Response) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, "../../uploadedFiles", filename);

  if (fs.existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    res.status(404).send({ error: "File not found." });
  }
};

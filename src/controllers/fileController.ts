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

    const sanitizedFileName = baseName
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^a-zA-Z0-9-_]/g, "");

    const uploadPath = path.join(__dirname, "../../uploadedFiles");
    let newFileName = `${sanitizedFileName}${fileExt}`;
    let counter = 1;

    while (fs.existsSync(path.join(uploadPath, newFileName))) {
      newFileName = `${sanitizedFileName}(${counter})${fileExt}`;
      counter++;
    }

    cb(null, newFileName);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
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

export const uploadFiles = [
  upload.array("file", 10),
  (req: Request, res: Response) => {
    if (!req.files || (req.files as Express.Multer.File[]).length === 0) {
      return res.status(400).send({ error: "No files uploaded." });
    }

    const uploadedFiles = (req.files as Express.Multer.File[]).map(
      (file) => file.filename
    );
    res.status(200).send({ files: uploadedFiles });
  },
];

export const getFile = (req: Request, res: Response) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, "../../uploadedFiles", filename);

  if (fs.existsSync(filePath)) {
    res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
    res.sendFile(filePath);
  } else {
    res.status(404).send({ error: "File not found." });
  }
};

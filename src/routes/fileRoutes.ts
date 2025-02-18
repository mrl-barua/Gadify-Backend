import { Router } from "express";

import { getFile, uploadFiles } from "../controllers/fileController";

const router = Router();

router.post("/uploadFiles", uploadFiles);
router.get("/file/:filename", getFile);

export default router;

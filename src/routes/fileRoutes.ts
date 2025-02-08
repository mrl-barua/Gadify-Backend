import { Router } from "express";

import { getFile, uploadFile } from "../controllers/fileController";

const router = Router();

router.post("/uploadFile", uploadFile);
router.get("/file/:filename", getFile);

export default router;

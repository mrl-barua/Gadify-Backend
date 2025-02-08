import { Router } from "express";

import { getImage, uploadImage } from "../controllers/imageController";

const router = Router();

router.post("/uploadImage", uploadImage);
router.get("/image/:filename", getImage);

export default router;

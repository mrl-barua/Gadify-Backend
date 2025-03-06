import { Router } from "express";

import { CreateOffice, GetAllOffices } from "../controllers/officeController";

const router = Router();

router.get("/offices", GetAllOffices);
router.post("/office", CreateOffice);

export default router;

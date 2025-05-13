import { Router } from "express";

import {
  CreateOffice,
  GetAllOffices,
  updateOffice,
} from "../controllers/officeController";

const router = Router();

router.get("/offices", GetAllOffices);
router.post("/office", CreateOffice);
router.put("/office", updateOffice);

export default router;

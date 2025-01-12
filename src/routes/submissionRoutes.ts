import { Router } from "express";

import {
  CreateSubmission,
  GetAllSubmissions,
  AddSubmissionRemarks,
} from "../controllers/submissionController";

const router = Router();

router.get("/submission", GetAllSubmissions);
router.post("/submission", CreateSubmission);

export default router;

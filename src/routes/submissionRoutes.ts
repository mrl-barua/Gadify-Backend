import { Router } from "express";

import {
  CreateSubmission,
  GetAllSubmissions,
  AddSubmissionRemarks,
  GetSubmissionById,
  GetSubmissionsByProponentId,
  AssignEvaluatorsToSubmission,
  GetEvaluatorsBySubmission,
  GetSubmissionEvaluation,
} from "../controllers/submissionController";

const router = Router();

router.get("/submissions", GetAllSubmissions);
router.post("/submission", CreateSubmission);
router.post("/submissionById", GetSubmissionById);
router.post("/submissionByProponentId", GetSubmissionsByProponentId);
router.post("/submissionRemarks", AddSubmissionRemarks);
router.post("/assignEvaluators", AssignEvaluatorsToSubmission);
router.post("/getEvaluators", GetEvaluatorsBySubmission);
router.post("/getSubmissionEvaluation", GetSubmissionEvaluation);

export default router;

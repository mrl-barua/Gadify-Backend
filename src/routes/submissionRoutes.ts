import { Router } from "express";

import {
  CreateSubmission,
  GetAllSubmissions,
  GetAllCompletedSubmissions,
  GetSubmissionById,
  GetSubmissionsByProponentId,
  AssignEvaluatorsToSubmission,
  GetEvaluatorsBySubmission,
  GetSubmissionEvaluationById,
  ApproveSubmission,
  ForCorrectionSubmission,
  ForEvaluationSubmission,
} from "../controllers/submissionController";

const router = Router();

router.get("/submissions", GetAllSubmissions);
router.get("/completedSubmissions", GetAllCompletedSubmissions);
router.post("/submission", CreateSubmission);
router.post("/submissionById", GetSubmissionById);
router.post("/submissionByProponentId", GetSubmissionsByProponentId);
router.post("/assignEvaluators", AssignEvaluatorsToSubmission);
router.post("/getEvaluators", GetEvaluatorsBySubmission);
router.post("/getSubmissionEvaluation", GetSubmissionEvaluationById);
router.post("/approveSubmission", ApproveSubmission);
router.post("/forCorrectionSubmission", ForCorrectionSubmission);
router.post("/forEvaluationSubmission", ForEvaluationSubmission);

export default router;

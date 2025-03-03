import { Router } from "express";

import {
  AddEvaluatorSignature,
  GetAllEvaluators,
  CreateEvaluator,
  GetEvaluatorsWithDetails,
  GetEvaluatorById,
  UpdateEvaluator,
} from "../controllers/evaluatorController";

const router = Router();

router.get("/evaluators", GetEvaluatorsWithDetails);
router.post("/evaluator", CreateEvaluator);
router.post("/getEvaluatorById", GetEvaluatorById);
router.put("/updateEvaluator", UpdateEvaluator);
router.post("/addEvaluatorSignature", AddEvaluatorSignature);

export default router;

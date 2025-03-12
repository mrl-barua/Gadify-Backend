import { Router, Request, Response } from "express";
import GadifyChecklist from "../utils/reportjs/gadify_checklist";
import GadifyMockData from "../utils/reportjs/gadify_mockdata";
import { GetSubmissionEvaluation } from "../controllers/submissionController";

const router = Router();

router.post("/generate-report", async (req: Request, res: Response) => {
  const { submissionId } = req.body;
  try {
    const jsreportInstance = req.app.locals.jsreportInstance;

    if (!jsreportInstance) {
      throw new Error("jsreportInstance is not initialized.");
    }

    const SubmissionData = await GetSubmissionEvaluation(submissionId);

    const report = await jsreportInstance.render({
      template: {
        content: GadifyChecklist,
        engine: "handlebars",
        recipe: "chrome-pdf",
      },
      data: SubmissionData,
    });

    res.setHeader("Content-Type", "application/pdf");
    report.stream.pipe(res);
  } catch (error: any) {
    console.error("Error generating report:", error);
    res.status(500).send(error.message);
  }
});

export default router;

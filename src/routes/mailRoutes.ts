// filepath: /src/routes/mailRoutes.ts
import { Router, Request, Response } from "express";
import { sendMail } from "../service/mailService";

const router = Router();

router.post("/send", async (req: Request, res: Response) => {
  const { to, subject, text, html } = req.body;

  try {
    const info = await sendMail(to, subject, text, html);
    res.status(200).json({ message: "Email sent", info });
  } catch (error) {
    res.status(500).json({ message: "Error sending email", error });
  }
});

export default router;

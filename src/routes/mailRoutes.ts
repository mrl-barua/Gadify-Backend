// filepath: /src/routes/mailRoutes.ts
import { Router, Request, Response } from "express";
import { sendMail } from "../service/mailService";

const router = Router();

router.post("/approve-request", async (req: Request, res: Response) => {
  const { to, subject, text, html } = req.body;

  const approveString: string = "Request Approved";
  const subjectString: string = "Request Approved";

  const htmlString: string = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${subjectString}</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f4f4f4;
        margin: 0;
        padding: 0;
      }
      .email-container {
        max-width: 600px;
        margin: 20px auto;
        background: #ffffff;
        border: 1px solid #ddd;
        border-radius: 8px;
        overflow: hidden;
      }
      .email-header {
        background: #4caf50;
        color: white;
        text-align: center;
        padding: 20px 10px;
      }
      .email-body {
        padding: 20px;
        color: #333;
      }
      .email-footer {
        text-align: center;
        padding: 10px;
        background: #f4f4f4;
        color: #666;
        font-size: 0.9em;
      }
    </style>
  </head>
  <body>
    <div class="email-container">
      <div class="email-header">
        <h1>${approveString}</h1>
      </div>
      <div class="email-body">
        <p>We are pleased to inform you that your request has been approved.</p>
        <p>Thank you for your patience and cooperation.</p>
      </div>
      <div class="email-footer">
        <p>© ${new Date().getFullYear()} Gadify. All rights reserved.</p>
      </div>
    </div>
  </body>
  </html>
  `;

  try {
    const info = await sendMail(to, approveString, subjectString, htmlString);
    res.status(200).json({ message: "Email sent", info });
  } catch (error) {
    res.status(500).json({ message: "Error sending email", error });
  }
});

export default router;

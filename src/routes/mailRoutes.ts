// filepath: /src/routes/mailRoutes.ts
import { Router, Request, Response } from "express";
import { sendMail } from "../service/mailService";

const router = Router();

router.post("/pending-account", async (req: Request, res: Response) => {
  const { to, username } = req.body;

  const subjectString: string = "Account Creation Pending Approval";
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
        <h1>${subjectString}</h1>
      </div>
      <div class="email-body">
        <p>Dear ${username},</p>
        <p>Thank you for registering on the Gadify system. Your account has been successfully created and is currently pending approval from the administrator.</p>
        <p>We will notify you once the review process is complete. If you have any questions in the meantime, feel free to contact the GAD Office.</p>
        <p>Best regards,</p>
        <p>Gadify Team</p>
      </div>
      <div class="email-footer">
        <p>© ${new Date().getFullYear()} Gadify. All rights reserved.</p>
      </div>
    </div>
  </body>
  </html>
  `;

  try {
    const info = await sendMail(to, subjectString, subjectString, htmlString);
    res.status(200).json({ message: "Email sent", info });
  } catch (error) {
    res.status(500).json({ message: "Error sending email", error });
  }
});

router.post("/approve-account", async (req: Request, res: Response) => {
  const { to, username } = req.body;

  const subjectString: string = "Account Approval Notification";

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
        <h1>${subjectString}</h1>
      </div>
      <div class="email-body">
        <p>Dear ${username},</p>
        <p>We are pleased to inform you that your account has been approved. You can now log in to the Gadify system using your registered credentials.</p>
        <p>Start exploring the platform and submitting your proposals today!</p>
        <p>Best regards,</p>
        <p>Gadify Team</p>
      </div>
      <div class="email-footer">
        <p>© ${new Date().getFullYear()} Gadify. All rights reserved.</p>
      </div>
    </div>
  </body>
  </html>
  `;

  try {
    const info = await sendMail(to, subjectString, subjectString, htmlString);
    res.status(200).json({ message: "Email sent", info });
  } catch (error) {
    res.status(500).json({ message: "Error sending email", error });
  }
});

router.post("/reject-account", async (req: Request, res: Response) => {
  const { to, username } = req.body;

  const subjectString: string = "Account Approval Status";

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
        <h1>${subjectString}</h1>
      </div>
      <div class="email-body">
        <p>Dear ${username},</p>
        <p>We regret to inform you that your account request on the Gadify system has been rejected. For further assistance or clarification, please contact the GAD Office.</p>
        <p>We apologize for any inconvenience caused.</p>
        <p>Best regards,</p>
        <p>Gadify Team</p>
      </div>
      <div class="email-footer">
        <p>© ${new Date().getFullYear()} Gadify. All rights reserved.</p>
      </div>
    </div>
  </body>
  </html>
  `;

  try {
    const info = await sendMail(to, subjectString, subjectString, htmlString);
    res.status(200).json({ message: "Email sent", info });
  } catch (error) {
    res.status(500).json({ message: "Error sending email", error });
  }
});

router.post("/proposal-submission", async (req: Request, res: Response) => {
  const { to, username, proposalTitle } = req.body;

  const subjectString: string = "Proposal Submission Confirmation";

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
        <h1>${subjectString}</h1>
      </div>
      <div class="email-body">
        <p>Dear ${username},</p>
        <p>Your proposal titled “[${proposalTitle}]” has been successfully submitted and is now pending evaluation.</p>
        <p>You will be notified once the evaluation process is complete. Thank you for using the Gadify system!</p>
        <p>Best regards,</p>
        <p>Gadify Team</p>
      </div>
      <div class="email-footer">
        <p>© ${new Date().getFullYear()} Gadify. All rights reserved.</p>
      </div>
    </div>
  </body>
  </html>
  `;

  try {
    const info = await sendMail(to, subjectString, subjectString, htmlString);
    res.status(200).json({ message: "Email sent", info });
  } catch (error) {
    res.status(500).json({ message: "Error sending email", error });
  }
});

router.post("/proposal-evaluated", async (req: Request, res: Response) => {
  const { to, username, proposalTitle } = req.body;

  const subjectString: string = "Proposal Evaluation Update";

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
        <h1>${subjectString}</h1>
      </div>
      <div class="email-body">
        <p>Dear ${username},</p>
        <p>We are writing to inform you that your proposal titled “[${proposalTitle}]” has been evaluated.</p>
        <p>Please log in to the Gadify system to review the results and any feedback provided.</p>
        <p>Thank you for your continued engagement with the Gadify system.</p>
        <p>Best regards,</p>
        <p>Gadify Team</p>
      </div>
      <div class="email-footer">
        <p>© ${new Date().getFullYear()} Gadify. All rights reserved.</p>
      </div>
    </div>
  </body>
  </html>
  `;

  try {
    const info = await sendMail(to, subjectString, subjectString, htmlString);
    res.status(200).json({ message: "Email sent", info });
  } catch (error) {
    res.status(500).json({ message: "Error sending email", error });
  }
});

router.post("/proposal-assigned", async (req: Request, res: Response) => {
  const { to, evaluatorName, proposalTitle } = req.body;

  const subjectString: string = "New Proposal Assigned for Evaluation";

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
        <h1>${subjectString}</h1>
      </div>
      <div class="email-body">
        <p>Dear ${evaluatorName},</p>
        <p>A new proposal titled “[${proposalTitle}]” has been assigned to you for evaluation. Please log in to the Gadify system to review and complete the evaluation.</p>
        <p>Your timely response will greatly contribute to the efficiency of the process.</p>
        <p>Best regards,</p>
        <p>Gadify Team</p>
      </div>
      <div class="email-footer">
        <p>© ${new Date().getFullYear()} Gadify. All rights reserved.</p>
      </div>
    </div>
  </body>
  </html>
  `;

  try {
    const info = await sendMail(to, subjectString, subjectString, htmlString);
    res.status(200).json({ message: "Email sent", info });
  } catch (error) {
    res.status(500).json({ message: "Error sending email", error });
  }
});

router.post("/user-signup-pending", async (req: Request, res: Response) => {
  const { to } = req.body;

  const subjectString: string = "User Sign-Up Approval Needed";

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
        <h1>${subjectString}</h1>
      </div>
      <div class="email-body">
        <p>Dear Admin,</p>
        <p>A new user has registered on the Gadify system and is awaiting account approval. Please review the user’s details and take the necessary action.</p>
        <p>Thank you for keeping the system running smoothly.</p>
        <p>Best regards,</p>
        <p>Gadify System</p>
      </div>
      <div class="email-footer">
        <p>© ${new Date().getFullYear()} Gadify. All rights reserved.</p>
      </div>
    </div>
  </body>
  </html>
  `;

  try {
    const info = await sendMail(to, subjectString, subjectString, htmlString);
    res.status(200).json({ message: "Email sent", info });
  } catch (error) {
    res.status(500).json({ message: "Error sending email", error });
  }
});

router.post(
  "/proposal-awaiting-assignment",
  async (req: Request, res: Response) => {
    const { to, proposalTitle } = req.body;

    const subjectString: string = "New Proposal Pending Assignment";

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
        <h1>${subjectString}</h1>
      </div>
      <div class="email-body">
        <p>Dear Admin,</p>
        <p>A new proposal titled “[${proposalTitle}]” has been submitted and requires assignment to an evaluator.</p>
        <p>Please log in to the Gadify system to manage the assignment process.</p>
        <p>Best regards,</p>
        <p>Gadify System</p>
      </div>
      <div class="email-footer">
        <p>© ${new Date().getFullYear()} Gadify. All rights reserved.</p>
      </div>
    </div>
  </body>
  </html>
  `;

    try {
      const info = await sendMail(to, subjectString, subjectString, htmlString);
      res.status(200).json({ message: "Email sent", info });
    } catch (error) {
      res.status(500).json({ message: "Error sending email", error });
    }
  }
);

router.post(
  "/proposal-evaluation-completed",
  async (req: Request, res: Response) => {
    const { to, proposalTitle } = req.body;

    const subjectString: string = "Proposal Evaluation Completed";

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
        <h1>${subjectString}</h1>
      </div>
      <div class="email-body">
        <p>Dear Admin,</p>
        <p>The evaluation for the proposal titled “[${proposalTitle}]” has been completed. Please log in to the Gadify system to review the evaluation results and take further action as needed.</p>
        <p>Best regards,</p>
        <p>Gadify System</p>
      </div>
      <div class="email-footer">
        <p>© ${new Date().getFullYear()} Gadify. All rights reserved.</p>
      </div>
    </div>
  </body>
  </html>
  `;

    try {
      const info = await sendMail(to, subjectString, subjectString, htmlString);
      res.status(200).json({ message: "Email sent", info });
    } catch (error) {
      res.status(500).json({ message: "Error sending email", error });
    }
  }
);

export default router;

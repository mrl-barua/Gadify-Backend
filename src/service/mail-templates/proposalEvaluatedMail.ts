import { sendMail } from "../mailService";

export const proposalEvaluatedMail = async (
  to: string,
  username: string,
  proposalTitle: string
) => {
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
  } catch (error) {
    console.log(error);
  }
};

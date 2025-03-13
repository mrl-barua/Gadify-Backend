import express from "express";
import sequelize from "./config/db";
import cors from "cors";
import { authenticateJWT } from "./middleware/auth";
import { setupAssociations } from "./config/associations";
import Admin from "./routes/adminRoutes";
import Proponents from "./routes/proponentsRoutes";
import Department from "./routes/departmentRoutes";
import Campus from "./routes/campusRoutes";
import Office from "./routes/officeRoutes";
import Evaluator from "./routes/evaluatorRoutes";
import Remarks from "./routes/remarksRoutes";
import Submission from "./routes/submissionRoutes";
import AuthRoutes from "./routes/authenticationRoutes";
import ImageRoutes from "./routes/imageRoutes";
import FileRoutes from "./routes/fileRoutes";
import MailRoutes from "./routes/mailRoutes";
import ReportRoutes from "./routes/reportRoutes";
const jsreport = require("jsreport");

const app = express();
setupAssociations();

const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);
app.use(express.json());

const jsreportInstance = jsreport({
  httpPort: 5488,
  chrome: {
    launchOptions: {
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    },
  },
});
app.locals.jsreportInstance = jsreportInstance;

sequelize
  .authenticate()
  .then(() => {
    console.log("Database connection established.");
    return sequelize.sync({ force: false });
  })
  .then(() => {
    console.log("Database synchronized.");
    return jsreportInstance.init();
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err: Error) => {
    console.error("Error during initialization:", err);
  });

app.use("/api", AuthRoutes);
app.use("/api", authenticateJWT, Admin);
app.use("/api", authenticateJWT, Proponents);
app.use("/api", authenticateJWT, Department);
app.use("/api", authenticateJWT, Campus);
app.use("/api", authenticateJWT, Office);
app.use("/api", authenticateJWT, Evaluator);
app.use("/api", authenticateJWT, Remarks);
app.use("/api", authenticateJWT, Submission);
app.use("/api", authenticateJWT, ImageRoutes);
app.use("/api", authenticateJWT, FileRoutes);
app.use("/mail", authenticateJWT, MailRoutes);
app.use("/report", authenticateJWT, ReportRoutes);

export default app;

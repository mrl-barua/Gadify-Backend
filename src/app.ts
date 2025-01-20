import express from "express";
import { Request, Response } from "express";
import sequelize from "./config/db";
const cors = require("cors");
import { json } from "body-parser";
import {
  authenticateJWT,
  blacklistToken,
  checkBlacklist,
} from "./middleware/auth";
import Admin from "./routes/adminRoutes";
import Proponents from "./routes/proponentsRoutes";
import Department from "./routes/departmentRoutes";
import Campus from "./routes/campusRoutes";
import Office from "./routes/officeRoutes";
import Evaluator from "./routes/evaluatorRoutes";
import Remarks from "./routes/remarksRoutes";
import Submission from "./routes/submissionRoutes";
import AuthRoutes from "./routes/authenticationRoutes";

import mailRoutes from "./routes/mailRoutes";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: "http://localhost:5173", // Replace with your frontend's origin
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);
app.use(express.json());

app.use("/api", AuthRoutes);

app.use("/mail", mailRoutes);

app.use("/api", authenticateJWT, checkBlacklist, Admin);
// app.use("/api", authenticateJWT, Proponents);
// app.use("/api", authenticateJWT, Department);
// app.use("/api", authenticateJWT, Campus);
// app.use("/api", authenticateJWT, Office);
// app.use("/api", authenticateJWT, Evaluator);
// app.use("/api", authenticateJWT, Evaluator);
// app.use("/api", authenticateJWT, Remarks);
// app.use("/api", authenticateJWT, Submission);

// app.use("/api", Admin);
app.use("/api", Proponents);
app.use("/api", Department);
app.use("/api", Campus);
app.use("/api", Office);
app.use("/api", Evaluator);
app.use("/api", Remarks);
app.use("/api", Submission);

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");

    // Sync the models with the database (optional, use { force: true } for dev mode to reset tables)
    sequelize
      .sync({ force: false })
      .then(() => {
        console.log("Database synchronized");
      })
      .catch((err: Error) => {
        console.error("Error synchronizing database:", err);
      });

    // Start the server only after the database connection is successful
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err: Error) => {
    console.error("Unable to connect to the database:", err);
  });

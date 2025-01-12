import express from "express";
import sequelize from "./config/db";
import { json } from "body-parser";

import Admin from "./routes/adminRoutes";
import Proponents from "./routes/proponentsRoutes";
import Department from "./routes/departmentRoutes";
import Campus from "./routes/campusRoutes";
import Office from "./routes/officeRoutes";
import Evaluator from "./routes/evaluatorRoutes";
import Remarks from "./routes/remarksRoutes";
import Submission from "./routes/submissionRoutes";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/api", Admin);
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

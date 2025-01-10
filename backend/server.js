import express from "express";
import cors from "cors";
import authRoute from "./router/auth.route.js";
import { ENV_VAR } from "./config/EnvVar.js";
import connectDB from "./config/db.js";

const app = express();

app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/v1", authRoute);

const PORT = ENV_VAR.PORT;

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
  connectDB();
});
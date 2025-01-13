import express from "express";
import ENV_VAR from "./config/ENV_VAR.js";
import connectDB from "./config/db.js"
import router from "./router/auth.router.js"

const app = express();

const PORT = ENV_VAR.PORT;

app.use(express.json());
app.use("/api/v1/user", router);

app.listen(PORT, () => {
  console.log(`server start at http://localhost:${PORT}`)
  connectDB();
})
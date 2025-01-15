import express from "express";
import ENV_VAR from "./config/ENV_VAR.js";
import connectDB from "./config/db.js"
import userRouter from "./router/auth.router.js"
import adminRouter from "./router/admin.router.js"
import cookieParser from "cookie-parser"

const app = express();

const PORT = ENV_VAR.PORT;

app.use(express.json());
app.use(cookieParser());
app.use("/api/v1/user", userRouter);
app.use("/api/v1/admin", adminRouter);

app.listen(PORT, () => {
  console.log(`server start at http://localhost:${PORT}`)
  connectDB();
})
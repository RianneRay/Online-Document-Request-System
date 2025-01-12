import express from "express";
import ENV_VAR from "./config/ENV_VAR.js";
import connectDB from "./config/db.js"

const app = express();

const PORT = ENV_VAR.PORT;

app.get("/", (req, res) => {
  try {
    res.send("server start")
  } catch (error) {
    console.log("error in server")
    res.status(500).message({success: false, message: error.message})
  }
})

app.listen(PORT, () => {
  console.log(`server start at http://localhost:${PORT}`)
  connectDB();
})
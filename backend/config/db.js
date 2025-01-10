import mongoose from "mongoose";
import { ENV_VAR } from "./EnvVar.js";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(ENV_VAR.MONGO_URI);
    console.log("connected: ", conn.connection.host)
  } catch (error) {
    console.log("error message:", error.message)
    process.exit(1);
  }
}

export default connectDB;
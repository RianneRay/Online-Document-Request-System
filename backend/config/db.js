import mongoose from "mongoose";
import ENV_VAR from "./ENV_VAR.js"


const connectDB = async () => {
  try {
    const conn = await mongoose.connect(ENV_VAR.MONGO_URI);
    console.log(conn.connection.host)
  } catch (error) {
    console.log("error connecting to mongodb");
    process.exit(1)
  }
}

export default connectDB;
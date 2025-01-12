import dotenv from "dotenv";

dotenv.config()

const ENV_VAR = {
  PORT: process.env.PORT,
  MONGO_URI: process.env.MONGO_URI,
}

export default ENV_VAR;
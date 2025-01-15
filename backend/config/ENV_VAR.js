import dotenv from "dotenv";

dotenv.config()

const ENV_VAR = {
  PORT: process.env.PORT,
  MONGO_URI: process.env.MONGO_URI,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY
}

export default ENV_VAR;
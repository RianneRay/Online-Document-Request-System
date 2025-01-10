import dotenv from "dotenv";

dotenv.config();

export const ENV_VAR = {
  PORT: process.env.PORT || 5000,
  MONGO_URI: process.env.MONGO_URI,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
  JWT_EXPIRATION: process.env.JWT_EXPIRATION
}
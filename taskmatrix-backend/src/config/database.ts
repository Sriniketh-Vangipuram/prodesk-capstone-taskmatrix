import mongoose from "mongoose";
import { env } from "./env";
import { logger } from "../shared/utils/logger";

export async function connectDatabase() {
  try {
    await mongoose.connect(env.MONGO_URI);

    logger.info("MongoDB Connected");
  } catch (error) {
    logger.error(error);

    process.exit(1);
  }
}
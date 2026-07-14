import { app } from "./app";
import { connectDatabase } from "./config/database";
import { env } from "./config/env";
import { logger } from "./shared/utils/logger";

async function bootstrap() {
  await connectDatabase();

  app.listen(env.PORT, () => {
    logger.info(`🚀 Server running on port ${env.PORT}`);
  });
}

bootstrap();
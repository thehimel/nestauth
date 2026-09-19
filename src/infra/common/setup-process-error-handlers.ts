import { PinoLogger } from 'nestjs-pino';
import { UNCAUGHT_EXCEPTION_LOG_MESSAGE, UNHANDLED_REJECTION_LOG_MESSAGE } from '@/infra/common/common.constants.js';

export function setupProcessErrorHandlers(logger: PinoLogger): void {
  process.on('uncaughtException', (error) => {
    logger.fatal({ err: error }, UNCAUGHT_EXCEPTION_LOG_MESSAGE);
    process.exit(1);
  });

  process.on('unhandledRejection', (reason) => {
    logger.fatal({ err: reason }, UNHANDLED_REJECTION_LOG_MESSAGE);
    process.exit(1);
  });
}

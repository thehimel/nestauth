import type { PinoLogger } from 'nestjs-pino';
import { UNCAUGHT_EXCEPTION_LOG_MESSAGE, UNHANDLED_REJECTION_LOG_MESSAGE } from '@/infra/common/common.constants.js';
import { setupProcessErrorHandlers } from '@/infra/common/setup-process-error-handlers.js';

describe('setupProcessErrorHandlers', () => {
  let logger: { fatal: ReturnType<typeof vi.fn> };
  let exitSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    logger = { fatal: vi.fn() };
    exitSpy = vi.spyOn(process, 'exit').mockImplementation(() => undefined as never);
    setupProcessErrorHandlers(logger as unknown as PinoLogger);
  });

  afterEach(() => {
    process.removeAllListeners('uncaughtException');
    process.removeAllListeners('unhandledRejection');
    exitSpy.mockRestore();
  });

  it('logs and exits on an uncaught exception', () => {
    const error = new Error('boom');
    process.emit('uncaughtException', error);

    expect(logger.fatal).toHaveBeenCalledWith({ err: error }, UNCAUGHT_EXCEPTION_LOG_MESSAGE);
    expect(exitSpy).toHaveBeenCalledWith(1);
  });

  it('logs and exits on an unhandled rejection', () => {
    const reason = new Error('rejected');
    process.emit('unhandledRejection', reason, Promise.resolve());

    expect(logger.fatal).toHaveBeenCalledWith({ err: reason }, UNHANDLED_REJECTION_LOG_MESSAGE);
    expect(exitSpy).toHaveBeenCalledWith(1);
  });
});

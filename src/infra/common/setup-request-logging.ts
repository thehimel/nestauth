import { NestFastifyApplication } from '@nestjs/platform-fastify';
import { PinoLogger } from 'nestjs-pino';
import { REQUEST_COMPLETED_LOG_MESSAGE } from '@/infra/common/common.constants.js';

/**
 * A native hook, not middleware, since middleware can end a response without handing back
 * control, silently skipping any logger further down the chain.
 *
 * Fields stay flat: nesting under `req`/`res` would hit serializers built for real Fastify
 * objects and mangle a plain one.
 */
export function setupRequestLogging(app: NestFastifyApplication, logger: PinoLogger): void {
  app
    .getHttpAdapter()
    .getInstance()
    .addHook('onResponse', (request, reply, done) => {
      logger.info(
        {
          requestId: request.id,
          method: request.method,
          url: request.url,
          statusCode: reply.statusCode,
          responseTime: reply.elapsedTime,
        },
        REQUEST_COMPLETED_LOG_MESSAGE,
      );
      done();
    });
}

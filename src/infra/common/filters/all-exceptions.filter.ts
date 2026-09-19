import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { STATUS_CODES } from 'node:http';
import type { FastifyReply, FastifyRequest } from 'fastify';
import { PinoLogger } from 'nestjs-pino';
import {
  HANDLED_EXCEPTION_LOG_MESSAGE,
  INTERNAL_SERVER_ERROR_MESSAGE,
  MESSAGE_JOIN_SEPARATOR,
  PROBLEM_DETAILS_CONTENT_TYPE,
  PROBLEM_TYPE_ABOUT_BLANK,
  UNHANDLED_EXCEPTION_LOG_MESSAGE,
} from '@/infra/common/common.constants.js';
import { DomainError } from '@/infra/common/errors/domain.error.js';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly logger: PinoLogger) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<FastifyReply>();
    const request = ctx.getRequest<FastifyRequest>();

    const status = this.resolveStatus(exception);
    const detail = this.resolveDetail(exception);
    this.logException(exception, status, request.id);

    response
      .status(status)
      .type(PROBLEM_DETAILS_CONTENT_TYPE)
      .send({
        type: PROBLEM_TYPE_ABOUT_BLANK,
        title: STATUS_CODES[status] ?? INTERNAL_SERVER_ERROR_MESSAGE,
        status,
        detail,
        instance: request.url,
        timestamp: new Date().toISOString(),
        requestId: request.id,
      });
  }

  private logException(exception: unknown, status: number, requestId: string): void {
    const logPayload = { err: exception, requestId };

    if (status >= HttpStatus.INTERNAL_SERVER_ERROR) {
      this.logger.error(logPayload, UNHANDLED_EXCEPTION_LOG_MESSAGE);
      return;
    }

    this.logger.warn(logPayload, HANDLED_EXCEPTION_LOG_MESSAGE);
  }

  private resolveStatus(exception: unknown): number {
    if (exception instanceof DomainError) {
      return exception.httpStatus;
    }

    if (exception instanceof HttpException) {
      return exception.getStatus();
    }

    return HttpStatus.INTERNAL_SERVER_ERROR;
  }

  private resolveDetail(exception: unknown): string {
    if (exception instanceof DomainError) {
      return exception.message;
    }

    if (!(exception instanceof HttpException)) {
      return INTERNAL_SERVER_ERROR_MESSAGE;
    }

    const exceptionResponse = exception.getResponse();
    if (typeof exceptionResponse === 'string') {
      return exceptionResponse;
    }

    const { message } = exceptionResponse as { message?: string | string[] };
    if (Array.isArray(message)) {
      return message.join(MESSAGE_JOIN_SEPARATOR);
    }

    return message ?? exception.message;
  }
}

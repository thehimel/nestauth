import { z } from 'zod';
import { MESSAGE_JOIN_SEPARATOR } from '@/infra/common/common.constants.js';
import {
  CORS_ORIGIN_SEPARATOR,
  DEFAULT_CORS_ALLOWED_ORIGINS,
  DEFAULT_NODE_ENV,
  DEFAULT_PORT,
} from '@/infra/config/config.constants.js';

const envSchema = z.object({
  PORT: z.coerce.number().int().positive().default(DEFAULT_PORT),
  NODE_ENV: z.string().default(DEFAULT_NODE_ENV),
  CORS_ALLOWED_ORIGINS: z
    .string()
    .default(DEFAULT_CORS_ALLOWED_ORIGINS)
    .transform((value) =>
      value
        .split(CORS_ORIGIN_SEPARATOR)
        .map((origin) => origin.trim())
        .filter((origin) => origin.length > 0),
    ),
});

export type EnvironmentVariables = z.infer<typeof envSchema>;

export function validateEnv(config: Record<string, unknown>): EnvironmentVariables {
  const result = envSchema.safeParse(config);
  if (!result.success) {
    const issues = result.error.issues.map((issue) => `${issue.path.join('.')}: ${issue.message}`);
    throw new Error(`Invalid environment variables: ${issues.join(MESSAGE_JOIN_SEPARATOR)}`);
  }

  return result.data;
}

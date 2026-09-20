import { betterAuth, type Auth, type BetterAuthOptions } from 'better-auth';
import { bearer, magicLink, openAPI } from 'better-auth/plugins';
import { drizzleAdapter } from '@better-auth/drizzle-adapter/relations-v2';
import { drizzle } from 'drizzle-orm/postgres-js';
// Relative imports: this file can be loaded outside Nest's own module resolution, which does
// not understand the "@/" alias.
import { CORS_ORIGIN_SEPARATOR, NODE_ENV_PRODUCTION } from '../infra/config/config.constants.js';
import { sendMagicLinkEmail } from '../infra/mail/mail.js';
import { account, authRelations, session, user, verification } from './auth.schema.js';

// Falls back to loading .env directly, for when this file runs outside Nest's own bootstrap.
if (!process.env.DATABASE_URL) {
  process.loadEnvFile();
}

const db = drizzle(process.env.DATABASE_URL as string, { relations: authRelations });

const trustedOrigins = (process.env.CORS_ALLOWED_ORIGINS ?? '')
  .split(CORS_ORIGIN_SEPARATOR)
  .map((origin) => origin.trim())
  .filter((origin) => origin.length > 0);

const isProduction = process.env.NODE_ENV === NODE_ENV_PRODUCTION;

const authOptions: BetterAuthOptions = {
  database: drizzleAdapter(db, {
    provider: 'pg',
    schemaName: 'auth',
    schema: { user, session, account, verification },
  }),
  secret: process.env.BETTER_AUTH_SECRET,
  baseURL: process.env.BETTER_AUTH_URL,
  trustedOrigins,
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
    apple: {
      clientId: process.env.APPLE_CLIENT_ID as string,
      clientSecret: process.env.APPLE_CLIENT_SECRET as string,
    },
  },
  plugins: [
    bearer(),
    magicLink({
      sendMagicLink: ({ email, url }) => sendMagicLinkEmail(email, url),
      storeToken: 'hashed',
    }),
    ...(isProduction ? [] : [openAPI()]),
  ],
};

export const auth: Auth = betterAuth(authOptions);

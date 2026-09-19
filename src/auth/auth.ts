import { betterAuth, type Auth, type BetterAuthOptions } from 'better-auth';
import { drizzleAdapter } from '@better-auth/drizzle-adapter/relations-v2';
import { drizzle } from 'drizzle-orm/postgres-js';
// Relative import: this file can be loaded outside Nest's own module resolution, which does
// not understand the "@/" alias.
import { account, authRelations, session, user, verification } from './auth.schema.js';

// Falls back to loading .env directly, for when this file runs outside Nest's own bootstrap.
if (!process.env.DATABASE_URL) {
  process.loadEnvFile();
}

const db = drizzle(process.env.DATABASE_URL as string, { relations: authRelations });

const authOptions: BetterAuthOptions = {
  database: drizzleAdapter(db, {
    provider: 'pg',
    schemaName: 'auth',
    schema: { user, session, account, verification },
  }),
  secret: process.env.BETTER_AUTH_SECRET,
  baseURL: process.env.BETTER_AUTH_URL,
  emailAndPassword: {
    enabled: true,
  },
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
};

export const auth: Auth = betterAuth(authOptions);

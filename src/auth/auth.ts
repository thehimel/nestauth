import { betterAuth, type Auth, type BetterAuthOptions } from 'better-auth';
import { drizzleAdapter } from '@better-auth/drizzle-adapter';
import { drizzle } from 'drizzle-orm/postgres-js';
import { AUTH_SCHEMA_NAME } from '@/auth/auth.constants.js';

// Loaded standalone by the Better Auth CLI, outside Nest's own env loading.
if (!process.env.DATABASE_URL) {
  process.loadEnvFile();
}

const db = drizzle(process.env.DATABASE_URL as string);

const authOptions: BetterAuthOptions = {
  database: drizzleAdapter(db, { provider: 'pg', schemaName: AUTH_SCHEMA_NAME }),
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

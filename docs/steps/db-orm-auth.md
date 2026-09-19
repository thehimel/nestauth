# Database, ORM, and Auth

Steps taken to set up the database, ORM, and authentication.

## Steps

- Connected the app to a Neon Postgres database using `postgres.js` approach. Reference: [Neon: Connect a NestJS Application to Neon](https://neon.com/docs/guides/nestjs)
- Added a startup check confirming the app can reach the database, as part of the existing health check.
- Switched the database connection to Drizzle ORM, replacing the plain Postgres client used at first. Reference: [Drizzle: PostgreSQL](https://orm.drizzle.team/docs/get-started-postgresql)
- Installed Better Auth and connected it to the database through Drizzle's adapter. Reference: [Better Auth: Drizzle ORM Adapter](https://better-auth.com/docs/adapters/drizzle)
- Turned on Google and Apple as social sign-in options inside Better Auth.
- Generated and ran the database migration that created the authentication tables with Drizzle Kit. Reference: [Drizzle: Migrations With Drizzle Kit](https://orm.drizzle.team/docs/kit-overview)
- Installed a community package connecting Better Auth to NestJS, so sign-in state is available across the app, and routes are protected by default. Reference: [Better Auth: NestJS Integration](https://better-auth.com/docs/integrations/nestjs)
- Marked the health check and homepage as open to everyone, since every other route now requires sign-in by default.
- Installed Resend and set it up as the app's email sender.
- Turned on Better Auth's magic link option, so a user signs in through a one-time email link sent via Resend instead of a password. Reference: [Resend: Send Emails With Next.js](https://resend.com/docs/send-with-nextjs)

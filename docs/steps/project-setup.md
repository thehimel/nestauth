# Project Setup

Steps taken after the initial scaffold, in order.

- Pre-Commit Hooks: Husky + lint-staged, runs `prettier --write` then `oxlint --type-aware` on staged `*.ts` files.
- Path Aliases: `@/*` maps to `./src/*` in `tsconfig.json`, replacing relative `../` imports.
- HTTP Engine: Switched from Express to Fastify (`@nestjs/platform-fastify`), with `@fastify/static` serving the Swagger UI assets.
- Module Restructuring: Placeholder root route moved out of `AppModule` into its own `IndexModule`, marked version-neutral so it stays reachable at `/` regardless of API versioning. `AppModule` is now a pure composition root.
- API Versioning: URI versioning, default version `1`, so routes are prefixed `/v1` unless a controller explicitly opts out as version-neutral.
- Config: `ConfigModule` with validated env vars (`PORT`, `NODE_ENV`, `BRAND_NAME`, `CORS_ALLOWED_ORIGINS`), see `.env.example`.
- Health Check: `HealthModule`, version-neutral. `GET /health/live` is a bare liveness ping. `GET /health/ready` checks a memory heap threshold and the database connection.
- Exception Handling: `AllExceptionsFilter`, returns an RFC 7807 problem+json error shape (`type`, `title`, `status`, `detail`, `instance`, `timestamp`, `requestId`).
- Logging: `pino` via `nestjs-pino`, redacts auth headers and cookies. Completed requests are logged through a native Fastify hook rather than middleware, so a request fully handled outside NestJS's own routing still gets logged.
- Rate Limiting: `@nestjs/throttler`, applied globally, with health checks exempt.
- Security: CORS and `@fastify/helmet` enabled on every request.
- Compression: `@fastify/compress` enabled on every response.
- OpenAPI Docs: `@nestjs/swagger`, CLI plugin enabled in `nest-cli.json`, served at `/docs`. Disabled entirely in production. No spec files committed.
- QA Tooling: `typecheck` script, `.prettierignore`, `engines` and `packageManager` pinning, `test:cov` coverage thresholds (regression gate at current baseline).

# Render

Guide to deploy this project to Render and connect a custom domain.

## Deployment

- Create a new Web Service on Render, connected to the `main` branch of this repository.
- Runtime: `Node`.
- Region: pick whichever is closest to your users.
- Build Command: `pnpm install --frozen-lockfile; pnpm run build`.
- Start Command: `pnpm run start:prod`.
- Add all required environment variables to the service's Environment tab, including `NODE_ENV=production` set explicitly rather than relying on Render's default.
- Leave `PORT` unset since Render assigns and injects it automatically, and the app already reads it from the environment.

## Before It Runs

- Make sure the app binds to `0.0.0.0`, not `127.0.0.1`. Render's port scanner checks `0.0.0.0`, and a server bound only to `127.0.0.1` makes it report "No open ports detected."

## Custom Domain

- If the domain's nameservers point to a platform other than its registrar, such as Vercel, manage DNS records there instead of at the registrar.
- In Render, add the desired subdomain, for example `api.example.com`, as a custom domain for the service.
- Render asks for a `CNAME` record pointing the subdomain's hostname to the service's own Render URL.
- Add that record wherever DNS is managed, matching what Render asked for.
- Keep the DNS record in place permanently, not just until verification. It is what makes the domain resolve to the service on every request, not a one-time check.
- Wait for Render to verify the domain and issue a TLS certificate for it. Verification is usually immediate, certificate issuance took about 10 minutes here, but it can vary.
- While the certificate status still shows pending, requests to the domain over HTTPS fail with a TLS handshake error rather than a slow response.
- That is expected, not a sign something is broken. Wait for the status to flip before testing again.
- Update `BETTER_AUTH_URL` to the new domain once it is live.

## Notes

- Render's free plan spins down after inactivity and caps usage at 750 instance hours a month, shared across every free service on the account.
- An external uptime pinger can prevent the spin-down, but it only trades that problem for the hour cap, and going over the cap suspends every free service until the next billing cycle.
- Use a paid plan for anything meant to stay always on.

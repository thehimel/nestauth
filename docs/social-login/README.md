# Social Login

Setup for social sign-in.

## How It Works

Better Auth handles OAuth under `/api/auth`. The client calls `POST /api/auth/sign-in/social` with `{ "provider": "google" }`, which returns a redirect URL. The provider redirects back to `/api/auth/callback/<provider>` on the backend.

## Google

In the Google Cloud Console OAuth client, set:

- Authorized JavaScript origins: your frontend's origin, for example `https://app.example.com`, plus `http://localhost:3000` for local development.
- Authorized redirect URIs: your backend's own origin plus the callback path, for example `https://api.example.com/api/auth/callback/google`, plus `http://localhost:8000/api/auth/callback/google` for local development.

## Apple

Not configured yet. `APPLE_CLIENT_ID` and `APPLE_CLIENT_SECRET` are still placeholders.

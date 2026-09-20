# Use the official Node slim image (smaller footprint than the full image)
FROM node:22-slim

# Enable Corepack so it fetches the pnpm version pinned in package.json
RUN corepack enable

# Set the working directory for subsequent commands
WORKDIR /usr/src/app

# Copy dependency files first to leverage layer caching
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# Copy the rest of the application code
COPY . ./
RUN pnpm build

# In development, watch and recompile on change; otherwise run the compiled build.
# Binds to 0.0.0.0 either way, so the app is reachable from outside the container.
CMD ["sh", "-c", "if [ \"$NODE_ENV\" = development ]; then exec pnpm start:dev; else exec node dist/main; fi"]

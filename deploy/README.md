# Hostinger production

VPS: srv1870777.hstgr.cloud (147.93.52.144). Project: liliansevoumian.

The GitHub Actions workflow deploys main using a dedicated forced-command SSH key.
The receiver accepts a commit archive, builds and tests a Docker image, checks a
candidate container, then updates the app. A failed cutover restores the previous
image. /docker/liliansevoumian/.env.previous preserves the last rollback image.

Runtime secret: /opt/liliansevoumian/secrets/runtime.env (LUMAIL_API_KEY).
Never put secrets in the image or archive. Caddy overwrites X-Real-IP and proxies
to liliansevoumian-app:3000 on agenceafk_default. The app only publishes localhost:3100.

Deployment scripts and Compose are operator-provisioned files. Updating files in
this folder alone does not update the installed scripts or Compose: review and
copy those explicitly before the next deployment. This prevents uploaded commits
from changing the SSH receiver. Do not overwrite shared ingress during AFK deploys.
Keep the liliansevoumian site blocks in /opt/agenceafk/current/deploy/Caddyfile.

Validation: pnpm exec tsc --noEmit; node --test deploy/server.test.mjs;
Docker build (includes Astro production build and tests), then check actual HTTPS
routes and the newsletter validation path. Unit tests never send subscriber emails.

Rollback: copy /docker/liliansevoumian/.env.previous to .env and run
`docker compose --project-directory /docker/liliansevoumian -f /docker/liliansevoumian/docker-compose.yml up -d --wait`.
DNS rollback: apex A was 216.198.79.1; www CNAME was
4bfc3be86171ae1a.vercel-dns-017.com. Vercel remains available during migration.

Retention: keep current and previous images/releases. Review older images and
release directories periodically; never run global Docker prune on this shared VPS.

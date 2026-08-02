# Cineguru production deployment

The production server uses two independent layers:

- Public: a static `Yenileniyoruz` page served directly by Nginx.
- Candidate: the latest verified Next.js standalone build on `127.0.0.1:3020`.

Merges to `main` build, lint, test, audit and deploy the private candidate. They
do **not** publish the unapproved website. Publishing later is a reviewed Nginx
configuration switch from `wearecineguru-maintenance.conf` to
`wearecineguru-application.conf`.

## GitHub production secrets

The `production` environment contains:

- `CINEGURU_DEPLOY_HOST`
- `CINEGURU_DEPLOY_USER`
- `CINEGURU_DEPLOY_SSH_KEY`
- `CINEGURU_DEPLOY_HOST_KEY`

The SSH key has no expiry date. It is dedicated to this repository, has no
interactive password, and its forced-command gate accepts only a strictly named
archive upload followed by the validated deployment wrapper. It cannot open a
shell, TTY or forwarding session. Rotate it immediately if exposure is
suspected.

## Publishing after client approval

On the server, first verify the candidate on loopback, then atomically install
the application Nginx template and reload Nginx. Always run `nginx -t` before a
reload. The maintenance template remains in this repository for instant,
reviewed rollback.

## Recovery and retention

- The pre-removal WordPress files/database backup is root-only under
  `/root/incident-backups`.
- The eight newest application releases remain on the server for rollback.
- A root-only configuration/site snapshot runs daily and retains 45 days.
- Operational hashes are checked every ten minutes and logs rotate daily.

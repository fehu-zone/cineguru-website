#!/usr/bin/env bash
set -Eeuo pipefail

BACKUP_ROOT=/root/site-backups/cineguru
APP_ROOT=/srv/cineguru/app
MAINTENANCE=/srv/cineguru/maintenance
LOCK=/run/lock/cineguru-backup.lock
LOG=/var/log/cineguru-backup.log
STAMP="$(date -u +%Y%m%dT%H%M%SZ)"
TEMP="$BACKUP_ROOT/.tmp-$STAMP"
FINAL="$BACKUP_ROOT/$STAMP"

install -d -m 0700 "$BACKUP_ROOT"
touch "$LOG"
chmod 0600 "$LOG"
exec 9>"$LOCK"
flock -n 9 || exit 0
mkdir -m 0700 "$TEMP"
trap 'rm -rf -- "$TEMP"' EXIT

tar --dereference -C /srv/cineguru -czf "$TEMP/site-state.tar.gz" maintenance app/current
tar -C / -czf "$TEMP/server-config.tar.gz" \
  etc/nginx/sites-available/wearecineguru.com \
  etc/systemd/system/cineguru.service \
  usr/local/sbin/cineguru-deploy.sh
{
  printf 'created_utc=%s\n' "$(date -u +%FT%TZ)"
  printf 'current_release=%s\n' "$(readlink -f "$APP_ROOT/current")"
  printf 'maintenance_sha256=%s\n' "$(sha256sum "$MAINTENANCE/index.html" | awk '{print $1}')"
} > "$TEMP/MANIFEST.txt"
(
  cd "$TEMP"
  sha256sum MANIFEST.txt server-config.tar.gz site-state.tar.gz > SHA256SUMS
  sha256sum -c SHA256SUMS
)
chmod 0600 "$TEMP"/*
mv -- "$TEMP" "$FINAL"
trap - EXIT

# This target is fixed and validated before removing expired snapshots.
[[ "$(readlink -f "$BACKUP_ROOT")" == /root/site-backups/cineguru ]]
find "$BACKUP_ROOT" -mindepth 1 -maxdepth 1 -type d -name '20????????T??????Z' -mtime +45 -exec rm -rf -- {} +
printf '[%s] BACKUP_OK path=%s\n' "$(date -Is)" "$FINAL" >> "$LOG"

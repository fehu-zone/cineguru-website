#!/usr/bin/env bash
set -Eeuo pipefail

STATE_DIR=/var/lib/cineguru-integrity
BASELINE="$STATE_DIR/baseline.sha256"
CURRENT="$STATE_DIR/current.sha256"
LOG=/var/log/cineguru-integrity.log
LOCK=/run/lock/cineguru-integrity.lock

install -d -m 0700 "$STATE_DIR"
touch "$LOG"
chmod 0600 "$LOG"
exec 9>"$LOCK"
flock -n 9 || exit 0

snapshot() {
  local target="$1"
  local current_release
  current_release="$(readlink -f /srv/cineguru/app/current 2>/dev/null || true)"
  {
    for file in \
      /srv/cineguru/maintenance/index.html \
      /etc/nginx/sites-available/wearecineguru.com \
      /etc/systemd/system/cineguru.service \
      /usr/local/sbin/cineguru-deploy.sh \
      /usr/local/sbin/cineguru-backup.sh \
      /usr/local/sbin/cineguru-integrity-watch.sh; do
      [[ -f "$file" ]] && sha256sum "$file" || printf 'MISSING %s\n' "$file"
    done
    if [[ "$current_release" == /srv/cineguru/app/releases/* ]]; then
      for file in server.js package.json DEPLOY-METADATA .next/BUILD_ID; do
        [[ -f "$current_release/$file" ]] && sha256sum "$current_release/$file" || printf 'MISSING %s/%s\n' "$current_release" "$file"
      done
    else
      printf 'INVALID_CURRENT %s\n' "$current_release"
    fi
    find /srv/cineguru/maintenance -xdev \( -type f -o -type d \) -perm /0022 -printf 'PUBLIC_WRITABLE %m %u:%g %p\n'
    find /srv/cineguru/maintenance -xdev -type f \( -iname '*.php' -o -iname '*.phtml' -o -iname '*.phar' \) -printf 'PHP_FILE %p\n'
  } | LC_ALL=C sort > "$target"
  chmod 0600 "$target"
}

if [[ "${1:-}" == --init ]]; then
  snapshot "$BASELINE"
  cp "$BASELINE" "$CURRENT"
  printf '[%s] BASELINE_INITIALIZED\n' "$(date -Is)" >> "$LOG"
  exit 0
fi

snapshot "$CURRENT"
if ! cmp -s "$BASELINE" "$CURRENT"; then
  printf '[%s] INTEGRITY_DRIFT\n' "$(date -Is)" >> "$LOG"
  diff -u "$BASELINE" "$CURRENT" >> "$LOG" 2>&1 || true
  exit 1
fi
printf '[%s] INTEGRITY_OK\n' "$(date -Is)" >> "$LOG"

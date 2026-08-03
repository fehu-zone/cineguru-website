#!/usr/bin/env bash
set -Eeuo pipefail

PACKAGE="${1:?usage: cineguru-deploy.sh /srv/cineguru/app/.incoming/cineguru-*.tgz}"
APP_ROOT=/srv/cineguru/app
INCOMING="$APP_ROOT/.incoming"
RELEASES="$APP_ROOT/releases"
CURRENT="$APP_ROOT/current"
MAINTENANCE_ROOT=/srv/cineguru/maintenance
LOG=/var/log/cineguru-deploy.log
WORK_DIR="$(mktemp -d "$APP_ROOT/.deploy.XXXXXX")"
PREVIOUS_TARGET=""
NEW_RELEASE=""

cleanup() {
  rm -rf -- "$WORK_DIR"
}
trap cleanup EXIT

log() {
  printf '[%s] %s\n' "$(date -Is)" "$*" | tee -a "$LOG"
}

fail() {
  log "ERROR $*"
  exit 1
}

[[ "$(id -u)" -eq 0 ]] || fail 'must run as root'
[[ "$PACKAGE" == "$INCOMING"/cineguru-*.tgz ]] || fail 'unexpected package path'
[[ -f "$PACKAGE" && ! -L "$PACKAGE" ]] || fail 'package must be a regular file'
[[ "$(readlink -f -- "$(dirname -- "$PACKAGE")")" == "$INCOMING" ]] || fail 'incoming directory mismatch'
[[ "$(stat -c '%U' "$PACKAGE")" == cinegurudeploy ]] || fail 'unexpected package owner'
[[ "$(stat -c '%s' "$PACKAGE")" -le 1073741824 ]] || fail 'package exceeds 1 GiB limit'

touch "$LOG"
chmod 0600 "$LOG"
tar -tzf "$PACKAGE" >/dev/null || fail 'invalid gzip tar archive'
if tar -tzf "$PACKAGE" | sed 's#^\./##' | grep -Eq '(^/|(^|/)\.\.(/|$))'; then
  fail 'unsafe archive path'
fi
tar --no-same-owner --no-same-permissions -xzf "$PACKAGE" -C "$WORK_DIR"

[[ -f "$WORK_DIR/server.js" ]] || fail 'standalone server.js is missing'
[[ -f "$WORK_DIR/package.json" ]] || fail 'package.json is missing'
[[ -f "$WORK_DIR/DEPLOY-METADATA" ]] || fail 'deployment metadata is missing'

COMMIT="$(awk -F= '$1 == "commit" {print $2}' "$WORK_DIR/DEPLOY-METADATA")"
[[ "$COMMIT" =~ ^[0-9a-f]{40}$ ]] || fail 'invalid commit metadata'
STAMP="$(date -u +%Y%m%dT%H%M%SZ)"
NEW_RELEASE="$RELEASES/$STAMP-${COMMIT:0:12}"
[[ ! -e "$NEW_RELEASE" ]] || fail 'release already exists'

install -d -o root -g root -m 0755 "$RELEASES"
mv -- "$WORK_DIR" "$NEW_RELEASE"
trap - EXIT
chown -R root:root "$NEW_RELEASE"
find "$NEW_RELEASE" -xdev -type d -exec chmod 0755 {} +
find "$NEW_RELEASE" -xdev -type f -exec chmod 0644 {} +
install -d -o cineguru -g cineguru -m 0750 "$NEW_RELEASE/.next/cache"

if [[ -L "$CURRENT" ]]; then
  PREVIOUS_TARGET="$(readlink -f -- "$CURRENT")"
fi
rm -f -- "$APP_ROOT/.current-new"
ln -s "$NEW_RELEASE" "$APP_ROOT/.current-new"
mv -Tf "$APP_ROOT/.current-new" "$CURRENT"

if ! systemctl restart cineguru.service; then
  [[ -n "$PREVIOUS_TARGET" ]] && ln -sfn "$PREVIOUS_TARGET" "$CURRENT"
  systemctl restart cineguru.service || true
  fail 'service restart failed; previous release restored'
fi

HEALTHY=0
for _ in {1..30}; do
  if curl --fail --silent --show-error --max-time 3 \
    -H 'Host: www.wearecineguru.com' http://127.0.0.1:3020/tr >/dev/null; then
    HEALTHY=1
    break
  fi
  sleep 1
done
if [[ "$HEALTHY" -ne 1 ]]; then
  if [[ -n "$PREVIOUS_TARGET" ]]; then
    ln -sfn "$PREVIOUS_TARGET" "$CURRENT"
    systemctl restart cineguru.service || true
  else
    rm -f -- "$CURRENT"
    systemctl stop cineguru.service || true
  fi
  fail 'health check failed; previous release restored when available'
fi

if [[ -f "$NEW_RELEASE/deploy/maintenance/index.html" ]]; then
  grep -Fq 'Yenileniyoruz' "$NEW_RELEASE/deploy/maintenance/index.html" ||
    fail 'maintenance page marker is missing'
  install -d -o root -g root -m 0755 "$MAINTENANCE_ROOT"
  install -o root -g root -m 0644 \
    "$NEW_RELEASE/deploy/maintenance/index.html" \
    "$MAINTENANCE_ROOT/index.html.new"
  mv -f "$MAINTENANCE_ROOT/index.html.new" "$MAINTENANCE_ROOT/index.html"
  log "MAINTENANCE_PAGE_UPDATED release=$NEW_RELEASE"
fi

rm -f -- "$PACKAGE"
find "$INCOMING" -mindepth 1 -maxdepth 1 -type f -name 'cineguru-*.tgz' -mtime +2 -delete
mapfile -t OLD_RELEASES < <(find "$RELEASES" -mindepth 1 -maxdepth 1 -type d -printf '%T@ %p\n' | sort -nr | tail -n +9 | cut -d' ' -f2-)
for old_release in "${OLD_RELEASES[@]}"; do
  [[ "$(readlink -f -- "$old_release")" == "$RELEASES"/* ]] || continue
  [[ "$old_release" != "$PREVIOUS_TARGET" && "$old_release" != "$NEW_RELEASE" ]] || continue
  rm -rf -- "$old_release"
done

if [[ -x /usr/local/sbin/cineguru-integrity-watch.sh ]]; then
  /usr/local/sbin/cineguru-integrity-watch.sh --init
fi
log "DEPLOY_OK commit=$COMMIT release=$NEW_RELEASE public_mode=maintenance"

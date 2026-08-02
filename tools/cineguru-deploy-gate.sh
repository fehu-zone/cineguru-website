#!/usr/bin/env bash
set -Eeuo pipefail

INCOMING=/srv/cineguru/app/.incoming
ORIGINAL="${SSH_ORIGINAL_COMMAND:-}"
OPERATION=''
FILENAME=''
EXTRA=''

read -r OPERATION FILENAME EXTRA <<< "$ORIGINAL"
[[ -z "$EXTRA" ]] || {
  echo 'Rejected deployment command.' >&2
  exit 2
}
[[ "$FILENAME" =~ ^cineguru-[0-9a-f]{40}-[0-9]+\.tgz$ ]] || {
  echo 'Rejected deployment archive name.' >&2
  exit 2
}

TARGET="$INCOMING/$FILENAME"
case "$OPERATION" in
  upload)
    umask 007
    [[ ! -e "$TARGET" ]] || {
      echo 'Deployment archive already exists.' >&2
      exit 3
    }
    cat > "$TARGET"
    chmod 0640 "$TARGET"
    ;;
  deploy)
    [[ -f "$TARGET" && ! -L "$TARGET" ]] || {
      echo 'Deployment archive is missing.' >&2
      exit 4
    }
    exec sudo /usr/local/sbin/cineguru-deploy.sh "$TARGET"
    ;;
  *)
    echo 'This key only accepts Cineguru deployment operations.' >&2
    exit 2
    ;;
esac

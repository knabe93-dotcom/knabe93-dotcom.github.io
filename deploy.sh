#!/usr/bin/env bash
# FTPS-Deploy nach Hostinger (gleicher Weg wie beim Gabi-Projekt).
# Nutzung:  ./deploy.sh          -> baut dist/ und laedt hoch
#           DRY_RUN=1 ./deploy.sh -> zeigt nur, was hochgeladen wuerde
set -euo pipefail
cd "$(dirname "$0")"
source ./deploy.config   # FTP_HOST, FTP_IP, FTP_USER, FTP_PASS, REMOTE_DIR, LOCAL_DIR

if [ "${SKIP_BUILD:-}" != "1" ]; then
  echo "==> Build"
  npm run build
fi

echo "==> Upload ${LOCAL_DIR}/ -> Hostinger:${REMOTE_DIR:-/}"
cd "$LOCAL_DIR"
find . -type f | while read -r f; do
  rel="${f#./}"
  url="ftp://${FTP_HOST}/${REMOTE_DIR:+$REMOTE_DIR/}${rel}"
  if [ "${DRY_RUN:-}" = "1" ]; then echo "  $url"; continue; fi
  curl -sS --ssl-reqd --connect-to "${FTP_HOST}:21:${FTP_IP}:21" \
    --ftp-create-dirs -T "$f" -u "${FTP_USER}:${FTP_PASS}" "$url"
done
echo "==> Fertig."

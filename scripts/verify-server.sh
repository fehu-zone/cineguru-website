#!/usr/bin/env bash
set -euo pipefail

base_url="${1:-http://127.0.0.1:3000}"
base_url="${base_url%/}"
temp_file="$(mktemp)"
trap 'rm -f "$temp_file"' EXIT

check_path() {
  local path="$1"
  local expected="$2"
  local status
  status="$(curl --silent --location --output "$temp_file" --write-out '%{http_code}' --max-time 15 "${base_url}${path}")"
  if [[ "$status" != "$expected" ]]; then
    echo "FAILED ${path}: HTTP ${status}, expected ${expected}" >&2
    exit 1
  fi
  echo "OK ${path}: HTTP ${status}"
}

check_path "/tr" "200"
grep -Fq "Fikri, iz bırakan filme dönüştürüyoruz." "$temp_file"

check_path "/en" "200"
grep -Fq "We turn ideas into films that leave a mark." "$temp_file"

check_path "/assets/showreel-poster-1280.avif" "200"
check_path "/assets/reels/alfemo-masko-1080.avif" "200"
check_path "/assets/reels/hesap-basit-1080.avif" "200"
check_path "/robots.txt" "200"
check_path "/sitemap.xml" "200"

echo "Cineguru Studio server verification passed."

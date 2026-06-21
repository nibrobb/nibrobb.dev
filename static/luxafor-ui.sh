#!/usr/bin/env sh
# This script assumes that the system has `curl` and `gpg` installed

set -e  # Exit immediately if a command exits with a non-zero status.
set -u  # Treat unset variables as an error when substituting


keyring_url=https://github.com/nibrobb/luxafor-ui/releases/download/debian/luxafor-ui-archive-keyring.asc
keyring_path=/etc/apt/keyrings/luxafor-ui-archive-keyring.gpg
keyring_tmp=$(mktemp)

sudo install -m 0755 -d /etc/apt/keyrings # Create parent directories

if ! curl -fsSL "$keyring_url" | gpg --dearmor > "$keyring_tmp"; then
    rm "$keyring_tmp"
    echo "Failed to install Luxafor-UI archive keyring"
    exit 1
fi

sudo install -g root -o root -m 0644 "$keyring_tmp" "$keyring_path"

cat <<EOF > /etc/apt/sources.list.d/luxafor-ui.sources
Types: deb
URIs: https://github.com/nibrobb/luxafor-ui/releases/download/debian/
Suites: ./
Signed-By: $keyring_path
EOF

rm -v "$keyring_tmp"

sudo apt-get update && sudo apt-get install -y luxafor-ui

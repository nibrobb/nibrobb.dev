#!/usr/bin/env sh
# This script assumes it is being run as root,
#   and that the system has `curl` and `gpg` installed

set -e  # Exit immediately if a command exits with a non-zero status.
set -u  # Treat unset variables as an error when substituting

# Check for root
if [ $(id -u) -ne 0 ]; then
    echo "This script must be run as root"
    exit 1
fi

keyring_url=https://github.com/nibrobb/luxafor-ui/releases/download/debian/luxafor-ui-archive-keyring.asc
keyring_path=/etc/apt/keyrings/luxafor-ui-archive-keyring.gpg
keyring_tmp=$(mktemp /etc/apt/keyrings/luxafor-ui-archive-keyring.gpg.tmp.XXXXXX)

install -m 0755 -d /etc/apt/keyrings # Create directories if the don't exist

if ! curl -fsSL "$keyring_url" | gpg --dearmor > "$keyring_tmp"; then
    rm -f "$keyring_tmp"
    echo "Failed to install Luxafor-UI archive keyring"
    exit 1
fi

install -g root -o root -m 0644 "$keyring_tmp" "$keyring_path"

cat <<EOF > /etc/apt/sources.list.d/luxafor-ui.sources
Types: deb
URIs: https://github.com/nibrobb/luxafor-ui/releases/download/debian/
Suites: ./
Signed-By: $keyring_path
EOF

apt-get update && apt-get install -y luxafor-ui

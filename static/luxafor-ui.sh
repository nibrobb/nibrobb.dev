#!/usr/bin/env sh
# This script assumes it is being run as root,
#   and that the system has `curl` and `gnupg` installed

set -e  # Exit immediately if a command exits with a non-zero status.
set -u  # Treat unset variables as an error when substituting
set -o pipefail  # Fail the whole pipe if only part of a pipe fails

# Check for root
if [ $(id -u) -ne 0 ]; then
    echo "This script must be run as root"
    exit 1
fi

keyring_url=https://github.com/nibrobb/luxafor-ui/releases/download/debian/luxafor-ui-archive-keyring.asc
keyring_path=/etc/apt/keyrings/luxafor-ui-archive-keyring.pgp
keyring_tmp=$(mktemp /etc/apt/keyrings/luxafor-ui-archive-keyring.pgp.tmp.XXXXXX)

mkdir -p /etc/apt/keyrings # Might not exist on some systems

if ! curl -fsSL "$keyring_url" | gpg --dearmor > "$keyring_tmp"; then
    rm -f "$keyring_tmp"
    echo "Failed to install Luxafor-UI archive keyring"
    exit 1
fi

chmod 0644 "$keyring_tmp"
mv -f "$keyring_tmp" "$keyring_path"
cat <<EOF > /etc/apt/sources.list.d/luxafor-ui.sources
Types: deb
URIs: https://github.com/nibrobb/luxafor-ui/releases/download/debian/
Suites: ./
Signed-By: $keyring_path
EOF

apt-get update && apt-get install -y luxafor-ui

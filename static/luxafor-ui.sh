#!/usr/bin/env sh
# This script assumes is is being run as root,
#   and that the system has `curl` and `gnupg` installed

if [ $(id -u) -ne 0 ]; then
    echo "This script must be run as root"
    exit 1
fi

keyring_url=https://github.com/nibrobb/luxafor-ui/releases/download/debian/luxafor-ui-archive-keyring.asc
keyring_path=/etc/apt/keyrings/luxafor-ui-archive-keyring.pgp

mkdir -p /etc/apt/keyrings # Might not exist on some systems

if ! curl -fsSL "$keyring_url" | gpg --dearmor > "$keyring_path"; then
    echo "Failed to install Luxafor-UI archive keyring"
    exit 1
fi

cat <<EOF > /etc/apt/sources.list.d/luxafor-ui.sources
Types: deb
URIs: https://github.com/nibrobb/luxafor-ui/releases/download/debian/
Suites: ./
Signed-By: $keyring_path
EOF

apt-get update && apt-get install -y luxafor-ui

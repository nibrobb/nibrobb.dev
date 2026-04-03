#!/usr/bin/env sh

if [ $(id -u) -ne 0 ]; then
    echo "This script myst be run as root"
    exit 1
fi

keyring_url=https://github.com/nibrobb/luxafor-ui/releases/download/debian/luxafor-ui-archive-keyring.asc
keyring_path=/etc/apt/keyrings/luxafor-ui-archive-keyring.pgp

curl -fsSL $keyring_url | gpg --dearmor > $keyring_path

cat <<EOF > /etc/apt/sources.list.d/luxafor-ui.sources
Types: deb
URIs: https://github.com/nibrobb/luxafor-ui/releases/download/debian/
Suites: ./
Components: 
Signed-By: $keyring_path
EOF

apt update && apt install -y luxafor-ui

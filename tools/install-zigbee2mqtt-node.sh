#!/usr/bin/env bash
set -Eeuo pipefail

# Installs Node.js LTS from NodeSource, clones Zigbee2MQTT, and installs pnpm dependencies.
# Intended for Debian/Ubuntu systems such as Raspberry Pi OS.
# Older i386 systems may need an unofficial Node.js build instead of NodeSource.

ZIGBEE2MQTT_DIR="${ZIGBEE2MQTT_DIR:-/opt/zigbee2mqtt}"
ZIGBEE2MQTT_REPO="${ZIGBEE2MQTT_REPO:-https://github.com/Koenkk/zigbee2mqtt.git}"
FORCE_RECLONE="${FORCE_RECLONE:-0}"

log() {
  printf '\n==> %s\n' "$*"
}

die() {
  printf 'ERROR: %s\n' "$*" >&2
  exit 1
}

require_command() {
  command -v "$1" >/dev/null 2>&1 || die "Required command not found: $1"
}

ensure_safe_install_dir() {
  case "$1" in
    /opt/zigbee2mqtt|/opt/zigbee2mqtt/*) ;;
    *) die "Refusing to manage unexpected install directory: $1" ;;
  esac
}

if [ "${EUID}" -eq 0 ]; then
  die "Run this script as your normal user, not as root. It will use sudo when needed."
fi

require_command sudo
ensure_safe_install_dir "${ZIGBEE2MQTT_DIR}"

if ! command -v apt-get >/dev/null 2>&1; then
  die "This installer expects apt-get. For Ubuntu Snap or non-Debian systems, install Node.js manually first."
fi

log "Installing curl"
sudo apt-get update
sudo apt-get install -y curl

log "Adding NodeSource Node.js LTS repository"
sudo curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -

log "Installing Node.js and build dependencies"
sudo apt-get install -y nodejs git make g++ gcc libsystemd-dev

log "Enabling Corepack"
sudo corepack enable

log "Installed Node.js version"
node --version

NODE_MAJOR="$(node --version | sed -E 's/^v([0-9]+).*/\1/')"
if [ "${NODE_MAJOR}" -lt 20 ]; then
  die "Node.js v20 or newer is expected, but $(node --version) is installed."
fi

log "Preparing ${ZIGBEE2MQTT_DIR}"
if [ -e "${ZIGBEE2MQTT_DIR}" ] && [ "${FORCE_RECLONE}" = "1" ]; then
  sudo rm -rf "${ZIGBEE2MQTT_DIR}"
fi

if [ ! -e "${ZIGBEE2MQTT_DIR}" ]; then
  sudo mkdir -p "${ZIGBEE2MQTT_DIR}"
fi

sudo chown -R "${USER}:" "${ZIGBEE2MQTT_DIR}"

if [ -d "${ZIGBEE2MQTT_DIR}/.git" ]; then
  log "Zigbee2MQTT repository already exists; fetching latest default branch"
  git -C "${ZIGBEE2MQTT_DIR}" pull --ff-only
else
  if [ -n "$(find "${ZIGBEE2MQTT_DIR}" -mindepth 1 -maxdepth 1 -print -quit)" ]; then
    die "${ZIGBEE2MQTT_DIR} is not empty. Set FORCE_RECLONE=1 to replace it."
  fi

  log "Cloning Zigbee2MQTT"
  git clone --depth 1 "${ZIGBEE2MQTT_REPO}" "${ZIGBEE2MQTT_DIR}"
fi

log "Installing Zigbee2MQTT dependencies"
cd "${ZIGBEE2MQTT_DIR}"
pnpm install --frozen-lockfile

log "Done"
printf 'Zigbee2MQTT is installed in %s\n' "${ZIGBEE2MQTT_DIR}"

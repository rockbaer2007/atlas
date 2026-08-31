#!/bin/sh
set -eu

OPTIONS_PATH="/data/options.json"

if [ -f "$OPTIONS_PATH" ]; then
  ATLAS_INSTANCE_ID="$(node -e "const fs = require('node:fs'); const options = JSON.parse(fs.readFileSync(process.argv[1], 'utf8')); process.stdout.write(String(options.atlas_instance_id || 'atlas-home-assistant'));" "$OPTIONS_PATH")"
  export ATLAS_INSTANCE_ID
fi

export ATLAS_HOST="${ATLAS_HOST:-0.0.0.0}"
export ATLAS_APP_HOST="${ATLAS_APP_HOST:-0.0.0.0}"
export ATLAS_APP_PORT="${ATLAS_APP_PORT:-4176}"
export ATLAS_ADMIN_PORT="${ATLAS_ADMIN_PORT:-4175}"
export ATLAS_DEMO_PORT="${ATLAS_DEMO_PORT:-4174}"

exec node scripts/atlas-app-server.mjs

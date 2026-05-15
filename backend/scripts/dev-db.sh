#!/usr/bin/env bash
#
# Spin up (or tear down) a temporary Postgres container for local backend
# development & tests. The script writes a backend/.env pointing at the
# container so `npm start` and `npm test` work out of the box.
#
# Usage:
#   ./scripts/dev-db.sh up         # start container, write .env (default)
#   ./scripts/dev-db.sh down       # stop and remove the container
#   ./scripts/dev-db.sh reset      # tear down, then bring up fresh
#   ./scripts/dev-db.sh status     # show container status
#
# Env overrides (optional):
#   DEV_DB_NAME       container name             (default: opencarts-dev-pg)
#   DEV_DB_PORT       host port to bind          (default: 5432)
#   DEV_DB_USER       postgres user              (default: opencarts)
#   DEV_DB_PASSWORD   postgres password          (default: opencarts)
#   DEV_DB_DATABASE   database name              (default: opencarts_dev)
#   DEV_DB_IMAGE      docker image to use        (default: postgres:16-alpine)

set -euo pipefail

CONTAINER_NAME="${DEV_DB_NAME:-opencarts-dev-pg}"
HOST_PORT="${DEV_DB_PORT:-5432}"
PG_USER="${DEV_DB_USER:-opencarts}"
PG_PASSWORD="${DEV_DB_PASSWORD:-opencarts}"
PG_DATABASE="${DEV_DB_DATABASE:-opencarts_dev}"
PG_IMAGE="${DEV_DB_IMAGE:-postgres:16-alpine}"

# Resolve repo paths regardless of where the script is invoked from.
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BACKEND_DIR="$(cd "${SCRIPT_DIR}/.." && pwd)"
ENV_FILE="${BACKEND_DIR}/.env"

require_docker() {
  if ! command -v docker >/dev/null 2>&1; then
    echo "error: docker is not on PATH" >&2
    exit 1
  fi
  if ! docker info >/dev/null 2>&1; then
    echo "error: docker daemon is not running" >&2
    echo "  start Docker Desktop (macOS/Windows) or 'sudo systemctl start docker' (Linux)" >&2
    exit 1
  fi
}

container_exists() {
  docker ps -a --filter "name=^${CONTAINER_NAME}$" --format '{{.Names}}' | grep -q "^${CONTAINER_NAME}$"
}

container_running() {
  docker ps --filter "name=^${CONTAINER_NAME}$" --format '{{.Names}}' | grep -q "^${CONTAINER_NAME}$"
}

wait_for_pg() {
  echo "waiting for postgres to accept connections..."
  local deadline=$((SECONDS + 60))
  while (( SECONDS < deadline )); do
    if docker exec "${CONTAINER_NAME}" pg_isready -U "${PG_USER}" >/dev/null 2>&1; then
      echo "postgres is ready"
      return 0
    fi
    sleep 0.5
  done
  echo "error: postgres did not become ready within 60s" >&2
  docker logs --tail 40 "${CONTAINER_NAME}" >&2 || true
  exit 1
}

write_env_file() {
  # Don't clobber an existing .env that points somewhere else — back it up.
  if [[ -f "${ENV_FILE}" ]] && ! grep -q "DEV_DB_MANAGED=1" "${ENV_FILE}" 2>/dev/null; then
    local backup
    backup="${ENV_FILE}.bak.$(date +%Y%m%d%H%M%S)"
    echo "existing .env detected; backing up to ${backup}"
    cp "${ENV_FILE}" "${backup}"
  fi

  cat > "${ENV_FILE}" <<EOF
# Written by scripts/dev-db.sh — safe to delete or overwrite.
DEV_DB_MANAGED=1
NODE_ENV=development
PORT=6969
DB_DATABASE=${PG_DATABASE}
DB_TESTDB=${PG_DATABASE}
DB_USERNAME=${PG_USER}
DB_PASSWORD=${PG_PASSWORD}
DB_HOST=localhost
DB_CONNECTION_URI=postgres://${PG_USER}:${PG_PASSWORD}@localhost:${HOST_PORT}/${PG_DATABASE}
DB_TESTURI=postgres://${PG_USER}:${PG_PASSWORD}@localhost:${HOST_PORT}/${PG_DATABASE}
JWT_SECRET=dev-secret-not-for-prod
JWT_EXPIRES_IN=604800
PEXELS_API_KEY=unused
EOF
  echo "wrote ${ENV_FILE}"
}

cmd_up() {
  require_docker

  if container_running; then
    echo "container '${CONTAINER_NAME}' already running"
  elif container_exists; then
    echo "starting existing container '${CONTAINER_NAME}'"
    docker start "${CONTAINER_NAME}" >/dev/null
  else
    echo "creating container '${CONTAINER_NAME}' (image: ${PG_IMAGE}, port: ${HOST_PORT})"
    docker run -d \
      --name "${CONTAINER_NAME}" \
      -e POSTGRES_USER="${PG_USER}" \
      -e POSTGRES_PASSWORD="${PG_PASSWORD}" \
      -e POSTGRES_DB="${PG_DATABASE}" \
      -p "${HOST_PORT}:5432" \
      "${PG_IMAGE}" >/dev/null
  fi

  wait_for_pg
  write_env_file

  cat <<EOF

Next steps:
  cd backend
  npm run db:reset    # apply migrations + seed data
  npm test            # run backend tests
  npm start           # start the dev server

Tear down with: ./scripts/dev-db.sh down
EOF
}

cmd_down() {
  require_docker
  if container_exists; then
    echo "removing container '${CONTAINER_NAME}'"
    docker rm -f "${CONTAINER_NAME}" >/dev/null
  else
    echo "no container '${CONTAINER_NAME}' to remove"
  fi
  if [[ -f "${ENV_FILE}" ]] && grep -q "DEV_DB_MANAGED=1" "${ENV_FILE}"; then
    rm "${ENV_FILE}"
    echo "removed ${ENV_FILE}"
  fi
}

cmd_reset() {
  cmd_down
  cmd_up
}

cmd_status() {
  require_docker
  if container_running; then
    echo "running"
    docker ps --filter "name=^${CONTAINER_NAME}$" --format 'table {{.Names}}\t{{.Status}}\t{{.Ports}}'
  elif container_exists; then
    echo "stopped"
    docker ps -a --filter "name=^${CONTAINER_NAME}$" --format 'table {{.Names}}\t{{.Status}}'
  else
    echo "not created"
  fi
}

case "${1:-up}" in
  up)     cmd_up ;;
  down)   cmd_down ;;
  reset)  cmd_reset ;;
  status) cmd_status ;;
  *)
    echo "usage: $0 {up|down|reset|status}" >&2
    exit 2
    ;;
esac

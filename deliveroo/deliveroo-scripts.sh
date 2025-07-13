deliveroo-docker-restart() {
  if [ -z "$1" ]; then
    echo "Restarting given service (with clearing volumes and building the image)"
    echo "Usage: deliveroo-docker-restart <service_name>"
    echo "Example:"
    echo "- deliveroo-docker-restart wms-api"
    echo "- deliveroo-docker-restart wms-postgres"
    echo "- deliveroo-docker-restart wms-frontend"
    echo "- deliveroo-docker-restart nginx"
    return 1
  fi
  docker compose down "$1" -v && docker compose up "$1" --build -d
}

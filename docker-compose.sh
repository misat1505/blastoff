#!/bin/bash

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
NC='\033[0m'

usage() {
    echo -e "${YELLOW}Usage:${NC} $0 [--prod | --test]"
    echo -e "   --prod    Use docker-compose.yml"
    echo -e "   --test    Use docker-compose.test.yml"
    echo -e "   (No flag) Use default docker-compose.yml"
}

if [[ "$1" == "--prod" ]]; then
    COMPOSE_FILE="docker-compose.yml"
    echo -e "${GREEN}Running with production configuration: ${COMPOSE_FILE}${NC}"
elif [[ "$1" == "--test" ]]; then
    COMPOSE_FILE="docker-compose.test.yml"
    echo -e "${GREEN}Running with test configuration: ${COMPOSE_FILE}${NC}"
elif [[ -z "$1" ]]; then
    COMPOSE_FILE="docker-compose.yml"
    echo -e "${GREEN}Running with default configuration: ${COMPOSE_FILE}${NC}"
else
    echo -e "${RED}Error: Invalid flag provided.${NC}"
    usage
    exit 1
fi

docker-compose -f "$COMPOSE_FILE" up --build

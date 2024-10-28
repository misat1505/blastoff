#!/bin/bash

# Variables
DB_NAME="blastoff_db"
DB_USER="admin1"
DB_PASSWORD="haslo1"
MYSQL_ROOT_PASSWORD="root"
MYSQL_CONTAINER_NAME="mysql_container"

echo "Starting MySQL Docker container..."
sudo docker run --name $MYSQL_CONTAINER_NAME -e MYSQL_ROOT_PASSWORD=$MYSQL_ROOT_PASSWORD -p 3306:3306 -d mysql:latest

echo "Waiting for MySQL to be ready..."
sleep 30

echo "Creating database '$DB_NAME'..."
sudo docker exec -i $MYSQL_CONTAINER_NAME mysql -u root -p$MYSQL_ROOT_PASSWORD -e "CREATE DATABASE IF NOT EXISTS $DB_NAME;"

if [ -n "$DB_USER" ] && [ -n "$DB_PASSWORD" ]; then
    echo "Creating user '$DB_USER' with password '$DB_PASSWORD' and granting privileges on '$DB_NAME'..."
    sudo docker exec -i $MYSQL_CONTAINER_NAME mysql -u root -p$MYSQL_ROOT_PASSWORD -e "CREATE USER IF NOT EXISTS '$DB_USER'@'%' IDENTIFIED BY '$DB_PASSWORD';"
    sudo docker exec -i $MYSQL_CONTAINER_NAME mysql -u root -p$MYSQL_ROOT_PASSWORD -e "GRANT ALL PRIVILEGES ON $DB_NAME.* TO '$DB_USER'@'%';"
    sudo docker exec -i $MYSQL_CONTAINER_NAME mysql -u root -p$MYSQL_ROOT_PASSWORD -e "FLUSH PRIVILEGES;"
fi

echo "Database setup complete. You can connect to '$DB_NAME' using user '$DB_USER'."

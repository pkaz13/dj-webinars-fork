#!/bin/sh

cmd="$@"

echo "Waiting for database..."
sleep 5
echo "Running migrations..."
npx prisma migrate deploy
sleep 5
echo "Seeding database..."
npx prisma db seed
sleep 5

exec $cmd

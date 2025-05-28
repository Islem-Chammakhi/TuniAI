#!/bin/bash

echo "Starting TuniTales frontend-only application..."
echo "This application uses local data instead of a backend server"

# Go to client directory and run vite directly
cd client && npx vite

# Exit gracefully when process is interrupted
exit 0
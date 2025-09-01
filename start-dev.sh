#!/bin/bash
echo "Starting Gyani Development Server..."
echo ""
echo "Checking for processes on port 3000..."
lsof -ti:3000 | xargs kill -9 2>/dev/null || echo "No processes found on port 3000"
echo ""
echo "Frontend: http://localhost:5173 (or next available port)"
echo "Backend:  http://localhost:3000"
echo ""
npm run dev

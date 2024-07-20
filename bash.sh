#!/bin/bash
if [ "$1" = "run" ]; then
  # Run the backend and frontend processes
  nohup bash -c 'cd backend && python3 run.py >> BackendLog.txt 2>&1 &' && \
  nohup bash -c 'cd frontend && serve -s build -l 3001 >> FrontendLog.txt 2>&1 &' && \
  echo "Backend and Frontend processes started."
elif [ "$1" = "kill" ]; then
  # Kill the backend and frontend processes
  pkill -f 'python3 main.py' && \
  pkill -f 'serve -s build -l 3001' && \
  echo "Backend and Frontend processes killed."
elif [ "$1" = "clean" ]; then
  rm -r ./backend/static/processed/* 2>/dev/null && \
  rm -f backend/BackendLog.txt frontend/FrontendLog.txt
elif [ "$1" = "zip" ]; then
  # Delete existing archive if it exists, then zip all folders in the directory, except frontend/build and frontend/node_modules
  rm -f source.zip
  zip -r source.zip . -x "frontend/build/*" "frontend/node_modules/*"
  echo "Created source.zip excluding frontend/build and frontend/node_modules."
else
  echo "Usage: sh bash.sh [run|kill|clean|zip]"
fi

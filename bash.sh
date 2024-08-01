#!/bin/bash
if [ "$1" = "run" ]; then
  # Run the backend and frontend processes
  nohup bash -c 'cd backend && python3 run.py >> BackendLog.txt 2>&1 &' && \
  nohup bash -c 'cd frontend && serve -s build -l 3001 >> FrontendLog.txt 2>&1 &' && \
  nohup bash -c 'cd backend/terminal && ./terminal -address 0.0.0.0 -port 8765 >> terminal.txt 2>&1 &' && \
  echo "Backend and Frontend processes started."
elif [ "$1" = "kill" ]; then
  # Kill the backend and frontend processes
  if pkill -f 'python3 run.py'; then
    echo "Killed: python3 run.py"
  else
    echo "No process found: python3 run.py"
  fi

  if pkill -f 'serve -s build -l 3001'; then
    echo "Killed: serve -s build -l 3001"
  else
    echo "No process found: serve -s build -l 3001"
  fi

  if pkill -f 'bun run dev'; then
    echo "Killed: bun run dev"
  else
    echo "No process found: bun run dev"
  fi

  if pkill -f './terminal -address 0.0.0.0 -port 8765'; then
    echo "Killed: ./terminal -address 0.0.0.0 -port 8765"
  else
    echo "No process found: ./terminal -address 0.0.0.0 -port 8765"
  fi

  if pkill -f './terminal -port 8765'; then
    echo "Killed: ./terminal -port 8765"
  else
    echo "No process found: ./terminal -port 8765"
  fi

  if pkill -f 'node .*react-scripts/scripts/start.js'; then
    echo "Killed: node running react-scripts/scripts/start.js"
  else
    echo "No process found: node running react-scripts/scripts/start.js"
  fi
elif [ "$1" = "clean" ]; then
  rm -r ./backend/static/processed/* 2>/dev/null && \
  rm -f backend/BackendLog.txt frontend/FrontendLog.txt
elif [ "$1" = "zip" ]; then
  # Delete existing archive if it exists, then zip all folders in the directory, except frontend/build and frontend/node_modules
  rm -f source.zip
  zip -r source.zip . -x "frontend/build/*" "frontend/node_modules/*"
  echo "Created source.zip excluding frontend/build and frontend/node_modules."
elif [ "$1" = "dev" ]; then
  (cd backend && python3 run.py) & 
  (cd frontend && bun run dev) & 
  (cd backend/terminal && ./terminal -port 8765) &
  
  wait
  echo "[\033[34mDev mode\033[0m]: go, python, and bun have all started!"else
  echo "Usage: sh bash.sh [run|kill|clean|zip|dev]"
fi

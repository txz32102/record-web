#!/bin/bash

case "$1" in
  run)
    # Run the backend and frontend processes
    nohup bash -c 'cd backend && python3 run.py >> BackendLog.txt 2>&1 &' &&
    nohup bash -c 'cd frontend && serve -s build -l 3001 >> FrontendLog.txt 2>&1 &' &&
    nohup bash -c 'cd backend/terminal && ./terminal -address 0.0.0.0 -port 8765 >> terminal.txt 2>&1 &' &&
    echo "Backend and Frontend processes started."
    ;;

  kill)
    # Kill the backend and frontend processes
    pkill -f 'python3 run.py' && echo "Killed: python3 run.py" || echo "No process found: python3 run.py"
    pkill -f 'serve -s build -l 3001' && echo "Killed: serve -s build -l 3001" || echo "No process found: serve -s build -l 3001"
    pkill -f 'bun run dev' && echo "Killed: bun run dev" || echo "No process found: bun run dev"
    pkill -f './terminal -address 0.0.0.0 -port 8765' && echo "Killed: ./terminal -address 0.0.0.0 -port 8765" || echo "No process found: ./terminal -address 0.0.0.0 -port 8765"
    pkill -f './terminal -port 8765' && echo "Killed: ./terminal -port 8765" || echo "No process found: ./terminal -port 8765"
    pkill -f 'node .*react-scripts/scripts/start.js' && echo "Killed: node running react-scripts/scripts/start.js" || echo "No process found: node running react-scripts/scripts/start.js"
    ;;

  clean)
    rm -r ./backend/static/processed/* 2>/dev/null &&
    rm -f backend/BackendLog.txt frontend/FrontendLog.txt
    ;;

  zip)
    # Delete existing archive if it exists, then zip all folders in the directory, except frontend/build and frontend/node_modules
    rm -f source.zip
    zip -r source.zip . -x "frontend/build/*" "frontend/node_modules/*"
    echo "Created source.zip excluding frontend/build and frontend/node_modules."
    ;;

  dev)
    (cd backend && python3 run.py) & 
    (cd frontend && bun run dev) & 
    (cd backend/terminal && ./terminal -port 8765) &
    wait
    echo "[\033[34mDev mode\033[0m]: go, python, and bun have all started!"
    ;;

  syn)
    ssh root@47.100.233.136 << 'ENDSSH'
      cd /root/home/record-web
      sh bash.sh kill
      nohup s clash > /dev/null 2>&1 &
      sleep 2  # Allow some time for the process to start
      git pull
      pid=$(lsof -t -i:9090)
      if [ -n "$pid" ]; then
        kill $pid
      fi
      sh bash.sh run
    ENDSSH
    ;;

  *)
    echo "Usage: sh bash.sh [run|kill|clean|zip|dev|syn]"
    ;;
esac

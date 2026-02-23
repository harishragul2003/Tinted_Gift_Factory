#!/bin/bash

# Surprise Basket - Development Server Starter
# Starts both frontend and backend servers concurrently

echo "🎁 Starting Surprise Basket Development Servers..."
echo ""

# Check if tmux is available
if command -v tmux &> /dev/null; then
    echo "Using tmux for split terminal..."
    
    # Create new tmux session
    tmux new-session -d -s surprise-basket
    
    # Split window horizontally
    tmux split-window -h
    
    # Run backend in left pane
    tmux select-pane -t 0
    tmux send-keys "cd backend && npm run dev" C-m
    
    # Run frontend in right pane
    tmux select-pane -t 1
    tmux send-keys "cd frontend && npm run dev" C-m
    
    # Attach to session
    tmux attach-session -t surprise-basket
    
else
    echo "⚠️  tmux not found. Starting servers in background..."
    echo "To install tmux: brew install tmux (Mac) or apt-get install tmux (Linux)"
    echo ""
    
    # Start backend
    echo "Starting backend server..."
    cd backend
    npm run dev &
    BACKEND_PID=$!
    
    # Wait a bit for backend to start
    sleep 3
    
    # Start frontend
    echo "Starting frontend server..."
    cd ../frontend
    npm run dev &
    FRONTEND_PID=$!
    
    echo ""
    echo "✅ Servers started!"
    echo "Backend PID: $BACKEND_PID"
    echo "Frontend PID: $FRONTEND_PID"
    echo ""
    echo "To stop servers:"
    echo "kill $BACKEND_PID $FRONTEND_PID"
    echo ""
    echo "Press Ctrl+C to stop all servers"
    
    # Wait for user interrupt
    trap "kill $BACKEND_PID $FRONTEND_PID; exit" INT
    wait
fi

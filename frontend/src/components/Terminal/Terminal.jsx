import React, { useEffect, useRef } from 'react';
import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import 'xterm/css/xterm.css';

const TerminalComponent = () => {
  const terminalRef = useRef(null);
  const term = useRef(null);
  const fitAddon = useRef(null);

  useEffect(() => {
    term.current = new Terminal();
    fitAddon.current = new FitAddon();
    term.current.loadAddon(fitAddon.current);
    term.current.open(terminalRef.current);
    fitAddon.current.fit();

    const socketUrl =
      process.env.NODE_ENV === 'development'
        ? 'ws://localhost:8765/ws'
        : 'ws://www.druggableprotein.com:8765/ws';

    const socket = new WebSocket(socketUrl);

    socket.onopen = () => {
      console.log('Connected to server');
      term.current.write('Connected to server\r\n');
    };

    socket.onmessage = (event) => {
      term.current.write(event.data);
    };

    socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    socket.onclose = () => {
      console.log('WebSocket connection closed');
    };

    term.current.onData((data) => {
      socket.send(data);
    });

    window.addEventListener('resize', () => {
      fitAddon.current.fit();
    });

    return () => {
      socket.close();
      term.current.dispose();
    };
  }, []);

  return (
    <div
      ref={terminalRef}
      style={{ height: '100%', width: '100%', backgroundColor: 'black' }}
    />
  );
};

export default TerminalComponent;

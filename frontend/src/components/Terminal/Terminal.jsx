import React, { useEffect, useRef } from 'react';
import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import 'xterm/css/xterm.css';

const TerminalComponent = () => {
  const terminalRef = useRef(null);
  const term = useRef(null);
  const fitAddon = useRef(null);

  useEffect(() => {
    term.current = new Terminal({
      theme: {
        background: '#F9F6FD',
        foreground: '#000000',
        cursor: '#000000',
        selectionBackground: '#734040', // Set the selection color here
      },
    });
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

    // Add event listener for copy functionality using Clipboard API
    const handleCopy = async (event) => {
      if (event.ctrlKey && event.key === 'Insert') {
        try {
          const selection = window.getSelection().toString();
          await navigator.clipboard.writeText(selection);
          console.log('Text copied to clipboard');
        } catch (err) {
          console.error('Failed to copy text: ', err);
        }
      }
    };

    // Add event listener for paste functionality using Clipboard API
    const handlePaste = async (event) => {
      if (event.shiftKey && event.key === 'Insert') {
        try {
          const text = await navigator.clipboard.readText();
          term.current.write(text);
        } catch (err) {
          console.error('Failed to read clipboard contents: ', err);
        }
      }
    };

    window.addEventListener('keydown', handleCopy);
    window.addEventListener('keydown', handlePaste);

    return () => {
      socket.close();
      term.current.dispose();
      window.removeEventListener('resize', fitAddon.current.fit);
      window.removeEventListener('keydown', handleCopy);
      window.removeEventListener('keydown', handlePaste);
    };
  }, []);

  return (
    <div
      ref={terminalRef}
      style={{ height: '100%', width: '100%' }}
    />
  );
};

export default TerminalComponent;

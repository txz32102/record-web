package main

import (
    "flag"
    "fmt"
    "io"
    "log"
    "net/http"
    "os/exec"

    "github.com/creack/pty"
    "github.com/gorilla/websocket"
)

// Upgrader config for the websocket
var upgrader = websocket.Upgrader{
    CheckOrigin: func(r *http.Request) bool {
        // Allow all origins
        return true
    },
}

// Handler for websocket connection
func wsHandler(w http.ResponseWriter, r *http.Request) {
    conn, err := upgrader.Upgrade(w, r, nil)
    if err != nil {
        log.Println("Upgrade error:", err)
        return
    }
    defer conn.Close()

    log.Println("Client connected")

    // Start the bash shell in a new pty
    cmd := exec.Command("bash")
    pty, err := pty.Start(cmd)
    if err != nil {
        log.Println("Start pty error:", err)
        return
    }
    defer func() {
        cmd.Process.Kill()
        pty.Close()
    }()

    go func() {
        for {
            _, p, err := conn.ReadMessage()
            if err != nil {
                log.Println("Read message error:", err)
                return
            }
            if _, err := pty.Write(p); err != nil {
                log.Println("Write to pty error:", err)
                return
            }
        }
    }()

    buf := make([]byte, 1024)
    for {
        n, err := pty.Read(buf)
        if err != nil {
            if err == io.EOF {
                break
            }
            log.Println("Read from pty error:", err)
            return
        }
        if err := conn.WriteMessage(websocket.TextMessage, buf[:n]); err != nil {
            log.Println("Write message error:", err)
            return
        }
    }
}

var address = flag.String("address", "localhost", "The address to listen on")
var port = flag.String("port", "8765", "The port to listen on")

func main() {
    flag.Parse()
    addr := fmt.Sprintf("%s:%s", *address, *port)

    http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
        fmt.Fprintf(w, "WebSocket server")
    })
    http.HandleFunc("/ws", wsHandler)

    log.Printf("Server starting on %s\n", addr)
    if err := http.ListenAndServe(addr, nil); err != nil {
        log.Fatal("ListenAndServe error:", err)
    }
}

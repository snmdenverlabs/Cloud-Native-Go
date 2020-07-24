package main

import (
	"fmt"
	"net/http"
	"os"

	"./api"
)

func main() {
	http.HandleFunc("/", index)
	http.HandleFunc("/api/sessions", api.SessionsHandleFunc)
	http.HandleFunc("/api/sessions/", api.SessionHandleFunc)

	http.ListenAndServe(port(), nil)
}

func port() string {
	port := os.Getenv("PORT")
	if len(port) == 0 {
		port = "8080"
	}
	return ":" + port
}

func index(w http.ResponseWriter, r *http.Request) {
	w.WriteHeader(http.StatusOK)
	fmt.Fprintf(w, "Welcome to Cloud Native Go (Update).")
}

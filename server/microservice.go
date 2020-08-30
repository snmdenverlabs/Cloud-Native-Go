package main

import (
	"Cloud-Native-Go/web"
	//"fmt"
	"log"
	//"net/http"
	"os"
)

func main() {
	/*
		Moved to app.go

		http.HandleFunc("/", index)
		http.HandleFunc("/api/sessions", api.SessionsHandleFunc)
		http.HandleFunc("/api/sessions/", api.SessionHandleFunc)
		http.HandleFunc("/api/echo", api.EchoHandleFunc)
		http.ListenAndServe(port(), nil)
	*/

	// CORS is enabled only in prod profile
	cors := os.Getenv("profile") == "prod"
	app := web.SessionApp(cors)
	err := app.Serve()
	log.Println("Error", err)
}

func port() string {
	port := os.Getenv("PORT")
	if len(port) == 0 {
		port = "8080"
	}
	return ":" + port
}

/* 
Moved to app.go

func index(w http.ResponseWriter, r *http.Request) {
	w.WriteHeader(http.StatusOK)
	fmt.Fprintf(w, "Welcome to Cloud Native Go")
}
*/

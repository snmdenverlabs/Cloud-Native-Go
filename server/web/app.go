package web

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"

	"Cloud-Native-Go/api"
)

// App with refernce to DB and map of handlers
type App struct {
	handlers map[string]http.HandlerFunc
}

// SessionApp : Registers all handlers
func SessionApp(cors bool) App {
	app := App{
		handlers: make(map[string]http.HandlerFunc),
	}

	sessionsHandler := api.SessionsHandleFunc;
	if !cors {
		sessionsHandler = disableCors(sessionsHandler)
	}

	sessionHandler := api.SessionHandleFunc;
	if !cors {
		sessionHandler = disableCors(sessionHandler)
	}

	echoHandler := api.EchoHandleFunc;
	if !cors {
		echoHandler = disableCors(echoHandler)
	}

	app.handlers["/"] = index;
	app.handlers["/api/sessions"] = sessionsHandler;
	app.handlers["/api/sessions/"] = sessionHandler;
	app.handlers["/api/echo"] = echoHandler;

	return app
}

// Serve : Listening on port 7070 or user provided PORT via docker-compose.env
func (a *App) Serve() error {
	for path, handler := range a.handlers {
		http.Handle(path, handler)
	}

	listenPort := port()

	log.Println("Web server is available on port " + listenPort)
	return http.ListenAndServe(listenPort, nil)
}

func sendErr(w http.ResponseWriter, code int, message string) {
	resp, _ := json.Marshal(map[string]string{"error": message})
	http.Error(w, string(resp), code)
}

// Needed in order to disable CORS for local development
func disableCors(h http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Context-Type", "application/x-www-form-urlencoded")
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "*")
		w.Header().Set("Access-Control-Allow-Headers", "*")
		h(w, r)
	}
}

func index(w http.ResponseWriter, r *http.Request) {
	w.WriteHeader(http.StatusOK)
	fmt.Fprintf(w, "Welcome to Cloud Native Go")
}

func port() string {
	port := os.Getenv("PORT")
	if len(port) == 0 {
		port = "7070"
	}
	return ":" + port
}
package api

import (
	"encoding/json"
	"log"
	"math/rand"
	"net/http"
	"strconv"
)

// Initialize Pre Requisite Data
type Initialize struct {
	SessionID string `json:"_id"`
	Date      string `json:"gchurcha_date"`
	Location  string `json:"gcharcha_loc"`
}

// InitializeHandleFunc to be used as http.HandleFunc for Session API
func InitializeHandleFunc(w http.ResponseWriter, r *http.Request) {

	date := r.URL.Query().Get("date")
	loc := r.URL.Query().Get("loc")

	if len(date) < 10 || len(loc) < 3 {
		log.Println("Valid Initialization parameters 'date' & 'loc' are mandatory")
		return
	}

	switch method := r.Method; method {
	case http.MethodGet:
		init := GetSessionInfo(date, loc)
		if len(init.SessionID) > 16 {
			writeJSON2(init, w)
		} else {
			w.WriteHeader(http.StatusNotFound)
		}
	case http.MethodOptions:
		w.WriteHeader(http.StatusOK)
	default:
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte("Unsupported request method."))
	}
}

func writeJSON2(i interface{}, w http.ResponseWriter) {
	b, err := json.Marshal(i)
	if err != nil {
		panic(err)
	}
	w.Header().Add("Content-Type", "application/json; charset=utf-8")
	w.Write(b)
}

// GetSessionInfo derives the Guru Charcha session related info
func GetSessionInfo(date string, loc string) Initialize {
	id := date + "-" + loc + "-" + strconv.Itoa(rand.Intn(100))
	init := Initialize{SessionID: id, Date: date, Location: loc}
	return init
}

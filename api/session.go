package api

import (
	"encoding/json"
	"io/ioutil"
	"net/http"
)

// Session type with ID, Date, Guest & GuestWish
type Session struct {
	ID        string `json:"_id"`
	Date      string `json:"gchurcha_date"`
	Guest     string `json:"guest_speaker"`
	Comments  string `json:"liked_most,omitempty"`
	GuestWish string `json:"wish_list_gspeaker,omitempty"`
}

var sessions = map[string]Session{
	"07162020-01": Session{ID: "07162020-01", Date: "07/16/2020", Guest: "Rev. Jane Doe", Comments: "Sparked Connection!", GuestWish: "Rev. John Doe"},
	"07092020-09": Session{ID: "07092020-09", Date: "07/09/2020", Guest: "Rev. John Doe", Comments: "Pure Bliss!"},
}

// ToJSON to be used for marshalling of Session type
func (s Session) ToJSON() []byte {
	ToJSON, err := json.Marshal(s)
	if err != nil {
		panic(err)
	}
	return ToJSON
}

// FromJSON to be used for unmarshalling of Session type
func FromJSON(data []byte) Session {
	session := Session{}
	err := json.Unmarshal(data, &session)
	if err != nil {
		panic(err)
	}
	return session
}

// AllSessions returns a slice of all sessions
func AllSessions() []Session {
	values := make([]Session, len(sessions))
	idx := 0
	for _, session := range sessions {
		values[idx] = session
		idx++
	}
	return values
}

// SessionsHandleFunc to be used as http.HandleFunc for Session API
func SessionsHandleFunc(w http.ResponseWriter, r *http.Request) {
	switch method := r.Method; method {
	case http.MethodGet:
		sessions := AllSessions()
		writeJSON(w, sessions)
	case http.MethodPost:
		body, err := ioutil.ReadAll(r.Body)
		if err != nil {
			w.WriteHeader(http.StatusInternalServerError)
		}
		session := FromJSON(body)
		id, created := CreateSession(session)
		if created {
			w.Header().Add("Location", "/api/sessions/"+id)
			w.WriteHeader(http.StatusCreated)
		} else {
			w.WriteHeader(http.StatusConflict)
		}
	default:
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte("Unsupported request method."))
	}
}

// SessionHandleFunc to be used as http.HandleFunc for Session API
func SessionHandleFunc(w http.ResponseWriter, r *http.Request) {
	id := r.URL.Path[len("/api/sessions/"):]

	switch method := r.Method; method {
	case http.MethodGet:
		session, found := GetSession(id)
		if found {
			writeJSON(w, session)
		} else {
			w.WriteHeader(http.StatusNotFound)
		}
	case http.MethodPut:
		body, err := ioutil.ReadAll(r.Body)
		if err != nil {
			w.WriteHeader(http.StatusInternalServerError)
		}
		session := FromJSON(body)
		exists := UpdateSession(id, session)
		if exists {
			w.WriteHeader(http.StatusOK)
		} else {
			w.WriteHeader(http.StatusNotFound)
		}
	case http.MethodDelete:
		DeleteSession(id)
		w.WriteHeader(http.StatusOK)
	default:
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte("Unsupported request method."))
	}
}

func writeJSON(w http.ResponseWriter, i interface{}) {
	b, err := json.Marshal(i)
	if err != nil {
		panic(err)
	}
	w.Header().Add("Content-Type", "application/json; charset=utf-8")
	w.Write(b)
}

// GetSession returns the session for a given ID
func GetSession(id string) (Session, bool) {
	session, found := sessions[id]
	return session, found
}

// CreateSession creates a new Session if it does not exist
func CreateSession(session Session) (string, bool) {
	_, exists := sessions[session.ID]
	if exists {
		return "", false
	}
	sessions[session.ID] = session
	return session.ID, true
}

// UpdateSession updates an existing session
func UpdateSession(id string, session Session) bool {
	_, exists := sessions[id]
	if exists {
		sessions[id] = session
	}
	return exists
}

// DeleteSession removes a session from the map by ID key
func DeleteSession(id string) {
	delete(sessions, id)
}

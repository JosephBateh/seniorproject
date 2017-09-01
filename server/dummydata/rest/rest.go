package rest

// Example:
// http://localhost:3000/numberconverter?number=500000&oldBase=10&newBase=16

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
)

// Start starts the server
func Start() {
	http.HandleFunc("/dummydata", dummydata)
	log.Fatal(http.ListenAndServe(":4000", nil))
}

type song struct {
	Title  string
	Artist string
	Album  string
}

func dummydata(writer http.ResponseWriter, response *http.Request) {
	writer.Header().Set("Access-Control-Allow-Origin", "*")
	writer.Header().Set("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS")
	writer.Header().Set("Content-Type", "application/json")

	// Check if the method is a get
	if response.Method != http.MethodGet {
		http.Error(writer, http.StatusText(405), 405)
		fmt.Println(writer)
		return
	}

	title := "Call of Duty 4 - Modern Warfare: Main Theme"
	artist := "Harry Grigson-Williams"
	album := "The Greatest Video Game Music"

	finalResponse := song{title, artist, album}
	b, err := json.Marshal(finalResponse)
	if err != nil {
		http.Error(writer, http.StatusText(500), 500)
	}
	writer.Write(b)
}

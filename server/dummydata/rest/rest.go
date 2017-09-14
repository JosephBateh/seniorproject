package rest

// Example:
// http://localhost:4000/dummydata

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"strconv"
)

// Start starts the server
func Start() {
	http.HandleFunc("/dummydata", dummydata)
	http.HandleFunc("/playlists", playlists)
	log.Fatal(http.ListenAndServe(":4000", nil))
}

type song struct {
	Title  string
	Artist string
	Album  string
}

func playlists(writer http.ResponseWriter, response *http.Request) {
	writer.Header().Set("Access-Control-Allow-Origin", "*")
	writer.Header().Set("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS")
	writer.Header().Set("Content-Type", "application/json")

	type playlist struct {
		Title   string
		Creator string
	}

	// Check if the method is a get
	if response.Method != http.MethodGet {
		http.Error(writer, http.StatusText(405), 405)
		fmt.Println(writer)
		return
	}

	// Declare array of songs
	finalResponse := [100]playlist{}

	// First playlist is different than the other 99
	for i := 0; i < 100; i++ {
		name := "Playlist" + strconv.Itoa(i)
		creator := "Creator" + strconv.Itoa(i)
		finalResponse[i] = playlist{name, creator}
	}

	b, err := json.Marshal(finalResponse)
	if err != nil {
		http.Error(writer, http.StatusText(500), 500)
	}
	writer.Write(b)
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

	title := "Glish"
	artist := "deadmau5"
	album := "W:/2016ALBUM/"

	// Declare array of songs
	finalResponse := [100]song{}

	// First song is different than the other 99
	finalResponse[0] = song{"Support", "deadmau5", "stuff i used to do"}
	for i := 1; i < 100; i++ {
		finalResponse[i] = song{title, artist, album}
	}

	b, err := json.Marshal(finalResponse)
	if err != nil {
		http.Error(writer, http.StatusText(500), 500)
	}
	writer.Write(b)
}

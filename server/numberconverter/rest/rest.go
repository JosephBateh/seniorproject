package rest

// Example:
// http://localhost:3000/numberconverter?number=500000&oldBase=10&newBase=16

import (
	"fmt"
	"log"
	"net/http"

	"../converter"
)

// Start starts the server
func Start() {
	//muxRouter := http.NewServeMux()
	//muxRouter.HandleFunc("/numberconverter", numberconverter)
	//http.Handle("/", muxRouter)
	http.HandleFunc("/numberconverter", numberconverter)
	log.Fatal(http.ListenAndServe(":4000", nil))
}

func numberconverter(writer http.ResponseWriter, response *http.Request) {
	writer.Header().Set("Access-Control-Allow-Origin", "true")

	// Check if the method is a get
	if response.Method != http.MethodGet {
		http.Error(writer, http.StatusText(405), 405)
		fmt.Println(writer)
		return
	}

	number := response.FormValue("number")
	oldBase := response.FormValue("oldBase")
	newBase := response.FormValue("newBase")
	result := converter.ConvertStringNumberToNewBase(number, oldBase, newBase)
	fmt.Fprintf(writer, "%s base %s is %s in base %s", number, oldBase, result, newBase)
}

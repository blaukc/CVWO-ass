package main

import (
	"fmt"
	"net/http"

	"github.com/blaukc/CVWO-ass/backend/routes"
)

func main() {
	mux := http.NewServeMux()
	routes.CreateRoutes(mux)
	fmt.Println("starting server")
	http.ListenAndServe(":54321", mux)
}

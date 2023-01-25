package main

import (
	"fmt"
	"net/http"

	"github.com/blaukc/CVWO-ass/backend/routes"
)

func main() {
	// env_err := godotenv.Load(".env")

	// if env_err != nil {
	// 	panic(env_err)
	// }
	mux := http.NewServeMux()
	routes.CreateRoutes(mux)
	fmt.Println("starting server")
	http.ListenAndServe("0.0.0.0:54321", mux)
}

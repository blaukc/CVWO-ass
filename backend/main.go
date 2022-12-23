package main

import (
	"fmt"
	"net/http"

	"github.com/blaukc/CVWO-ass/backend/routes"
)

func main() {
	mux := http.NewServeMux()
	mux.HandleFunc("/forumuser/", routes.ForumUserHandler)
	mux.HandleFunc("/category/", routes.CategoryHandler)
	mux.HandleFunc("/post/", routes.PostHandler)
	mux.HandleFunc("/comment/post/", routes.PostCommentHandler)
	mux.HandleFunc("/comment/", routes.CommentHandler)
	fmt.Println("starting server")
	http.ListenAndServe(":54321", mux)
}

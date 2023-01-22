package routes

import (
	"net/http"
)

func CreateRoutes(mux *http.ServeMux) {
	mux.HandleFunc("/forumuser/", ForumUserHandler)
	mux.HandleFunc("/login/", LoginHandler)
	mux.HandleFunc("/register/", RegisterHandler)
	mux.HandleFunc("/category/", CategoryHandler)
	mux.HandleFunc("/post/", PostHandler)
	mux.HandleFunc("/comment/post/", PostCommentHandler)
	mux.HandleFunc("/comment/", CommentHandler)
}

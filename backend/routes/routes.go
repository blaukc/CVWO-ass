package routes

import (
	"net/http"
	"regexp"

	"github.com/blaukc/CVWO-ass/backend/api"
)

var (
	getUserRe        = regexp.MustCompile(`^\/forumuser\/.+$`)
	getCommentRe     = regexp.MustCompile(`^\/comment\/.+$`)
	getPostCommentRe = regexp.MustCompile(`^\/comment\/post\/.+$`)
)

func ForumUserHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("content-type", "application/json")
	switch {
	// GET USER
	case r.Method == http.MethodGet && getUserRe.MatchString(r.URL.Path):
		api.GetUser(w, r)
		return
	// PATCH USER
	case r.Method == http.MethodPatch && getUserRe.MatchString(r.URL.Path):
		api.PatchUser(w, r)
		return
	// CREATE USER
	case r.Method == http.MethodPost && getUserRe.MatchString(r.URL.Path):
		api.PostUser(w, r)
		return
	default:
		http.NotFound(w, r)
		return
	}
}
func CategoryHandler(w http.ResponseWriter, r *http.Request) {}
func PostHandler(w http.ResponseWriter, r *http.Request)     {}

func PostCommentHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("content-type", "application/json")
	switch {
	// GET COMMENTS BY POST
	case r.Method == http.MethodGet && getPostCommentRe.MatchString(r.URL.Path):
		api.GetCommentsByPost(w, r)
		return
	default:
		http.NotFound(w, r)
		return
	}
}

func CommentHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("content-type", "application/json")
	switch {
	// GET COMMENT
	case r.Method == http.MethodGet && getUserRe.MatchString(r.URL.Path):
		api.GetUser(w, r)
		return
	// PATCH COMMENT
	case r.Method == http.MethodPatch && getUserRe.MatchString(r.URL.Path):
		api.PatchUser(w, r)
		return
	// CREATE COMMENT
	case r.Method == http.MethodPost && getUserRe.MatchString(r.URL.Path):
		api.PostUser(w, r)
		return
	default:
		http.NotFound(w, r)
		return
	}
}

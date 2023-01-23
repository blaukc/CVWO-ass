package routes

import (
	"encoding/json"
	"net/http"
	"regexp"

	"github.com/blaukc/CVWO-ass/backend/api"
)

var (
	getUserRe          = regexp.MustCompile(`^\/forumuser\/$`)
	getUserSlugRe      = regexp.MustCompile(`^\/forumuser\/.+$`)
	getLoginRe         = regexp.MustCompile(`^\/login\/$`)
	getRegisterRe      = regexp.MustCompile(`^\/register\/$`)
	getCommentRe       = regexp.MustCompile(`^\/comment\/$`)
	getCommentSlugRe   = regexp.MustCompile(`^\/comment\/.+$`)
	getPostRe          = regexp.MustCompile(`^\/post\/$`)
	getPostSlugRe      = regexp.MustCompile(`^\/post\/.+$`)
	getCategoryPostsRe = regexp.MustCompile(`^\/post\/category\/.+$`)
	getPostCommentsRe  = regexp.MustCompile(`^\/comment\/post\/.+$`)
	getCategoryRe      = regexp.MustCompile(`^\/category\/$`)
)

func ForumUserHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("content-type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "DELETE, PATCH, POST, GET, OPTIONS")
	switch {
	// GET USER
	case r.Method == http.MethodGet && getUserSlugRe.MatchString(r.URL.Path):
		api.GetUser(w, r)
		return
	// // PATCH USER
	// case r.Method == http.MethodPatch && getUserRe.MatchString(r.URL.Path):
	// 	api.PatchUser(w, r)
	// 	return
	// // CREATE USER
	// case r.Method == http.MethodPost && getUserRe.MatchString(r.URL.Path):
	// 	api.PostUser(w, r)
	// 	return
	default:
		http.NotFound(w, r)
		return
	}
}

func LoginHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("content-type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "DELETE, PATCH, POST, GET, OPTIONS")
	switch {
	// LOGIN
	case r.Method == http.MethodPost && getLoginRe.MatchString(r.URL.Path):
		token := api.Login(w, r)
		res := map[string]string{"token": token}
		jsonRes, _ := json.Marshal(res)
		w.Write(jsonRes)
		return
	// // PATCH USER
	// case r.Method == http.MethodPatch && getUserRe.MatchString(r.URL.Path):
	// 	api.PatchUser(w, r)
	// 	return
	// // CREATE USER
	// case r.Method == http.MethodPost && getUserRe.MatchString(r.URL.Path):
	// 	api.PostUser(w, r)
	// 	return
	default:
		http.NotFound(w, r)
		return
	}
}

func RegisterHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("content-type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "DELETE, PATCH, POST, GET, OPTIONS")
	switch {
	// REGISTER
	case r.Method == http.MethodPost && getRegisterRe.MatchString(r.URL.Path):
		token := api.Register(w, r)
		res := map[string]string{"token": token}
		jsonRes, _ := json.Marshal(res)
		w.Write(jsonRes)
		return
	// // PATCH USER
	// case r.Method == http.MethodPatch && getUserRe.MatchString(r.URL.Path):
	// 	api.PatchUser(w, r)
	// 	return
	// // CREATE USER
	// case r.Method == http.MethodPost && getUserRe.MatchString(r.URL.Path):
	// 	api.PostUser(w, r)
	// 	return
	default:
		http.NotFound(w, r)
		return
	}
}

func CategoryHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("content-type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "DELETE, PATCH, POST, GET, OPTIONS")
	switch {
	// GET CATEGORIES
	case r.Method == http.MethodGet && getCategoryRe.MatchString(r.URL.Path):
		api.GetCategories(w, r)
		return
	default:
		http.NotFound(w, r)
		return
	}
}
func PostHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("content-type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "DELETE, PATCH, POST, GET, OPTIONS")
	switch {
	// GET ALL POSTS FROM CATEGORY
	case r.Method == http.MethodGet && getCategoryPostsRe.MatchString(r.URL.Path):
		api.GetCategoryPosts(w, r)
		return
	// GET POST
	case r.Method == http.MethodGet && getPostSlugRe.MatchString(r.URL.Path):
		api.GetPost(w, r)
		return
	case r.Method == "OPTIONS":
		w.WriteHeader(http.StatusOK)
		return
	// DELETE POST
	case r.Method == http.MethodDelete && getPostSlugRe.MatchString(r.URL.Path):
		api.VerifyToken(api.DeletePost)(w, r)
		return
	// PATCH POST
	case r.Method == http.MethodPatch && getPostSlugRe.MatchString(r.URL.Path):
		api.VerifyToken(api.PatchPost)(w, r)
		return
	// CREATE POST
	case r.Method == http.MethodPost && getPostRe.MatchString(r.URL.Path):
		api.VerifyToken(api.CreatePost)(w, r)
		return
	default:
		http.NotFound(w, r)
		return
	}
}

func PostCommentHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("content-type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "DELETE, PATCH, POST, GET, OPTIONS")
	switch {
	// GET COMMENTS BY POST
	case r.Method == http.MethodGet && getPostCommentsRe.MatchString(r.URL.Path):
		api.GetCommentsByPost(w, r)
		return
	default:
		http.NotFound(w, r)
		return
	}
}

func CommentHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("content-type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "DELETE, PATCH, POST, GET, OPTIONS")
	switch {
	// // GET COMMENT
	// case r.Method == http.MethodGet && getUserRe.MatchString(r.URL.Path):
	// 	api.GetUser(w, r)
	// 	return
	case r.Method == "OPTIONS":
		w.WriteHeader(http.StatusOK)
		return
	// DELETE COMMENT
	case r.Method == http.MethodDelete && getCommentSlugRe.MatchString(r.URL.Path):
		api.VerifyToken(api.DeleteComment)(w, r)
		return
	// PATCH COMMENT
	case r.Method == http.MethodPatch && getCommentSlugRe.MatchString(r.URL.Path):
		api.VerifyToken(api.PatchComment)(w, r)
		return
	// CREATE COMMENT
	case r.Method == http.MethodPost && getCommentRe.MatchString(r.URL.Path):
		api.VerifyToken(api.PostComment)(w, r)
		return
	default:
		http.NotFound(w, r)
		return
	}
}

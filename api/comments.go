package api

import (
	"fmt"
	"net/http"
	"path"

	"github.com/blaukc/CVWO-ass/database"
	"github.com/blaukc/CVWO-ass/models"
)

func GetComment(w http.ResponseWriter, r *http.Request) {
	commentId := path.Base(r.URL.Path)
	db := database.Connect()

	var res []models.Comments
	database.GetRowById(db, &res, "comments", commentId)

	database.Disconnect(db)
	fmt.Println(res)
}

func GetCommentsByPost(w http.ResponseWriter, r *http.Request) {
	postId := path.Base(r.URL.Path)
	db := database.Connect()

	var res []models.Comments
	sqlStatement := fmt.Sprintf("SELECT * FROM comments WHERE post='%s'", postId)
	database.GetRows(db, &res, sqlStatement)

	database.Disconnect(db)
	fmt.Println(res)
}

func PatchComment(w http.ResponseWriter, r *http.Request) {
	fmt.Println(w)
}

func PostComment(w http.ResponseWriter, r *http.Request) {
	fmt.Println(w)
}

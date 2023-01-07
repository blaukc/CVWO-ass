package api

import (
	"fmt"
	"net/http"
	"path"

	"github.com/blaukc/CVWO-ass/backend/database"
	"github.com/blaukc/CVWO-ass/backend/models"
)

func GetCategoryPosts(w http.ResponseWriter, r *http.Request) []models.Posts {
	categoryId := path.Base(r.URL.Path)

	db := database.Connect()

	var res []models.Posts
	sqlStatement := fmt.Sprintf("SELECT * FROM posts WHERE category='%s'", categoryId)
	database.GetRows(db, &res, sqlStatement)

	database.Disconnect(db)
	fmt.Println(res)
	return res
}

func GetPost(w http.ResponseWriter, r *http.Request) {
	postId := path.Base(r.URL.Path)

	db := database.Connect()

	var res []models.ForumUsers
	database.GetRowById(db, &res, "forumusers", postId)

	database.Disconnect(db)
	fmt.Println(res)
}

func PatchPost(w http.ResponseWriter, r *http.Request) {
	fmt.Println(w)
}

func PostPost(w http.ResponseWriter, r *http.Request) {
	fmt.Println(w)
}

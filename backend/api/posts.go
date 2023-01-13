package api

import (
	"encoding/json"
	"fmt"
	"net/http"
	"path"

	"github.com/blaukc/CVWO-ass/backend/database"
	"github.com/blaukc/CVWO-ass/backend/models"
)

func GetCategoryPosts(w http.ResponseWriter, r *http.Request) []models.Posts {
	categoryName := path.Base(r.URL.Path)
	fmt.Println(categoryName)
	var categoryRes []models.Posts

	dbGetCategory := database.Connect()

	err := dbGetCategory.Select(&categoryRes, "SELECT id FROM categories WHERE category=$1", categoryName)
	if err != nil {
		panic(err)
	}
	database.Disconnect(dbGetCategory)
	categoryId := categoryRes[0].Id

	db := database.Connect()

	var res []models.Posts
	sqlStatement := fmt.Sprintf("SELECT * FROM posts WHERE category='%s'", categoryId)
	database.GetRows(db, &res, sqlStatement)

	database.Disconnect(db)
	fmt.Println(res)
	return res
}

func GetPost(w http.ResponseWriter, r *http.Request) []models.Posts {
	postId := path.Base(r.URL.Path)

	db := database.Connect()

	var res []models.Posts
	database.GetRowById(db, &res, "posts", postId)

	database.Disconnect(db)
	fmt.Println(res)

	return res
}

func PatchPost(w http.ResponseWriter, r *http.Request) {
	fmt.Println(w)
}

func CreatePost(w http.ResponseWriter, r *http.Request) {
	var post models.Posts
	err := json.NewDecoder(r.Body).Decode(&post)

	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	columns := []string{"poster", "category", "title", "description"}
	values := []string{post.Poster, post.Category, post.Title, post.Description}
	table := "posts"

	db := database.Connect()

	database.Insert(db, table, columns, values)

	database.Disconnect(db)
}

package api

import (
	"encoding/json"
	"fmt"
	"net/http"
	"path"

	"github.com/blaukc/CVWO-ass/backend/database"
	"github.com/blaukc/CVWO-ass/backend/models"
)

func GetCategoryPosts(w http.ResponseWriter, r *http.Request) {
	categoryName := path.Base(r.URL.Path)
	fmt.Println(categoryName)
	var categoryRes []models.Posts

	dbGetCategory := database.Connect()

	err := dbGetCategory.Select(&categoryRes, "SELECT id FROM categories WHERE category=$1", database.SanitizeInput(categoryName))
	if err != nil {
		panic(err)
	}
	database.Disconnect(dbGetCategory)
	categoryId := categoryRes[0].Id

	db := database.Connect()

	var res []models.Posts
	sqlStatement := fmt.Sprintf("SELECT * FROM posts WHERE category='%s'", database.SanitizeInput(categoryId))
	database.GetRows(db, &res, sqlStatement)

	database.Disconnect(db)
	jsonRes, _ := json.Marshal(res)
	w.Write(jsonRes)
}

func GetPost(w http.ResponseWriter, r *http.Request) {
	postId := path.Base(r.URL.Path)

	db := database.Connect()

	var res []models.Posts
	database.GetRowById(db, &res, "posts", postId)

	database.Disconnect(db)

	jsonRes, _ := json.Marshal(res)
	w.Write(jsonRes)
}

func DeletePost(w http.ResponseWriter, r *http.Request, user_id string) {
	postId := path.Base(r.URL.Path)

	if AuthToPost(postId, user_id) {
		db := database.Connect()

		database.DeleteById(db, "posts", postId)

		database.Disconnect(db)
	} else {
		http.Error(w, "Unauthorized to remove this post", http.StatusUnauthorized)
		return
	}
}

func PatchPost(w http.ResponseWriter, r *http.Request, user_id string) {
	postId := path.Base(r.URL.Path)
	var post models.Posts
	err := json.NewDecoder(r.Body).Decode(&post)

	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	if AuthToPost(postId, user_id) {
		var columns []string
		var values []string
		if post.Title != "" {
			columns = append(columns, "title")
			values = append(values, post.Title)
		}
		if post.Description != "" {
			columns = append(columns, "description")
			values = append(values, post.Description)
		}
		table := "posts"

		db := database.Connect()

		database.PatchById(db, table, postId, columns, values)

		database.Disconnect(db)
	} else {
		http.Error(w, "Unauthorized to update this post", http.StatusUnauthorized)
		return
	}
}

func AuthToPost(postId string, userId string) bool {
	db := database.Connect()
	var post []models.Posts
	database.GetRowById(db, &post, "posts", postId)

	database.Disconnect(db)

	return post[0].Poster == userId
}

func CreatePost(w http.ResponseWriter, r *http.Request, user_id string) {
	var post models.Posts
	err := json.NewDecoder(r.Body).Decode(&post)

	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	columns := []string{"poster", "category", "title", "description"}
	values := []string{user_id, post.Category, post.Title, post.Description}
	table := "posts"

	db := database.Connect()

	database.Insert(db, table, columns, values)

	database.Disconnect(db)
}

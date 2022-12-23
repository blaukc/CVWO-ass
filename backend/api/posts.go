package api

import (
	"fmt"
	"net/http"
	"path"

	"github.com/blaukc/CVWO-ass/backend/database"
	"github.com/blaukc/CVWO-ass/backend/models"
)

func GetPost(w http.ResponseWriter, r *http.Request) {
	userId := path.Base(r.URL.Path)
	fmt.Println(userId)
	db := database.Connect()
	var res []models.ForumUsers
	database.GetRowById(db, &res, "forumusers", userId)
	database.Disconnect(db)
	fmt.Println(res)
}

func PatchPost(w http.ResponseWriter, r *http.Request) {
	fmt.Println(w)
}

func PostPost(w http.ResponseWriter, r *http.Request) {
	fmt.Println(w)
}

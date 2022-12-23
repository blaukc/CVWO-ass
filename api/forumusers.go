package api

import (
	"fmt"
	"net/http"
	"path"

	"github.com/blaukc/CVWO-ass/database"
	"github.com/blaukc/CVWO-ass/models"
)

func GetUser(w http.ResponseWriter, r *http.Request) {
	userId := path.Base(r.URL.Path)
	fmt.Println(userId)
	db := database.Connect()
	var res []models.ForumUsers
	database.GetRowById(db, &res, "forumusers", userId)
	database.Disconnect(db)
	fmt.Println(res)
}

func PatchUser(w http.ResponseWriter, r *http.Request) {
	fmt.Println(w)
}

func PostUser(w http.ResponseWriter, r *http.Request) {
	fmt.Println(w)
}

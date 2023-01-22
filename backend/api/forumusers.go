package api

import (
	"encoding/json"
	"fmt"
	"net/http"
	"path"

	"github.com/blaukc/CVWO-ass/backend/database"
	"github.com/blaukc/CVWO-ass/backend/models"
	"golang.org/x/crypto/bcrypt"
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

func Login(w http.ResponseWriter, r *http.Request) {
	var credentials models.UserCredentials
	err := json.NewDecoder(r.Body).Decode(&credentials)

	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	// hash, err := bcrypt.GenerateFromPassword([]byte(credentials.Password), bcrypt.DefaultCost)
	// if err != nil {
	// 	panic(err)
	// }

	db := database.Connect()

	var res []models.ForumUsers
	sqlStatement := fmt.Sprintf("SELECT password FROM forumusers WHERE name='%s'", credentials.Username)
	database.GetRows(db, &res, sqlStatement)

	database.Disconnect(db)

	if len(res) == 0 {
		http.Error(w, "Incorrect Username", http.StatusBadRequest)
		return
	}

	err = bcrypt.CompareHashAndPassword([]byte(res[0].Password), []byte(credentials.Password))

	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

}

func Register(w http.ResponseWriter, r *http.Request) {
	var credentials models.UserCredentials
	err := json.NewDecoder(r.Body).Decode(&credentials)

	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	hash, err := bcrypt.GenerateFromPassword([]byte(credentials.Password), bcrypt.DefaultCost)
	if err != nil {
		panic(err)
	}

	columns := []string{"name", "password"}
	values := []string{credentials.Username, string(hash)}
	table := "forumusers"

	db := database.Connect()

	database.Insert(db, table, columns, values)

	database.Disconnect(db)

}

package api

import (
	"encoding/json"
	"net/http"

	"github.com/blaukc/CVWO-ass/backend/database"
	"github.com/blaukc/CVWO-ass/backend/models"
)

func GetCategories(w http.ResponseWriter, r *http.Request) {
	db := database.Connect()
	var res []models.Categories
	sqlStatement := "SELECT * FROM categories"
	database.GetRows(db, &res, sqlStatement)
	database.Disconnect(db)
	jsonRes, _ := json.Marshal(res)
	w.Write(jsonRes)
}

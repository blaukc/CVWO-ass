package api

import (
	"net/http"

	"github.com/blaukc/CVWO-ass/backend/database"
	"github.com/blaukc/CVWO-ass/backend/models"
)

func GetCategories(w http.ResponseWriter, r *http.Request) []models.Categories {
	db := database.Connect()
	var res []models.Categories
	sqlStatement := "SELECT * FROM categories"
	database.GetRows(db, &res, sqlStatement)
	database.Disconnect(db)
	return res
}

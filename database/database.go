package database

import (
	"fmt"

	"github.com/jmoiron/sqlx"
	_ "github.com/lib/pq"
)

const (
	host     = "localhost"
	port     = 5432
	user     = "cvwo_user"
	password = "cvw0_us3r"
	dbname   = "cvwo_forum"
)

func Connect() (db *sqlx.DB) {
	psqlInfo := fmt.Sprintf("host=%s port=%d user=%s "+
		"password=%s dbname=%s sslmode=disable",
		host, port, user, password, dbname)
	db, err := sqlx.Open("postgres", psqlInfo)
	if err != nil {
		panic(err)
	}
	// defer db.Close()

	err = db.Ping()
	if err != nil {
		panic(err)
	}

	fmt.Println("Successfully connected!")
	return db
}

func Disconnect(db *sqlx.DB) {
	db.Close()
	fmt.Println("Disconnected!")
}

func GetRowById(db *sqlx.DB, res any, table string, id string) {
	sqlStatement := fmt.Sprintf(`
		SELECT *
		FROM %s
		WHERE id=$1
	`, table)

	err := db.Select(res, sqlStatement, id)
	if err != nil {
		panic(err)
	}
}

func GetRows(db *sqlx.DB, res any, sqlStatement string) {
	err := db.Select(res, sqlStatement)
	if err != nil {
		panic(err)
	}
}

// func Insert(db *sqlx.DB) {
// 	sqlStatement := `
// 		INSERT INTO forumusers (name)
// 		VALUES ($1)
// 	`
// 	_, err := db.Exec(sqlStatement, "Lets GO")
// 	if err != nil {
// 		panic(err)
// 	}
// }

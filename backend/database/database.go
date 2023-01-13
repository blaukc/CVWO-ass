package database

import (
	"fmt"
	"strings"

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

func DeleteById(db *sqlx.DB, table string, id string) {
	sqlStatement := fmt.Sprintf(`
		DELETE FROM %s
		WHERE id='%s'
	`, table, id)

	_, err := db.Exec(sqlStatement)
	if err != nil {
		panic(err)
	}
}

func PatchById(db *sqlx.DB, table string, id string, columns []string, values []string) {
	var valuesWithQuotes []string
	for i, value := range values {
		valuesWithQuotes = append(valuesWithQuotes, fmt.Sprintf("%s='%s'", columns[i], value))
	}
	updateValues := strings.Join(valuesWithQuotes, ", ")
	sqlStatement := fmt.Sprintf("UPDATE %s SET %s WHERE id='%s'", table, updateValues, id)
	fmt.Println(sqlStatement)
	_, err := db.Exec(sqlStatement)
	if err != nil {
		panic(err)
	}
}
func Insert(db *sqlx.DB, table string, columns []string, values []string) {
	columnsParsed := strings.Join(columns, ", ")
	var valuesWithQuotes []string
	for _, value := range values {
		valuesWithQuotes = append(valuesWithQuotes, fmt.Sprintf("'%s'", value))
	}
	valuesParsed := strings.Join(valuesWithQuotes, ", ")
	sqlStatement := fmt.Sprintf("INSERT INTO %s (%s) VALUES (%s)", table, columnsParsed, valuesParsed)
	fmt.Println(sqlStatement)
	_, err := db.Exec(sqlStatement)
	if err != nil {
		panic(err)
	}
}

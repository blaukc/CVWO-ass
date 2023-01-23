package database

import (
	"fmt"
	"os"
	"strconv"
	"strings"

	"github.com/jmoiron/sqlx"
	"github.com/joho/godotenv"
	_ "github.com/lib/pq"
)

func Connect() (db *sqlx.DB) {

	env_err := godotenv.Load(".env")

	if env_err != nil {
		panic(env_err)
	}

	host := os.Getenv("DB_host")
	port, _ := strconv.Atoi(os.Getenv("DB_port"))
	user := os.Getenv("DB_user")
	password := os.Getenv("DB_password")
	dbname := os.Getenv("DB_dbname")

	psqlInfo := fmt.Sprintf("host=%s port=%d user=%s "+
		"password=%s dbname=%s sslmode=disable",
		host, port, user, password, dbname)
	db, err := sqlx.Open("postgres", psqlInfo)
	if err != nil {
		fmt.Println(err)
		panic(err)
	}
	// defer db.Close()

	err = db.Ping()
	if err != nil {
		fmt.Println(err)
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

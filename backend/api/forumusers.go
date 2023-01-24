package api

import (
	"encoding/json"
	"fmt"
	"net/http"
	"os"
	"path"
	"time"

	"github.com/blaukc/CVWO-ass/backend/database"
	"github.com/blaukc/CVWO-ass/backend/models"
	"github.com/golang-jwt/jwt"
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

	var user []models.ForumUsers
	sqlStatement := fmt.Sprintf("SELECT * FROM forumusers WHERE name='%s'", database.SanitizeInput(credentials.Username))
	database.GetRows(db, &user, sqlStatement)

	database.Disconnect(db)

	if len(user) == 0 {
		http.Error(w, "Incorrect Username", http.StatusBadRequest)
		return
	}

	err = bcrypt.CompareHashAndPassword([]byte(user[0].Password), []byte(credentials.Password))

	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	token, err := CreateToken(user[0].Id)
	if err != nil {
		panic(err)
	}

	res := map[string]string{"token": token, "user_id": user[0].Id, "user_name": user[0].Name}
	jsonRes, _ := json.Marshal(res)
	w.Write(jsonRes)
}

func Register(w http.ResponseWriter, r *http.Request) {
	var credentials models.UserCredentials
	err := json.NewDecoder(r.Body).Decode(&credentials)

	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	// Get the new ID
	db := database.Connect()

	var checkuser []models.ForumUsers
	sqlStatement := fmt.Sprintf("SELECT * FROM forumusers WHERE name='%s'", database.SanitizeInput(credentials.Username))
	database.GetRows(db, &checkuser, sqlStatement)

	database.Disconnect(db)

	if len(checkuser) > 0 {
		http.Error(w, "User already created", http.StatusBadRequest)
		return
	}

	hash, err := bcrypt.GenerateFromPassword([]byte(credentials.Password), bcrypt.DefaultCost)
	if err != nil {
		panic(err)
	}

	columns := []string{"name", "password"}
	values := []string{credentials.Username, string(hash)}
	table := "forumusers"

	db = database.Connect()

	database.Insert(db, table, columns, values)

	database.Disconnect(db)

	// Get the new ID
	db = database.Connect()

	var user []models.ForumUsers
	sqlStatement = fmt.Sprintf("SELECT * FROM forumusers WHERE name='%s'", database.SanitizeInput(credentials.Username))
	database.GetRows(db, &user, sqlStatement)

	database.Disconnect(db)

	// Generate and return token
	token, err := CreateToken(user[0].Id)
	if err != nil {
		panic(err)
	}

	res := map[string]string{"token": token, "user_id": user[0].Id, "user_name": user[0].Name}
	jsonRes, _ := json.Marshal(res)
	w.Write(jsonRes)
}

func CreateToken(user_id string) (string, error) {
	// Uncomment this to dev
	// env_err := godotenv.Load(".env")

	// if env_err != nil {
	// 	panic(env_err)
	// }

	secret := []byte(os.Getenv("JWT_SECRET"))
	token := jwt.New(jwt.SigningMethodHS256)

	claims := token.Claims.(jwt.MapClaims)
	claims["exp"] = time.Now().Add(2 * time.Hour).Unix()
	claims["user"] = user_id

	tokenString, err := token.SignedString(secret)

	if err != nil {
		return "", err
	}

	return tokenString, nil
}

func VerifyToken(endpointHandler func(w http.ResponseWriter, r *http.Request, user_id string)) http.HandlerFunc {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if r.Header["Authorization"] != nil {
			// Uncomment this to dev
			// env_err := godotenv.Load(".env")

			// if env_err != nil {
			// 	panic(env_err)
			// }

			secret := []byte(os.Getenv("JWT_SECRET"))

			token, err := jwt.Parse(
				r.Header["Authorization"][0],
				func(token *jwt.Token) (interface{}, error) {
					_, ok := token.Method.(*jwt.SigningMethodHMAC)
					if !ok {
						w.WriteHeader(http.StatusUnauthorized)
						_, err := w.Write([]byte("You're Unauthorized due to!"))
						if err != nil {
							return nil, err

						}
					}
					return secret, nil
				},
			)

			if err != nil {
				w.WriteHeader(http.StatusUnauthorized)
				_, err2 := w.Write([]byte("You're Unauthorized due to error parsing the JWT"))
				if err2 != nil {
					return
				}
			}

			claims, ok := token.Claims.(jwt.MapClaims)
			if ok && token.Valid {
				endpointHandler(w, r, claims["user"].(string))
			} else {
				w.WriteHeader(http.StatusUnauthorized)
				_, err := w.Write([]byte("You're Unauthorized due to invalid token"))
				if err != nil {
					return
				}
			}
		} else {
			w.WriteHeader(http.StatusUnauthorized)
			_, err := w.Write([]byte("You're Unauthorized due to No token in the header"))
			if err != nil {
				return
			}
		}

	})
}

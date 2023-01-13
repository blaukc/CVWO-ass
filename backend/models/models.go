package models

import "time"

type ForumUsers struct {
	Id           string    `json:"id"`
	Name         string    `json:"name"`
	Date_Created time.Time `json:"date_created"`
}

type Categories struct {
	Id       int    `json:"id"`
	Category string `json:"category"`
}

type Posts struct {
	Id           string    `json:"id"`
	Poster       string    `json:"poster"`
	Category     string    `json:"category"`
	Date_Created time.Time `json:"date_created"`
	Date_Updated time.Time `json:"date_updated"`
	Title        string    `json:"title"`
	Description  string    `json:"description"`
}

type Comments struct {
	Id           int       `json:"id"`
	Commenter    string    `json:"commenter"`
	Post         string    `json:"post"`
	Comment      string    `json:"comment"`
	Date_Created time.Time `json:"date_created"`
}

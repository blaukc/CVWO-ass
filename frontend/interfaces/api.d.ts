export interface IUsers {
    id: string;
    name: string;
    date_created: string;
}

export interface ICategories {
    id: string;
    category: string;
}

export interface IPosts {
    id: string;
    poster: string;
    category: string;
    date_created: string;
    date_updated: string;
    title: string;
}

export interface IComments {
    id: string;
    commenter: string;
    post: string;
    comment: string;
    date_created: string;
}

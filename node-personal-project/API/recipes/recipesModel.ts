import { Schema, model } from "mongoose";

export class Recipe {
    title: string;
    description: string;
    urlImg?: string
    id: string;

    constructor({title, description, urlImg}: {title: string, description: string, urlImg: string}){
        this.title = title;
        this.description = description;
        this.urlImg = urlImg;
        this.id = Math.random().toString();
    }
}

//define schema

export const RecipeSchema = new Schema({
    title: String,
    description: String,
    urlImg: String,
    email: {
        type: String,
        required: true
    }
});

//"recipes" will be the name of this collection in the DB
export const RecipeModel = model("recipes", RecipeSchema)

export const recipes: Recipe[] = [];
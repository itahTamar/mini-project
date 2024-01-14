import { Recipe } from "../recipes/recipesModel";
import { User } from "../users/usersModle";

export class UserRecipes {
    id: string;
    constructor(public user: User, public recipe: Recipe){
        this.id = Math.random().toString(36);
    }
}

export const userRecipes: UserRecipes[] = [];
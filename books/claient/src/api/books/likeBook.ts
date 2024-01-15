import axios from "axios";

export const likeBook = async (id:number) => {
    const {data} = await axios.post("/api/books/addFavorite" , {id})
}

export const getFavoriteBooks = async () => {
    const {data} = await axios.get("/api/books/getFavorites")
    //@ts-ignore
    const bookIds:Array = data.map(favorite => favorite.book_id);
    return bookIds;
}
import axios from "axios";

export const getAllBooks = async () => {
    try {
        const response = await axios.get("/api/books/getAllBooks");
        const { ok, results } = response.data;

        if (ok) {
           return results
        } else {
            console.error("Error retrieving books:", response.data.error);
        }
    } catch (error) {
        console.error("Error:", (error as Error).message);
    }
}; //work ok

export const getOneBook = async (bookId: string) => {
    try {
        const response = await axios.get(`/api/books/${bookId}`);
        const { ok, results } = response.data;

        if (ok) {
            
           return results
        } else {
            console.error("Error retrieving books:", response.data.error);
        }
    } catch (error) {
        console.error("Error:", (error as Error).message);
    }
}; //work ok

export const deleteBook = async (book_id: string) => {
    try {
        const response = await axios.delete(`/api/books/${book_id}`);
        const { ok, results } = response.data;

        if (ok) {
          
           return results
        } else {
            console.error("Error retrieving books:", response.data.error);
        }
    } catch (error) {
        console.error("Error:", (error as Error).message);
    }
}; //work ok

export const addBook = async (title: string, author:string, page_num:number, publisher:string, description:string, image:string, genre:string) => {
    try {
        const response = await axios.post(`/api/books/addBook`, {title, author, page_num, publisher, description, image, genre});
        const { ok, results } = response.data;

        if (ok) {
           return results
        } else {
            console.error("Error retrieving books:", response.data.error);
        }
    } catch (error) {
        console.error("Error:", (error as Error).message);
    }
}; //work ok

export const updateBookById = async (book_id:string ,field: string, update:string | number) => {
    try {
        const response = await axios.patch(`/api/books/"${book_id}"`, {field, update});
        const { ok, results } = response.data;

        if (ok) {
           return results
        } else {
            console.error("Error retrieving books:", response.data.error);
        }
    } catch (error) {
        console.error("Error:", (error as Error).message);
    }
}; //work ok
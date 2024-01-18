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
};

export const getOneBook = async (title: string) => {
    try {
        const response = await axios.get(`/api/books/${title}`);
        const { ok, results } = response.data;

        if (ok) {
            //@ts-ignore
           return(results)
        } else {
            console.error("Error retrieving books:", response.data.error);
        }
    } catch (error) {
        console.error("Error:", (error as Error).message);
    }
};

export const deleteBook = async (bookid: string) => {
    try {
        const response = await axios.get(`/api/books/${bookid}`);
        const { ok, results } = response.data;

        if (ok) {
            //@ts-ignore
           return(results)
        } else {
            console.error("Error retrieving books:", response.data.error);
        }
    } catch (error) {
        console.error("Error:", (error as Error).message);
    }
};
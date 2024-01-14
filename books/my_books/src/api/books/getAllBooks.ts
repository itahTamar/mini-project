import axios from "axios";

export const getAllBooks = async () => {
    try {
        const response = await axios.get("/api/books");
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
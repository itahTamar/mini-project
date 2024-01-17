import axios from "axios";

export const register = async (username: string, email: string, password: string) => {
    try {
        if (! username || ! email || ! password) throw new Error("no username/email/password from client at register");

        return await axios.post("/api/users/register", {username, email, password})
        
    } catch (error) {
        console.error(error)
    }
}
import axios from "axios";

export const register = async (username: string, email: string, password: string) => {
    try {
        if (!username || !email || !password) throw new Error("no username/email/password from client at register");

        return await axios.post("/api/users/register", {username, email, password})
        
    } catch (error) {
        console.error(error)
    }
}


export const login = async (email: string, password: string) => {
    try {
        if (!email || !password) throw new Error("no username/email/password from client at register");
        console.log("Axios login email & password:", email, password)
        return await axios.post("/api/users/login", {email, password})
        
    } catch (error) {
        console.error(error)
    }
}
import bcrypt from 'bcrypt';
import connection from '../../DB/database';
import jwt from 'jwt-simple';
import { Results } from '../../util/resultsModel';
import { Request, Response } from 'express';

const saltRounds = 10;

export async function registerUser(req: Request, res: Response) {
    try {
        const {username, email, password} = req.body;
        if (!username || !email || !password) throw new Error("no data at register user");

        const secret = process.env.SECRET
        if (!secret) throw new Error("no secret")

        const hash = await bcrypt.hash(password, saltRounds)

        const query = `INSERT INTO my_books.users (user_name, email, password) VALUES ('${username}' ,'${email}', '${hash}');`;

        connection.query(query, (err, resultsAdd: Results) => {
            try {
              if (err) throw err;
              if (resultsAdd.affectedRows) { 
                const queryUser = `SELECT * FROM my_books.users WHERE user_id = ${resultsAdd.insertId}`
                connection.query(queryUser, (err2, results) => {
                    if (err2) throw err2;
                    const cookie = {userID: resultsAdd.insertId}
                    const token = jwt.encode(cookie, secret)
                    const resultUserId = results[0].user_id
                    
                    res.cookie("userId", token, {httpOnly: true, maxAge: 1000 * 60 * 60})
                    res.send({ok: true, resultUserId})
                })
              }             
            } catch (error) {
                res.status(500).send({ok: false, error})
            }
        })
    } catch (error) {
        res.status(500).send({ok: false, error})
    }
} //work ok

export async function login(req: Request, res: Response) {
    try {
        console.log("hellow from server-login")
        const {email, password} = req.body;
        console.log("email & password:", email, password)
        if (!email || !password) throw new Error("no data at login user");
        
        const query = `SELECT * FROM my_books.users WHERE email = "${email}"`;
        if (!query) throw new Error("at login, No query provided for user login");       

        connection.query(query, async (err, results) => {
            const secret = process.env.SECRET
            if (!secret) throw new Error("no secret")
            
            try {
                if (err) throw err;
//@ts-ignore
                if (results.length > 0){
                    const hash = results[0].password
                    const match:boolean = await bcrypt.compare(password, hash);
                    if(!match) throw new Error("at login password incorrect!");

                    const resultUserId = results[0].user_id
                    const resultUserName = results[0].user_name

                    const cookie = {resultUserId}
                    const token = jwt.encode(cookie, secret)

                    res.cookie("userId", token, {httpOnly: true, maxAge: 1000 * 60 * 60})
                    res.send({ok: true, message: "user login!", resultUserName})
                } else {
                    throw new Error("user not found");
                    
                }
                
            } catch (error) {
                res.status(500).send({ok: false, error})
            }
        })
        
    } catch (error) {
        res.status(500).send({ok: false, error})
    }
} //work ok
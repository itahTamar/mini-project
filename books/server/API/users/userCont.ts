import bcrypt from 'bcrypt';
import connection from '../../DB/database';
import jwt from 'jwt-simple';
import { Results } from '../../util/resultsModel';

const saltRounds = 10;

export async function registerUser(req: any, res: any) {
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
                    
                    res.cookie("userid", token, {httpOnly: true, maxAge: 1000 * 60 * 60})
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

export async function getUserByCookie(req: any, res: any) {
    try {
        const {user} = req.cookies;

        const secret = process.env.SECRET
        if (!secret) throw new Error("no secret")
        // if ()
        const decodedId = jwt.decode(user, secret)
        const {userID} = decodedId;
        // if ()

        const query = `SELECT * FROM my_book.users WHERE user_id = ${userID}`;

        connection.query(query, (err, results) => {
            try {
                if (err) throw err;

                res.send({ok: true, results: results[0]})
            } catch (error) {
                res.status(500).send({ok: false, error})
            }
        })
        
    } catch (error) {
        res.status(500).send({ok: false, error})
    }
}
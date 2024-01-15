import bcrypt from 'bcrypt';
import connection from '../../DB/database';
import jwt from 'jwt-simple';

const saltRounds = 10;

export async function registerUser(req: any, res: any) {
    try {
        const {username, email, password} = req.body;
        if (!username || !email || !password) throw new Error("no data at register user");

        const secret = process.env.SECRET
        if (!secret) throw new Error("no secret")

        const hash = await bcrypt.hash(password, saltRounds)

        const query = `INSERT INTO my_books.users (user_name, email, password) VALUES ('${username}' ,'${email}', '${hash}');`;

        connection.query(query, (err, resultsAdd) => {
            try {
              if (err) throw err;
                //@ts-ignore
              if (resultsAdd.affectedRows) { 
                //@ts-ignore
                const queryUser = `SELECT * FROM users WHERE user_id = ${resultsAdd.insertId}`
                connection.query(queryUser, (err2, results) => {
                    if (err2) throw err2;
                    //@ts-ignore  //!2:13:13 lesson 7.1.24
                    const cookie = {userID: resultsAdd.insertId}
                    const token = jwt.encode(cookie, secret)

                    res.cookie("user", token, {httpOnly: true, maxAge: 1000 * 60 * 60})
                    res.send({ok: true, results})
                })
              }
             
            } catch (error) {
                res.status(500).send({ok: false, error})
            }
        })
    } catch (error) {
        res.status(500).send({ok: false, error})
    }
}

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
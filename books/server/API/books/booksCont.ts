import express from 'express'
import connection from '../../DB/database'
import { books } from "../../util/books"

import jwt from 'jwt-simple';

const saltRounds = 10;

export async function getAllBooks(req: express.Request, res: express.Response) {
    try {
        const query = "SELECT * FROM books"
        connection.query(query, (err, results) => {
            try {
                if (err) throw err
                res.send({ ok: true, results })
            } catch (error) {
                console.log(error)
                res.status(500).send({ ok: false, error })
            }
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({ ok: false, error })  //closer - without it the error could stack in loop
    }
}

export async function addOneBook(req: express.Request, res: express.Response) {
    try {
        //@ts-ignore
        const { title, author, pageNum, publisher, description, image, genre } = req.body
        if (!title || !author || !image) throw new Error("no data in FUNCTION createAllBook in file booksCtrl.ts")

        const checkQuery = `SELECT * FROM my_book.books WHERE  title = ?`
        connection.query(checkQuery, [title], (err, results) => {
            if (err) throw err;
            //@ts-ignore
            if (results.length > 0) {
                res.status(409).send({ ok: false, message: "Book already exists" });
            }
            else {
                const query = `INSERT INTO my_book.books (title, author, pageNum, publisher, description, image,genre) VALUES ('${title}', '${author}', ${pageNum}, '${publisher}', "${description}", '${image}', '${genre}');`;
                connection.query(query, (err, results) => {
                    try {
                        if (err) throw err;
                        res.send({ ok: true, results })
                    } catch (error) {
                        res.status(500).send({ ok: false, error })
                    }
                })
            }
        })
    } catch (error) {
        res.status(500).send({ ok: false, error })
    }
}

export async function getOneBook(req: express.Request, res: express.Response) {
    const {title} = req.query;
    if (!title) throw new Error("no title");
    try {
        const query = `SELECT * FROM my_books.books WHERE title = "${title}";`
        connection.query(query, (err, results) => {
            try {
                if (err) throw err
                res.send({ ok: true, results })
            } catch (error) {
                console.log(error)
                res.status(500).send({ ok: false, error })
            }
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({ ok: false, error })  //closer - without it the error could stack in loop
    }
}
    

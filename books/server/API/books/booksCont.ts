import express from 'express'
import connection from '../../DB/database'
import { books } from "../../util/books"

import jwt from 'jwt-simple';

const saltRounds = 10;

export async function addAllBooks(req: express.Request, res: express.Response) {
    try {

        // Use Promise.all to wait for all queries to finish
        await Promise.all(
            books.map(async (book) => {
                const insertQuery = 'INSERT INTO book_store.books (title, author, pageNum, publisher, description, image,genre) VALUES (?, ?, ?, ?, ?, ?, ?)';

                const queryPromise = new Promise((resolve, reject) => {
                    connection.query(insertQuery, [book.title, book.author, book.pageNum, book.publisher, book.description, book.image, book.genre], (err, resultsAdd) => {
                        if (err) reject(err);
                        else resolve(resultsAdd);
                    });
                });
                await queryPromise;
            })
        );

        // Send a response when all queries are complete
        res.status(200).send({ ok: true, message: 'All books added successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).send({ ok: false, error });  // Handle errors more gracefully in a production environment
    }
}

export async function getAllBooks(req: express.Request, res: express.Response) {
    try {
        const query = "SELECT * FROM book_store.books"
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

export async function createBook(req: express.Request, res: express.Response) {
    try {
        const { title, author, pageNum, publisher, description, image, genre } = req.body
        if (!title || !author || !image) throw new Error("no data in FUNCTION createAllBook in file booksCtrl.ts")

        const checkQuery = `SELECT * FROM book.books WHERE  title = ?`
        connection.query(checkQuery, [title], (err, results) => {
            if (err) throw err;
            //@ts-ignore
            if (results.length > 0) {
                res.status(409).send({ ok: false, message: "Book already exists" });
            }
            else {
                const query = `INSERT INTO book.books (title, author, pageNum, publisher, description, image, likes,genre) VALUES ('${title}', '${author}', ${pageNum}, '${publisher}', "${description}", '${image}', ${likes} , '${genre}');`;
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
        const query = `SELECT * FROM book_store.books WHERE title = "${title}";`
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
    }}

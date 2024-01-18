import express from 'express'
import connection from '../../DB/database'
import { books } from "../../util/books"

export async function getAllBooks(req: express.Request, res: express.Response) {
    try {
        const query = "SELECT * FROM my_books.books"
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
} //work ok

export async function addOneBook(req: express.Request, res: express.Response) {
    try {
        //@ts-ignore
        const { title, author, pageNum, publisher, description, image, genre } = req.body
        if (!title || !author || !description || !image) throw new Error("no data in function createAllBook in file booksCtrl.ts")

        const checkQuery = `SELECT * FROM my_books.books WHERE  title = ?`
        connection.query(checkQuery, [title], (err, results) => {
            if (err) throw err;
            //@ts-ignore
            if (results.length > 0) {
                res.status(409).send({ ok: false, message: "Book already exists" });
            }
            else {
                const query = `INSERT INTO my_books.books (title, author, page_num, publisher, description, image, genre) VALUES ('${title}', '${author}', ${pageNum}, '${publisher}', "${description}", '${image}', '${genre}');`;
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
}  //work ok

export async function getOneBook(req: express.Request, res: express.Response) {
    const {title} = req.params;
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
} //work ok
    
export async function updateBook(req: express.Request, res: express.Response) {
    try {
        const { bookId } = req.params;
        if (!bookId) throw new Error("No Id provided on updateBook");
        const { field, update } = req.body;
        if (!field || !update) throw new Error("No field or update provided on updateBook");
        const query = `UPDATE my_books.books SET ${field} = '${update}' WHERE (book_id = ${bookId});`;
        connection.query(query, (err, results) => {
            try {
                if (err) throw err;
                //@ts-ignore
                if (results.changedRows) {
                    const queryUpdateBook = `SELECT * from my_books.books WHERE (book_id = ${bookId});`
                    connection.query(queryUpdateBook, (err2, results2) => {
                        try {
                            if (err2) throw err2;
                            res.send({ ok: true, results2 })
                        } catch (error) {
                            console.log(error)
                            res.status(500).send({ ok: false, error })
                        }
                    })
                } else {
                    res.send({ ok: true, results: "no changes found" })
                }
            } catch (error) {
                console.log(error)
                res.status(500).send({ ok: false, error })
            }
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({ ok: false, error })
    }
} //work ok

export async function deleteBook(req: express.Request, res: express.Response) {
    try {
        const {bookId} = req.params;
        if (!bookId) throw new Error("no Id")

        const query = `DELETE FROM my_books.books WHERE (book_id = ${bookId});`;

        connection.query(query, (err, results) => {
            try {
                if (err) throw err;
                //@ts-ignore
                if (results.affectedRows) {
                    res.send({ok: true, results})
                } else {
                    res.send({ok: true, results: "No rows were deleted"})
                }
            } catch (error) {
                console.log(error)
                res.status(500).send({ ok: false, error }) 
            }
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({ ok: false, error }) 
    }
} //work ok

//for the debouncing search (get)
export async function findBookByName(req: express.Request, res: express.Response) {
    try {
        const {title} = req.query;
        if (!title) throw new Error("no title");

        // {X}% - have to start with x and end with something
        // %{x} - start with something and end with x
        // %{x}% - search everything that may have x in it

        const queryFind = `SELECT * FROM my_books.books WHERE title LIKE "${title}%";`

        connection.query(queryFind, (err, results) => {
            try {
                if (err) throw err
                res.send({ok: true, results})
            } catch (error) {
                console.log(error)
                res.status(500).send({ ok: false, error })
            }
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({ ok: false, error })
    }
} //work ok


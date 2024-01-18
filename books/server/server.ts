import express from 'express';
import cookieParser = require("cookie-parser")

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(express.json());
app.use(cookieParser());
import connection from './DB/database';

//should be route to creationRouter and connect to creationCont where the function should be
app.post("/api/create-database", (req, res) => {
    try {
        //should be for admin only
        const {adminPassword} = req.body;
        if (!adminPassword) throw new Error("no admin password in create database");
        if (adminPassword === "123456") {
            const query = "CREATE DATABASE IF NOT EXISTS my_books"
            connection.query(query, (err, results) => {
                if (err) throw err;
                res.send({ok: true, message: "database created!"})
            })
        }
        
    } catch (error) {
        res.status(500).send({ok: false, error})
    }
}) //work ok

app.post("/api/create-books-table", (req, res) => {
    try {
         //should be for admin only
         const {adminPassword} = req.body;
         if (!adminPassword) throw new Error("no admin password in create database");
         if (adminPassword === "123456") {
            const queryBooks = `CREATE TABLE IF NOT EXISTS my_books.books(
                book_id INT NOT NULL AUTO_INCREMENT,
                title VARCHAR(45) NOT NULL,
                author VARCHAR(45) NOT NULL,
                page_num VARCHAR(45) NULL,
                publisher VARCHAR(45) NULL,
                description VARCHAR(4500) NOT NULL,
                image VARCHAR(450) NOT NULL,
                genre VARCHAR(45) NULL,
                PRIMARY KEY (book_id),
                UNIQUE INDEX book_id_UNIQUE (book_id ASC) VISIBLE,
                UNIQUE INDEX title_UNIQUE (title ASC) VISIBLE
                );`
                connection.query(queryBooks, (err, results) => {
                    if (err) throw err;
                    res.send({ok: true, message: "books table created!"})
                })
         }
    } catch (error) {
        res.status(500).send({ok: false, error}) 
    }
}) //work ok

app.post("/api/create-users-table", (req, res) => {
    try {
          //should be for admin only
          const {adminPassword} = req.body;
          if (!adminPassword) throw new Error("no admin password in create database");
          if (adminPassword === "123456") {
             const queryUsers = `CREATE TABLE IF NOT EXISTS my_books.users(
                user_id INT NOT NULL AUTO_INCREMENT,
                user_name VARCHAR(100) NOT NULL,
                email VARCHAR(200) NOT NULL,
                password VARCHAR(500) NOT NULL,
                PRIMARY KEY (user_id),
                UNIQUE INDEX user_id_UNIQUE (user_id ASC) VISIBLE,
                UNIQUE INDEX email_UNIQUE (email ASC) VISIBLE
                 );`
                 connection.query(queryUsers, (err, results) => {
                     if (err) throw err;
                     res.send({ok: true, message: "users table created!"})
                 })
    } 
    } catch (error) {
        res.status(500).send({ok: false, error})   
    }
}) //work ok

import userRoutes from "./API/users/userRoutes"
app.use('/api/users', userRoutes);

import booksRoutes from "./API/books/booksRoutes"
app.use('/api/books', booksRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
});

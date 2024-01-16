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
            const query = "CREATE DATABASE my_books"
            connection.query(query, (err, results) => {
                if (err) throw err;
                res.send({ok: true, message: "DB created!"})
            })
        }
        
    } catch (error) {
        res.status(500).send({ok: false, error})
    }
})


import userRoutes from "./API/users/userRoutes"
app.use('/api/users', userRoutes);

import booksRoutes from "./API/books/booksRoutes"
app.use('/api/books', booksRoutes);

import creationRouter from "./API/creation/creationRouter"
app.use('/api/creation', creationRouter)



app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
});

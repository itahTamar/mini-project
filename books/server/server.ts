import express from 'express';
import cookieParser = require("cookie-parser")


require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(express());
app.use(cookieParser());

import connection from './DB/database';

import userRoutes from "./API/users/userRoutes"
app.use('/api/users', userRoutes);

import booksRoutes from "./API/books/booksRoutes"
app.use('/api/books', booksRoutes);

import creationRouter from "./API/creation/creationRouter"
app.use('/api/creation', creationRouter)

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
});

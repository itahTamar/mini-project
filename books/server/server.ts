import express from 'express';
import cors from 'cors';
import cookieParser = require("cookie-parser")

// import { books } from './util/books';
require('dotenv').config();


const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173',
}));

app.use(cookieParser());




import userRoutes from "./API/users/userRoutes"
import booksRoutes from "./API/books/booksRoutes"
import initialRoutes from "./API/initialize/initialRouter"

app.use('/api/users', userRoutes);
app.use('/api/books', booksRoutes);
app.use("/api/initialize", initialRoutes)


app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
});

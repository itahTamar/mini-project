import express from 'express';
import cookieParser = require("cookie-parser")
import userRoutes from "./API/users/userRoutes"
import booksRoutes from "./API/books/booksRoutes"

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(express());
app.use(cookieParser());

app.use('/api/users', userRoutes);
app.use('/api/books', booksRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
});

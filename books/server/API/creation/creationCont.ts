import mysql from 'mysql2/promise';
import express from 'express';
import connection from '../../DB/database';

export default async function createSchemaAndTables(req: express.Request, res: express.Response) {
  try {
    // const query = `SELECT table_name FROM information_schema.tables WHERE table_name = 'books' AND table_schema = 'my_books';`

    // Create a new database if it doesn't exist
    connection.query('CREATE SCHEMA IF NOT EXISTS my_books');
    connection.query('USE my_books');

    // Create a users table for storing information about users
    connection.query(`
        CREATE TABLE IF NOT EXISTS my_books.users 
        (
        user_id INT NOT NULL AUTO_INCREMENT,
        user_name VARCHAR(100) NOT NULL,
        email VARCHAR(200) NOT NULL,
        password VARCHAR(500) NOT NULL,
        PRIMARY KEY (user_id),
        UNIQUE INDEX user_id_UNIQUE (user_id ASC) VISIBLE,
        UNIQUE INDEX email_UNIQUE (email ASC) VISIBLE
        );`
        );

    // Create a books table for storing information about books
    connection.query(`
    CREATE TABLE IF NOT EXISTS my_books.books (
        book_id INT NOT NULL AUTO_INCREMENT,
        title VARCHAR(45) NOT NULL,
        author VARCHAR(45) NOT NULL,
        publisher VARCHAR(45) NULL,
        description VARCHAR(450) NOT NULL,
        image VARCHAR(45) NOT NULL,
        genre VARCHAR(45) NULL,
        PRIMARY KEY (book_id),
        UNIQUE INDEX book_id_UNIQUE (book_id ASC) VISIBLE,
        UNIQUE INDEX title_UNIQUE (title ASC) VISIBLE);`
        );    

    console.log('Database and tables created successfully.');
  } catch (error) {
    console.error('Error creating database and tables:', error);
  } finally {
    connection.end();
  }
}


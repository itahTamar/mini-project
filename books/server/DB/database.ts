import  mysql  from 'mysql2';

const sqlpassword = process.env.SQLPASSWORD;

const connection = mysql.createConnection({
    host: "sql11.freemysqlhosting.net",
    port: 3306,
    user: "sql11681026",
    password: sqlpassword,
    database: "sql11681026"
})

connection.connect((err) => {
    try {
        if (err) throw err
        console.log("SQL server is connected")
    } catch (error) {
        console.error(error)
    }
})

export default connection
// connection to the database
const mysql = require('mysql2')

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'qwqw',
    database: 'company'
})

connection.connect(function (err) {
    if (err) throw err
    console.log('connected!') 
})

module.exports = connection
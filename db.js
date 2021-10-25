const mysql = require('mysql')

module.exports = () => {
const db = mysql.createConnection({
    host: "database-1.cinibtozq2y8.ap-southeast-1.rds.amazonaws.com",
    user: "admin",
    password: "Welcome#1",
    database: "new_schema"
})
 
db.connect(function (err) {
    if (err) {
        return console.error('error: ' + err.message);
    }
    console.log('Connected to the MySQL server.');
})
}
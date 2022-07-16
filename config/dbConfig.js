const mysql = require('mysql');
const dbConn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password12345.",
    database: "scellrr"
});


dbConn.connect(function (error) {
    if (error) throw error;
    console.log("Database Connected Successfully");

})
module.export = dbConn;
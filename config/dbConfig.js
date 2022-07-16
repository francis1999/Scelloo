const mysql = require('mysql');
const dbConn = mysql.createConnection({
    host: "us-cdbr-east-06.cleardb.net",
    user: "b9b6da5f5ce1e8",
    password: "bee92be3",
    database: "scelloo"
});
/* const dbConn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password12345.",
    database: "scellrr"
}); */


dbConn.connect(function (error) {
    if (error) throw error;
    console.log("Database Connected Successfully");

})
module.export = dbConn;
var mysql = require('mysql');

//Database con
module.exports = {
 pool : mysql.createPool({
    host: "sbcon.ddns.net",
    user: "???",
    password: "???",
    database: "???"
})
}
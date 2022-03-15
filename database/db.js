const mysql = require("mysql2");
const db_conn = mysql.createPool({
    connectionLimit : 10,
    host : '127.0.0.1',
    user : 'root',
    password : 'Sangpham_99%',
    database : 'tododb'
});
const mysql = require("mysql2");
const knex = require('knex');
// const dbConn = mysql.createPool({
//     connectionLimit : 10,
//     host : '127.0.0.1',
//     user : 'root',
//     password : 'Sangpham_99%',
//     database : 'tododb'
// });

const knexConfig = knex({
    client: 'mysql2',
    connection: {
        host: '127.0.0.1',
        user: 'root',
        password: 'Sangpham_99%',
        database: 'tododb'
    }
})
module.exports = knexConfig
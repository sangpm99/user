const user = require('../objection/model')
const mysql = require("mysql2");
const express = require("express");


const db_conn = mysql.createPool({
    connectionLimit : 10,
    host : '127.0.0.1',
    user : 'root',
    password : 'Sangpham_99%',
    database : 'tododb'
});

exports.user_list_get = function(req, res) {
    db_conn.getConnection( (err, conn) => {
        if(err) throw err
        console.log(`connected as id ${conn.threadId}`)

        conn.query('SELECT * FROM developers' , (err, rows) => {
            conn.release() // return the connection to pool

            if(!err){
                res.send(rows);
            } else{
                console.log(err);
            }
        });
    });
};
exports.user_list_post = function(req, res) {
    db_conn.getConnection( (err, conn) => {
        if(err) throw err
        console.log(`connected as uid ${conn.threadId}`)

        const params =  req.body

        conn.query('INSERT INTO  developers SET ?' , params , (err, rows) => {
            conn.release() // return the connection to pool

            if(!err){
                res.send(`Developers with name  ${params.id } has been Added.`);
            } else{
                console.log(err);
            }
        });

        console.log(req.body);
    });
};

const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const { response } = require('express');
const knex = require('knex'); // './database.js'
const objection = require('objection');
const developRoute = require('./route/developer.route');
const database = require('./database/db');
const knexConfig = require("./database/db")
require('dotenv').config()

objection.Model.knex(knexConfig) //database.js

const app = express();
const PORT = 5000;


app.use(bodyParser.urlencoded({ extended : false }));
app.use(bodyParser.json());
// app.use()

app.use('/',developRoute)

// Listen on environment port or 5000
app.listen(PORT , () => console.log(`Listen on the port ${PORT}`));




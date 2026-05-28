const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "practice-database",
    password: process.env.DB_PASSWORD,
    port: 5432
});

const query = (text, params) => {
    return pool.query(text, params);
};

module.exports = {
    query: query
};
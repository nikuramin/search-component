const config = require('../config');
let mysql = require('promise-mysql');
const pool = mysql.createPool(config.mysql);

async function query(queryStr,queryParams) {
    try {
        return await pool.query(queryStr, queryParams);;
    } catch (error) {
        return {error: `db middleware error: ${error}`}
    }
}

module.exports = {
    query: query
}
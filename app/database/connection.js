// const mysql = require('mysql-ssh');
const config = require('./config');
const mysql = require('mysql2');


module.exports = {
    connect: () => {
        return mysql.createConnection(config.db)
        // return mysql.connect(config.ssh, config.db);
    },
    close: () => {
        // return mysql.close();
    }
};
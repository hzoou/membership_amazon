const mysql = require('mysql-ssh');
const config = require('./config');

module.exports = {
    connect: () => {
        return mysql.connect(config.ssh, config.db);
    },
    close: () => {
        return mysql.close();
    }
};
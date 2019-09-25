module.exports = {
    showColumn: (con, table) => {
      return new Promise((resolve) => {
          con.query(`SHOW FULL COLUMNS FROM ${table}`, function (err, fields) {
              if (err) throw err;
              resolve(fields);
          });
      });
    },

    selectAll: (con, table) => {
        return new Promise((resolve) => {
            con.query(`SELECT * FROM ${table}`, function (err, results) {
                if (err) throw err;
                resolve(results);
            });
        });
    },

    delete: (con, table, condition) => {
        return new Promise((resolve) => {
            con.query(`DELETE FROM ${table} WHERE ${condition}`, function (err) {
                if (err) throw err;
                resolve();
            });
        })
    },

    update: (con, table, condition, value) => {
        return new Promise((resolve) => {
            con.query(`UPDATE ${table} SET ${value} WHERE ${condition}`, function (err) {
                if (err) throw err;
                resolve();
            });
        })
    }
};
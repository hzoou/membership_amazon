module.exports = {
    show: (con, table) => {
      return new Promise((resolve) => {
          con.query(`SHOW FULL COLUMNS FROM ${table}`, function (err, fields) {
              if (err) throw err;
              resolve(fields);
          });
      });
    },

    select: (con, table) => {
        return new Promise((resolve) => {
            con.query(`SELECT * FROM ${table}`, function (err, results) {
                if (err) throw err;
                resolve(results);
            });
        });
    },

    delete: (con, table, idx) => {
        return new Promise((resolve) => {
            con.query(`DELETE FROM ${table} WHERE idx=${idx}`, function (err) {
                if (err) throw err;
                resolve();
            });
        })
    },

    update: (con, table, idx, value) => {
        return new Promise((resolve) => {
            con.query(`UPDATE ${table} SET ${value} WHERE idx=${idx}`, function (err) {
                if (err) throw err;
                resolve();
            });
        })
    }
};
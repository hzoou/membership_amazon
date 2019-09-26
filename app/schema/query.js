module.exports = {
    insert : (con, table, value) => {
        return new Promise((resolve) => {
            console.log(`INSERT INTO ${table} VALUES (${value})`);
            con.query(`INSERT INTO ${table} VALUES (${value})`,  function(err, results) {
                if (err) throw err;
                resolve(results);
            });
        });
    },

    showColumn: (con, table) => {
      return new Promise((resolve) => {
          con.query(`SHOW FULL COLUMNS FROM ${table}`,  function(err, results) {
              if (err) throw err;
              resolve(results);
          });
      });
    },

    showGroupCount: (con, table, group) => {
        return new Promise((resolve) => {
            con.query(`SELECT COUNT(*) FROM ${table} GROUP BY ${group}`, function (err, results) {
                if (err) throw err;
                resolve(results);
            })
        })
    },

    select: (con, table, condition) => {
        return new Promise((resolve) => {
            con.query(`SELECT * FROM ${table} WHERE ${condition}`, function (err, results) {
                if (err) throw err;
                resolve(results);
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

    selectByOrder: (con, table, order) => {
        return new Promise((resolve) => {
            con.query(`SELECT * FROM ${table} ORDER BY ${order}`, function (err, results) {
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
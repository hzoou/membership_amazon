const express = require('express');
const router = express.Router();
const mysql = require('mysql-ssh');
const multer = require('multer');
const upload = multer({ dest: './app/public/static_root/' });

router.get('/', function(req, res) {
    res.render('admin.html');
});

router.get('/:table', function(req, res) {
    const table = req.params.table;
    const result = {};
    mysql.connect(
        {
            host: '106.10.56.165',
            user: 'hzoou',
            password: 'boostcamp2019'
        },
        {
            host: '127.0.0.1',
            user: 'hzoou',
            password: 'boostcamp2019',
            database: 'membership_amazon'
        }
    ).then(client => {
        client.query(`SHOW FULL COLUMNS FROM ${table}`, function (err, fields) {
            if (err) throw err;
            result['column'] = fields;
        });
        client.query(`SELECT * FROM ${table}`, function (err, results) {
            if (err) throw err;
            mysql.close();
            result['data'] = results;
            res.send(result);
        })
    }).catch(err => {
        console.log(err)
    });
});

router.delete('/:table/:idx', function(req, res) {
    const table = req.params.table;
    const idx = req.params.idx;
    mysql.connect(
        {
            host: '106.10.56.165',
            user: 'hzoou',
            password: 'boostcamp2019'
        },
        {
            host: '127.0.0.1',
            user: 'hzoou',
            password: 'boostcamp2019',
            database: 'membership_amazon'
        }
    ).then(client => {
        client.query(`DELETE FROM ${table} WHERE idx=${idx}`, function (err) {
            if (err) throw err;
            mysql.close();
            res.status(200).send({status: 'SUCCESS'});
        })
    }).catch(err => {
        console.log(err)
    });
});

module.exports = router;
const db = require('../database/connection');
const table = require('../schema/table');

module.exports = {
    selectAll: (req, res) => {
        const result = {};
        db.connect()
            .then(async (client) => {
                result['column'] = await table.showColumn(client, req.params.table);
                result['data'] = await table.selectAll(client, req.params.table);
                res.send(result);
                db.close();
            })
            .catch(err => {
                console.log(err)
            });
    },
    deleteColumn: (req, res) => {
        db.connect()
            .then(async (client) => {
                await table.delete(client, req.params.table, `idx=${req.params.idx}`);
                res.status(200).send({status: 'SUCCESS'});
                db.close();
            })
            .catch(err => {
                console.log(err)
            });
    },
    updateColumn: (req, res) => {
        let value = '';
        Object.keys(req.body).forEach((b) => value += `${b}='${req.body[b]}',`);
        value += `image='static_root/${req.file.filename}'`;
        db.connect()
            .then(async (client) => {
                await table.update(client, req.params.table, `idx=${req.params.idx}`, value);
                res.status(200).send({status: 'SUCCESS'});
                db.close();
            })
            .catch(err => {
                console.log(err)
            });
    }
};
const db = require('../database/connection').connect();
const table = require('../schema/table');

module.exports = {
    selectAll: async (req, res) => {
        const result = {};
        result['column'] = await table.showColumn(db, req.params.table);
        result['data'] = await table.selectAll(db, req.params.table);
        res.send(result);
    },
    deleteColumn: async (req, res) => {
        await table.delete(db, req.params.table, `idx=${req.params.idx}`);
        res.status(200).send({status: 'SUCCESS'});
    },
    updateColumn: async (req, res) => {
        let value = '';
        Object.keys(req.body).forEach((b) => value += `${b}='${req.body[b]}',`);
        value += `image='static_root/${req.file.filename}'`;
        await table.update(db, req.params.table, `idx=${req.params.idx}`, value);
        res.status(200).send({status: 'SUCCESS'});
    }
};
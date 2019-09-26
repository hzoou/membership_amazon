const db = require('../database/connection').connect();
const table = require('../schema/query');

module.exports = {
    insertData: async (req, res) => {
        let value = 'NUll,';
        if (req.file) value += `'static_root/${req.file.filename}',`;
        Object.keys(req.body).forEach((b) => value += `'${req.body[b]}',`);
        value = value.slice(0, -1);
        await table.insert(db, req.params.table, value);
        res.status(200).send({status: 'SUCCESS'});
    },

    getAllData: async (req, res) => {
        const result = {};
        result['column'] = await table.showColumn(db, req.params.table);
        result['data'] = await table.selectAll(db, req.params.table);
        res.send(result);
    },

    deleteData: async (req, res) => {
        await table.delete(db, req.params.table, `idx=${req.params.idx}`);
        res.status(200).send({status: 'SUCCESS'});
    },

    updateData: async (req, res) => {
        let value = '';
        Object.keys(req.body).forEach((b) => value += `${b}='${req.body[b]}',`);
        if (req.file) value += `image='static_root/${req.file.filename}'`;
        else value = value.slice(0, -1);
        await table.update(db, req.params.table, `idx=${req.params.idx}`, value);
        res.status(200).send({status: 'SUCCESS'});
    }
};
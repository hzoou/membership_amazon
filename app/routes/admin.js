const express = require('express');
const router = express.Router();
const multer = require('../middlewares/multer');
const table = require('../models/table');

router.get('/', function(req, res) {
    res.render('admin.html');
});

router.get('/:table', function(req, res) {
    table.selectAll(req, res);
});

router.delete('/:table/:idx', function(req, res) {
    table.deleteColumn(req, res);
});

router.put('/:table/:idx', multer.single('image'), function(req, res){
    table.updateColumn(req, res);
});

module.exports = router;
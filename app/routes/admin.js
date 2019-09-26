const express = require('express');
const router = express.Router();
const multer = require('../middlewares/multer');
const admin = require('../models/table');

router.get('/', function(req, res) {
    res.render('admin.html');
});

router.put('/:table', multer.single('image'), function(req, res) {
    admin.insertData(req, res);
});

router.get('/:table', function(req, res) {
    admin.getAllData(req, res);
});

router.delete('/:table/:idx', function(req, res) {
    admin.deleteData(req, res);
});

router.put('/:table/:idx', multer.single('image'), function(req, res){
    admin.updateData(req, res);
});

module.exports = router;
const express = require('express');
const router = express.Router();
const multer = require('../middlewares/multer');
const Admin = require('../models/table');
const auth = require('../middlewares/auth');

router.get('/', function(req, res) {
    if (auth.isAdmin(req)) res.render('admin.html');
    else res.send('<script type="text/javascript">alert("권한이 없습니다.");window.location.href="./signin";</script>');
});

router.put('/:table', multer.single('image'), function(req, res) {
    Admin.insertData(req, res);
});

router.get('/:table', function(req, res) {
    Admin.getAllData(req, res);
});

router.delete('/:table/:idx', function(req, res) {
    Admin.deleteData(req, res);
});

router.put('/:table/:idx', multer.single('image'), function(req, res){
    Admin.updateData(req, res);
});

module.exports = router;
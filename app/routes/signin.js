const express = require('express');
const router = express.Router();
const user = require('../models/user');

/* GET home page. */
router.get('/', function(req, res) {
    res.render('signin.html');
});

router.post('/', (req, res) => {
    user.isHaveId(req, res);
});


module.exports = router;

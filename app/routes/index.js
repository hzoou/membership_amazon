const express = require('express');
const router = express.Router();
const carousel = require('../models/carousel');

router.get('/', function(req, res) {
  res.render('index.html');
});

router.get('/main', function (req, res) {
  carousel.getMainCarouselData(req, res);
});

router.get('/mini', function (req, res) {
  carousel.getMiniCarouselData(req, res);
});

module.exports = router;

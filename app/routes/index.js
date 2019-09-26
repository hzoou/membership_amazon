const express = require('express');
const router = express.Router();
const Carousel = require('../models/carousel');

router.get('/', function(req, res) {
  res.render('index.html');
});

router.get('/main', function (req, res) {
  Carousel.getMainCarouselData(req, res);
});

router.get('/mini', function (req, res) {
  Carousel.getMiniCarouselData(req, res);
});

module.exports = router;

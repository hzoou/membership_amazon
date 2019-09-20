const cookieParser = require('cookie-parser');
const express = require('express');
const path = require('path');
const app = express();

app.use(cookieParser());
app.use(express.urlencoded({extended: false}));
const dirPath = __dirname;
app.use(express.static(path.join(dirPath.replace("/server", "/client"))));

module.exports = app;
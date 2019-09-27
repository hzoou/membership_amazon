const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const flash = require('connect-flash');

const session = require('./middlewares/session');
const passport = require('./middlewares/passport');

const indexRouter = require('./routes/index');
const signinRouter = require('./routes/signin');
const logoutRouter = require('./routes/logout');
const adminRouter = require('./routes/admin');

const app = express();

app.use(session);
app.use(flash());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(passport.initialize());
app.use(passport.session());

app.post('/signin',
    passport.authenticate('local', {
        successRedirect: '/admin',
        failureRedirect: '/error',
        failureFlash: true })
);

app.use('/', indexRouter);
app.use('/signin', signinRouter);
app.use('/admin', adminRouter);
app.use('/logout', logoutRouter);
app.get('/error', (req, res) => {
    res.send('<script type="text/javascript">alert("아이디 또는 비밀번호를 확인해주세요.");window.location.href="./signin";</script>')
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  res.send('<script type="text/javascript">alert(err.message);window.location.href="./";</script>');
});

module.exports = app;

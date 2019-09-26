const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const indexRouter = require('./routes/index');
const signinRouter = require('./routes/signin');
const logoutRouter = require('./routes/logout');
const adminRouter = require('./routes/admin');


const flash = require('connect-flash');
const session = require('express-session');
const User = require('./models/user');
const FileStore = require('session-file-store')(session);

const app = express();


app.use(session({
  secret: 'secret-code',
  resave: false,
  saveUninitialized: true,
  store: new FileStore()
}));

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

app.use(flash());

// view engine setup
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

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(async function(id, done) {
    const user = await User.isAdmin(id);
    if (user) done(null, user);
    else done(null, false);
});

passport.use(new LocalStrategy({
      usernameField: 'id',
      passwordField: 'pw'
    },
    async function(id, pw, done) {
      const user = await User.isHaveId(id);
      if (!user) return done(null, false, { message: '아이디가 존재하지 않습니다.' });
      if (!User.isCorrectPw(pw)) return done(null, false, { message: '비밀번호가 일치하지 않습니다.' });
      return done(null, user);
    }
));

app.post('/signin',
    passport.authenticate('local', {
      successRedirect: '/admin',
      failureRedirect: '/signin',
      failureFlash: true })
);

app.use('/', indexRouter);
app.use('/signin', signinRouter);
app.use('/admin', adminRouter);
app.use('/logout', logoutRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  res.send('<script type="text/javascript">alert(err.message);window.location.href="./";</script>');
});

module.exports = app;

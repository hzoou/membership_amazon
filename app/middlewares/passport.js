const User = require('../models/user');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(async function(id, done) {
    const user = await User.isAdmin(id);
    if (user) done(null, user);
    else done(null, false);
});

passport.use(new LocalStrategy({ usernameField: 'id', passwordField: 'pw'},
    async function(id, pw, done) {
        const user = await User.isHaveId(id);
        if (!user) return done(null, false, { message: '아이디가 존재하지 않습니다.' });
        if (!User.isCorrectPw(pw)) return done(null, false, { message: '비밀번호가 일치하지 않습니다.' });
        return done(null, user);
    }
));

module.exports = passport;
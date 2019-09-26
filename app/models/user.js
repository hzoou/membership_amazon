const db = require('../database/connection').connect();
const user = require('../schema/query');

module.exports =  {
    isHaveId: async (id) => {
        this.user = (await user.select(db, 'user', `id='${id}'`))[0];
        return this.user;
    },
    isCorrectPw: (pw) => {
        return pw == this.user.pw;
    },
    isAdmin: async (id) => {
        this.user = (await user.select(db, 'user', `id='${id}' AND authentic = 1`))[0];
        return this.user;
    }
};
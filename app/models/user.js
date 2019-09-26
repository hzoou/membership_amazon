const db = require('../database/connection').connect();
const user = require('../schema/query');

const User = {
    isHaveId: async (req, res) => {
        this.user = (await user.select(db, 'user', `id='${req.body.id}'`))[0];
        if (!this.user) return res.status(200).send({status: "FAIL", msg: "아이디가 존재하지 않습니다."});
        User.isCorrectPw(req, res);
    },
    isCorrectPw: (req, res) => {
        if (req.body.pw == this.user.pw) res.status(200).send({ status: "SUCCESS", msg: "로그인 완료" });
        else res.status(200).send({status: "FAIL", msg: "비밀번호가 일치하지 않습니다."});
    }
};

module.exports = User;
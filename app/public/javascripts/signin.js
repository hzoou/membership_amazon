const signIn = {
    init() {
        this.id = document.querySelector('#id');
        this.pw = document.querySelector('#pw');
        this.submitBtn = document.querySelector('#submit');
        this.attachEvent();
    },

    validation: {
        'id': {
            confirm: false,
            msg: '아이디를 입력해주세요.'
        },
        'pw': {
            confirm: false,
            msg: '비밀번호를 입력해주세요.'
        }
    },

    elements: {
        id: '',
        pw: '',
        submitBtn: ''
    },

    attachEvent() {
        this.id.addEventListener("keyup", this.check.bind(this));
        this.pw.addEventListener("keyup", this.check.bind(this));
        this.submitBtn.addEventListener("click", this.signIn.bind(this));
    },

    signIn() {
        if (!Object.values(this.validation).every((v) => v.confirm === true)) {
            const element = (Object.values(this.validation).find((e) => !e.confirm));
            alert(element.msg);
        }
    },

    check(e) {
        this.validation[e.target.id].confirm = (!!e.target.value)
    }
};

window.addEventListener('DOMContentLoaded', signIn.init());
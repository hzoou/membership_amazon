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

    fetchAPI(uri, method, body) {
        return fetch(uri, {
            method: method,
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(body)
        }).then((res) => {
            if (res.ok) return res.json();
            throw new Error('Network response was not ok.');
        }).then((data) => {
            return data;
        }).catch((err) => {
            return alert(err.message);
        });
    },

    attachEvent() {
        this.id.addEventListener("blur", this.check.bind(this));
        this.pw.addEventListener("blur", this.check.bind(this));
        this.submitBtn.addEventListener("click", this.signIn.bind(this));
    },

    async signIn() {
        if (Object.values(this.validation).every((v) => v.confirm === true)) {
            this.body = { id: this.id.value, pw: this.pw.value };
            this.res = await this.fetchAPI('/signin', 'POST', this.body);
            if (this.res.status == "FAIL") alert(this.res.msg);
            else self.location.href = './';
        } else {
            const element = (Object.values(this.validation).find((e) => !e.confirm));
            alert(element.msg);
        }
    },

    check(e) {
        this.validation[e.target.id].confirm = (!!e.target.value)
    }
};

window.addEventListener('DOMContentLoaded', signIn.init());
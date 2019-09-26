class Table {
    constructor(tableName) {
        this.tableName = tableName;
    }

    render() {
        return `Welcome to Admin Page`;
    }

    async afterRender() {
        if (!this.tableName) return;
        this.result = await this.fetchAPI(`./admin/${this.tableName}`, 'GET');
        this.makeTitle();
        this.makeTable();
        this.attachEvent();
    }

    fetchAPI(uri, method, body) {
        return fetch(uri, {
            method: method,
            body: body
        }).then((res) => {
            if (res.ok) return res.json();
            throw new Error('Network response was not ok.');
        }).then((data) => {
            return data;
        }).catch((err) => {
            return alert(err.message);
        });
    }

    makeTitle() {
        this.title = document.querySelector('.title');
        if (this.tableName != 'user') this.title.innerHTML = `<b>${this.tableName.toUpperCase()}</b> TABLE <img src="../../images/add.png" class="add">`;
        else this.title.innerHTML = `<b>${this.tableName.toUpperCase()}</b> TABLE`;
    }

    makeTable() {
        this.container = document.querySelector('.content');
        this.column = Object.values(this.result['column']).map((col) => col['Field']);
        const tableData = this.result['data'].map((d) => {
            return `<tr id="${d['idx']}">` +
                this.column.map((c, i) => {
                    if (this.column[i] == 'image') return `<td><img src="../../${d[c]}" class="image"></td>`;
                    if (this.column[i] == 'color') return `<td style="color:${d[c]}">${d[c]}</td>`;
                    return `<td>${d[c]}</td>`;
                }) +
                `
                <td><img src="../../images/edit.png" class="edit"></td>
                <td><img src="../../images/remove.png" class="remove"></td>
            </tr>`;
        });
        this.container.innerHTML = `
            <tr class="column">${this.column.map((c) => `<th>${c}</th>`)}<th>Edit</th><th>Remove</th></tr>
            ${tableData}
        `;
        this.container.lastChild.remove();
    }

    attachEvent() {
        this.editHandler = this.editData.bind(this);
        this.removeHandler = this.removeData.bind(this);
        this.addHandler = this.addData.bind(this);
        this.edits = document.querySelectorAll('.edit');
        this.edits.forEach((e) => e.addEventListener('click', this.editHandler));
        this.removes = document.querySelectorAll('.remove');
        this.removes.forEach((e) => e.addEventListener('click', this.removeHandler));
        this.add = document.querySelector('.add');
        if (this.add) this.add.addEventListener('click', this.addHandler);
    }

    addData() {
        this.add.removeEventListener('click', this.addHandler);
        this.th = document.querySelector('.column');
        this.tr = document.createElement('tr');
        for (let i = 0; i < this.th.children.length; i++) {
            this.td = document.createElement('td');
            if (i == this.th.children.length -1) this.appendTd();
            else if (!this.column[i]) this.appendImgToTd();
            else if (this.column[i] == 'idx') this.appendTd();
            else if (this.column[i] == 'image') this.appendFileToTd();
            else if (this.column[i] == 'authentic') this.appendNumberToTd(0, 1, 0);
            else this.appendTextareaToTd();
        }
        this.th.after(this.tr);
        this.attachEventToTextarea();
        this.check = document.querySelector('.check');
        this.check.addEventListener('click', this.addComplete.bind(this));
    }

    addComplete(e) {
        this.selectedRow = e.target.parentNode.parentNode;
        this.selectedColumns = this.selectedRow.children;
        this.setFormData();
        this.confirm = confirm('등록하시겠습니까?');
        if (this.confirm) this.availableFetch(`./admin/${this.tableName}`);
    }

    async availableFetch(uri) {
        if (this.checkValidation()) {
            this.res = await this.fetchAPI(uri, 'put', this.formData);
            if (this.res.status == 'SUCCESS') location.reload();
        } else alert('항목을 다 채워주세요.');
    }

    setFormData() {
        this.validate = [];
        this.selectedIndex = this.selectedRow.getAttribute('id');
        this.formData = new FormData();
        Array.from(this.selectedColumns).forEach((c, i) => {
            if (i == 0 || i >= this.selectedColumns.length - 2) return;
            if (this.column[i] == 'id' || this.column[i] == 'pw') return;
            this.validate.push(this.checkValue(c.firstChild));
            if (this.column[i] == 'image') this.formData.append(this.column[i], c.firstChild.files[0]);
            else this.formData.append(this.column[i], c.firstChild.value);
        });
    }

    editData(e) {
        this.edit = e.target;
        this.edit.removeEventListener('click', this.editHandler);
        this.selectedRow = e.target.parentNode.parentNode;
        this.selectedColumns = this.selectedRow.children;
        Array.from(this.selectedColumns).forEach((c, i) => {
            if (i == 0 || i >= this.selectedColumns.length - 2) return;
            if (this.column[i] == 'id' || this.column[i] == 'pw') return;
            if (this.column[i] == 'image') c.innerHTML = `<input type='file'/>`;
            else if (this.column[i] == 'authentic') c.innerHTML = `<input type='number' min="0" max="1" value="${c.textContent}"/>`;
            else c.innerHTML = `<textarea>${c.textContent}</textarea>`;
        });
        this.attachEventToTextarea();
        this.edit.setAttribute('src', '../../images/check.png');
        this.edit.addEventListener('click', this.editComplete.bind(this));
    }

    attachEventToTextarea() {
        this.textareas = document.querySelectorAll('textarea');
        this.textareas.forEach((t) => t.addEventListener('focus', this.resizeHeight));
        this.textareas.forEach((t) => t.addEventListener('keydown', this.resizeHeight));
        this.textareas.forEach((t) => t.addEventListener('keyup', this.resizeHeight));
    }

    resizeHeight(e) {
        e.target.style.height = "1px";
        e.target.style.height = `${12 + e.target.scrollHeight}px`;
    }

    appendTd() {
        this.tr.appendChild(this.td);
    }

    appendImgToTd() {
        const img = document.createElement('img');
        img.className = 'check';
        img.src = '../../images/check.png';
        this.td.appendChild(img);
        this.tr.appendChild(this.td);
    }

    appendFileToTd() {
        const input = document.createElement('input');
        input.type = 'file';
        this.td.appendChild(input);
        this.tr.appendChild(this.td);
    }

    appendNumberToTd(min, max, value) {
        const input = document.createElement('input');
        input.type = 'number';
        input.min = min;
        input.max = max;
        input.value = value;
        this.td.appendChild(input);
        this.tr.appendChild(this.td);
    }

    appendTextareaToTd() {
        const textarea =document.createElement('textarea');
        this.td.appendChild(textarea);
        this.tr.appendChild(this.td);
    }

    editComplete() {
        this.setFormData();
        this.confirm = confirm('수정하시겠습니까?\n수정 후에는 복구할 수 없습니다.');
        if (this.confirm) this.availableFetch(`./admin/${this.tableName}/${this.selectedIndex}`);
    }

    async removeData(e) {
        this.selectedRow = e.target.parentNode.parentNode;
        this.selectedIndex = this.selectedRow.getAttribute('id');
        this.confirm = confirm('삭제하시겠습니까?\n삭제 후에는 복구할 수 없습니다.');
        if (this.confirm) {
            this.res = await this.fetchAPI(`./admin/${this.tableName}/${this.selectedIndex}`, 'delete');
            if (this.res.status == 'SUCCESS') location.reload();
        }
    }

    checkValue(target) {
        if (target.files && !target.files.length) return false;
        if (!target.value) return false;
        return true;
    }

    checkValidation() {
        return this.validate.every((b) => b);
    }
}

export default Table;
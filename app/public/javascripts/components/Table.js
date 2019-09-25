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
        this.title.innerHTML = `<b>${this.tableName.toUpperCase()}</b> TABLE <img src="../../images/add.png" class="add">`;
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
        this.edits = document.querySelectorAll('.edit');
        this.editHandler = this.editData.bind(this);
        this.removeHandler = this.removeData.bind(this);
        this.edits.forEach((e) => e.addEventListener('click', this.editHandler));
        this.removes = document.querySelectorAll('.remove');
        this.removes.forEach((e) => e.addEventListener('click', this.removeHandler));
    }

    editData(e) {
        this.edit = e.target;
        this.edit.removeEventListener('click', this.editHandler);
        this.selectedRow = e.target.parentNode.parentNode;
        this.selectedColumns = this.selectedRow.children;
        Array.from(this.selectedColumns).forEach((c, i) => {
            if (i == 0) return;
            if (i >= this.selectedColumns.length - 2) return;
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

    async editComplete() {
        this.selectedIndex = this.selectedRow.getAttribute('id');
        this.formData = new FormData();
        Array.from(this.selectedColumns).forEach((c, i) => {
            if (i == 0) return;
            if (i >= this.selectedColumns.length - 2) return;
            if (this.column[i] == 'image') this.formData.append(this.column[i], c.firstChild.files[0]);
            else this.formData.append(this.column[i], c.firstChild.value);
        });
        this.confirm = confirm('수정하시겠습니까?\n수정 후에는 복구할 수 없습니다.');
        if (this.confirm) {
            this.d = await this.fetchAPI(`./admin/${this.tableName}/${this.selectedIndex}`, 'put', this.formData);
            if (this.d.status == 'SUCCESS') location.reload();
        }
    }

    async removeData(e) {
        this.selectedRow = e.target.parentNode.parentNode;
        this.selectedIndex = this.selectedRow.getAttribute('id');
        this.confirm = confirm('삭제하시겠습니까?\n삭제 후에는 복구할 수 없습니다.');
        if (this.confirm) {
            this.d = await this.fetchAPI(`./admin/${this.tableName}/${this.selectedIndex}`, 'delete');
            if (this.d.status == 'SUCCESS') location.reload();
        }
    }
}

export default Table;
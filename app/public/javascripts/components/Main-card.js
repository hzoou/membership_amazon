class MainCard {
    constructor() {

    }

    render() {
        return `
                <div class="main-card">
                </div>
                <div class="main-carousel">
                    <div class="main-carousel-container">
                        <div class="main-carousel-control">
                            <button class="main-prev"></button>
                        </div>
                        <div class="main-carousel-content">
                            <div class="main-carousel-item-container"></div>
                        </div>
                        <div class="main-carousel-control">
                            <button class="main-next"></button>
                        </div>
                    </div>
                </div>
                `
    }

    async afterRender() {
        this.result = await this.fetchAPI(`./main`, 'GET');
        this.category = this.result['category'];
        this.data = this.result['data'];
        this.getDOM();
        this.makeCard();
        this.init();
        this.insertIndicator();
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

    makeCard() {
        this.card = '';
        Object.values(this.category).forEach((c, i) => {
            if (i == 0) this.card += `<div class="card clicked rightShadow" style="background-image: url('${c['image']}'); background-color: ${c['color']}">
                                        <div class="card-title">${c['name']}</div>
                                        <div class="card-indicator-container selected"><div class="card-indicators"></div></div></div>`;
            else this.card += `<div class="card" style="background-image: url('${c['image']}'); background-color: ${c['color']}">
                                    <div class="card-title">${c['name']}</div>
                                    <div class="card-indicator-container"><div class="card-indicators"></div></div></div>`;
        });
        this.cardContainer.innerHTML = this.card;
    }

    getDOM() {
        this.cardContainer = document.querySelector('.main-card');
        this.makeCard();
        this.carousel = document.querySelector('.main-carousel-container');
        this.container = this.carousel.querySelector('.main-carousel-item-container');
        this.container.innerHTML = this.insertItem(this.makeItemOrder());
        this.container.childNodes.forEach((d) => { if (d.nodeName === '#text') d.remove()} );
        this.item = this.carousel.querySelector('.main-carousel-item');
        this.items = this.carousel.querySelectorAll('.main-carousel-item');
        this.prev = this.carousel.querySelector('.main-prev');
        this.next = this.carousel.querySelector('.main-next');
    }

    insertItem(order) {
        const colors = [];
        Object.values(this.category).forEach((c) => colors.push(c['color']));
        return order.map((o) => {
            return `<div class="main-carousel-item" data-id="${o}" style="background-image:url(${this.data[o].image})">
                        <div class="main-carousel-item-content">
                            <div class="title-container"><span class="title" style="background-color: ${colors[(this.data[o].category_idx) - 1]}">${this.data[o].keyword}</span></div>
                            <div class="head">${this.data[o].title}</div>
                            <div class="body">${this.data[o].subtitle}</div>
                            <div class="link">
                                <a href=${this.data[o].link}>${this.data[o].linktitle}
                                    <img class="arrow" src="https://i.imgur.com/jEz38Eo.png">
                                </a>
                            </div>
                        </div>
                    </div>`
        })
    }

    makeItemOrder() {
        this.categoryLength = [];
        this.initIndex = 0;
        Object.values(this.result['categoryCnt']).forEach((c) => Object.values(c).forEach((cnt) => this.categoryLength.push(cnt)));
        this.itemLength = this.data.length;
        this.children = [];
        for (let i = 0; i < this.itemLength; i++) this.children.push(i);
        this.itemHalfLength = Math.floor(this.itemLength / 2);
        this.leftChildren = this.children.splice(0, this.initIndex);
        this.extraChildren = this.children;
        this.rightChildren = this.extraChildren.splice(0, this.itemHalfLength);
        this.itemHalfLength = this.extraChildren.length;
        this.children = (this.extraChildren.concat(this.leftChildren)).concat(this.rightChildren);
        return this.children;
    }

    insertIndicator() {
        let cnt = 0;
        this.cardIndicators = document.querySelectorAll('.card-indicators');
        this.categoryLength.forEach((c, i) => { for (let j = 0; j < c; j++) {
            this.cardIndicators[i].innerHTML += `<div class="indicator" data-id="${cnt++}"></div>`;
        }});
        document.querySelector('.indicator').classList.add('pushed');
    }

    init() {
        this.diff = 0;
        this.itemWidth = this.item.offsetWidth;
        this.itemLength = this.items.length;
        this.offset = -this.itemWidth;
        this.standardPosition = -(this.itemWidth * this.itemHalfLength);
        this.container.style.width = `${this.itemWidth * this.itemLength}px`;
        this.container.style.height = `${this.item.offsetHeight}px`;
        this.container.style.transition = 'transform 0s ease 0s';
        this.container.style.transform = `translate(${this.standardPosition}px, 0)`;
    }

    attachEvent() {
        this.cardContainer.addEventListener('click', this.click.bind(this));
        this.container.addEventListener('transitionend', this.moveWithoutAnimation.bind(this));
        this.prev.addEventListener('click', this.moveToPrev.bind(this));
        this.next.addEventListener('click', this.moveToNext.bind(this));
    }

    moveToPrev() {
        this.offset = (!!this.diff) ? this.itemWidth * this.diff : -this.itemWidth;
        this.reverse = true;
        this.move();
    }

    moveToNext() {
        this.offset = (!!this.diff) ? this.itemWidth * this.diff : this.itemWidth;
        this.reverse = false;
        this.move();
    }

    move() {
        if (Math.abs(this.diff) > 5) this.sec = 100 * Math.abs(this.diff);
        else this.sec = (!!this.diff) ? 130 * Math.abs(this.diff) : 200;
        this.container.style.transition = `transform ${this.sec}ms ease-out`;
        this.container.style.transform = `translate(${this.standardPosition - this.offset}px, 0)`;
    }

    moveWithoutAnimation() {
        this.changeItemOrder();
        this.container.style.transition = 'transform 0ms';
        this.container.style.transform = `translate(${this.standardPosition}px, 0)`;
        this.changeCard();
    }

    changeItemOrder() {
        if (this.reverse) {
            for (let i = this.diff + 1; i < 0; i++) this.moveToPrevItemOrder();
            this.moveToPrevItemOrder();
        } else {
            for (let i = 0; i < this.diff - 1; i++) this.moveToNextItemOrder();
            this.moveToNextItemOrder();
        }
        this.diff = 0;
    }

    moveToNextItemOrder() {
        const firstChild = this.container.firstElementChild;
        this.container.removeChild(firstChild);
        this.container.appendChild(firstChild);
    }

    moveToPrevItemOrder() {
        const lastChild = this.container.lastElementChild;
        this.container.removeChild(lastChild);
        this.container.prepend(lastChild);
    }

    click(e) {
        if (!!Array.from(e.target.classList).includes('card')) this.clickCard(e.target, 'handler');
        else if (!!Array.from(e.target.classList).includes('card-title')) this.clickCard(e.target.parentNode, 'handler');
        else if (!!Array.from(e.target.classList).includes('indicator')) this.clickIndicator(this.items, e.target, 'handler');
    }

    clickCard(target, flag) {
        this.overwriteClass('clicked', target);
        this.deleteShadowClass();
        const prevCard = target.previousElementSibling;
        const nextCard = target.nextElementSibling;
        if (prevCard && nextCard) target.classList.add('allShadow');
        else if (prevCard) target.classList.add('leftShadow');
        else if (nextCard) target.classList.add('rightShadow');
        this.visibleIndicator(target, flag);
    }

    deleteShadowClass() {
        const shadowClass = ['leftShadow', 'rightShadow', 'allShadow'];
        shadowClass.forEach((s) => {
            const shadow = document.querySelector(`.${s}`);
            if (shadow) shadow.classList.remove(`${s}`);
        });
    }

    visibleIndicator(target, flag) {
        const indicators = target.lastElementChild;
        const firstIndicator = indicators.firstElementChild.firstElementChild;
        this.overwriteClass('selected', indicators);
        if (flag) this.clickIndicator(this.items, firstIndicator, flag);
        else this.clickIndicator(indicators.firstElementChild.childNodes, this.currentItem);
    }

    clickIndicator(list, target, flag) {
        list.forEach((i) => {
            if (i.dataset.id == target.dataset.id) {
                if (flag) { this.overwriteClass('pushed', target); this.moveByDiff(i); }
                else this.overwriteClass('pushed', i);
            }
        });
    }

    moveByDiff(item) {
        const nth = this.getItemIndex(item);
        this.diff = nth - this.itemHalfLength;
        if (this.diff < 0) this.moveToPrev();
        else if (this.diff > 0) this.moveToNext();
    }

    getItemIndex(item) {
        for (let i = 0; i < item.parentNode.childNodes.length; i++) {
            if (item.parentNode.childNodes[i] === item) return i;
        }
    }

    changeCard() {
        this.currentItem = this.container.children[this.itemHalfLength];
        this.needCard = this.getNeedCardIdx(this.currentItem.dataset.id);
        this.clickCard(this.needCard);
    }

    getNeedCardIdx(id) {
        let idx, len = 0;
        for (idx = 0; idx < this.categoryLength.length; idx++) {
            len += this.categoryLength[idx];
            if (id < len) break;
        }
        return this.cardContainer.children[idx];
    }

    overwriteClass(name, target) {
        const element = document.querySelector(`.${name}`);
        element.classList.remove(name);
        target.classList.add(name);
    }
}

export default MainCard;
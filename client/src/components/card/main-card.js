import MainCardData from "../../data/main-card.js";

class MainCard {
    constructor() {
        this.data = MainCardData;
    }

    render() {
        return `
                <div class="main-card">
                    <div class="card ship clicked rightShadow">
                        <div class="card-title">Ship</div>
                        <div class="card-indicator-container selected"><div class="card-indicators"></div></div>
                    </div>
                    <div class="card stream">
                        <div class="card-title">Stream</div>
                        <div class="card-indicator-container"><div class="card-indicators"></div></div>
                    </div>
                    <div class="card shop">
                        <div class="card-title">Shop</div>
                        <div class="card-indicator-container"><div class="card-indicators"></div></div>
                    </div>
                    <div class="card read">
                        <div class="card-title">Read</div>
                        <div class="card-indicator-container"><div class="card-indicators"></div></div>
                    </div>
                    <div class="card more">
                        <div class="card-title">More</div>
                        <div class="card-indicator-container"><div class="card-indicators"></div></div>
                    </div>
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

    getElementById() {
        this.cardIndicators = document.querySelectorAll('.card-indicators');
        this.cardContainer = document.querySelector('.main-card');
        this.carousel = document.querySelector('.main-carousel-container');
        this.container = this.carousel.querySelector('.main-carousel-item-container');
        this.container.innerHTML = this.insertItem(this.makeItemOrder());
        this.container.childNodes.forEach((d) => {if (d.nodeName === '#text') d.remove()});
        this.item = this.carousel.querySelector('.main-carousel-item');
        this.items = this.carousel.querySelectorAll('.main-carousel-item');
        this.prev = this.carousel.querySelector('.main-prev');
        this.next = this.carousel.querySelector('.main-next');
        this.init();
        this.insertIndicator();
        this.attachEvent();
    }

    insertItem(order) {
        this.allData = [];
        const colors = ["#00A8E1", '#FF6138', '#E31F64', '#36C2B4', "#FFC400"];
        Object.values(this.data).forEach((value) => {value.forEach((d) => this.allData.push(d))});
        return order.map((o) => {
            return `<div class="main-carousel-item" data-set="${o}" style="background-image:url(${this.allData[o].image})">
                        <div class="main-carousel-item-content">
                            <div class="title-container"><span class="title" style="background-color: ${colors[this.allData[o].category]}">${this.allData[o].title}</span></div>
                            <div class="head">${this.allData[o].head}</div>
                            <div class="body">${this.allData[o].body}</div>
                            <div class="link">
                                <a href=${this.allData[o].link}>${this.allData[o].tail}
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
        this.itemLength = 0;
        Object.keys(this.data).forEach((d) => { this.itemLength += this.data[d].length; this.categoryLength.push(this.data[d].length)});
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
        this.categoryLength.forEach((c, i) => { for (let j = 0; j < c; j++) {
            if (cnt == 0) this.cardIndicators[i].innerHTML += `<div class="indicator pushed" data-set="${cnt++}"></div>`;
            else this.cardIndicators[i].innerHTML += `<div class="indicator" data-set="${cnt++}"></div>`;
        }});
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
        this.sec = (!!this.diff) ? 180 * this.diff * 1 : 180;
        if (this.sec < 0) this.sec *= -1;
        this.container.style.transition = `transform ${this.sec}ms ease-out`;
        this.container.style.transform = `translate(${this.standardPosition - this.offset}px, 0)`;
    }

    moveWithoutAnimation() {
        this.changeItemOrder();
        this.container.style.transition = 'transform 0ms';
        this.container.style.transform = `translate(-${this.itemWidth * this.itemHalfLength}px, 0)`;
    }

    changeItemOrder() {
        if (this.diff != 0) {
            if (this.reverse) {
                for (let i = this.diff; i < 0; i++) {
                    const lastChild = this.container.lastElementChild;
                    this.container.removeChild(lastChild);
                    this.container.prepend(lastChild);
                }
            } else {
                for (let i = 0; i < this.diff; i++) {
                    const firstChild = this.container.firstElementChild;
                    this.container.removeChild(firstChild);
                    this.container.appendChild(firstChild);
                }
            }
        } else {
            if (this.reverse) {
                const lastChild = this.container.lastElementChild;
                this.container.removeChild(lastChild);
                this.container.prepend(lastChild);
            } else {
                const firstChild = this.container.firstElementChild;
                this.container.removeChild(firstChild);
                this.container.appendChild(firstChild);
            }
        }
        this.diff = 0;
    }

    click(e) {
        if (!!Array.from(e.target.classList).includes('card')) this.clickCard(e);
        else if (!!Array.from(e.target.classList).includes('indicator')) this.clickIndicator(e);
    }

    clickCard(e) {
        const clicked = document.querySelector('.clicked');
        if (clicked) clicked.classList.remove('clicked');
        e.target.classList.add('clicked');
        this.deleteShadowClass();
        const prevCard = e.target.previousElementSibling;
        const nextCard = e.target.nextElementSibling;
        if (prevCard && nextCard) e.target.classList.add('allShadow');
        else if (prevCard) e.target.classList.add('leftShadow');
        else if (nextCard) e.target.classList.add('rightShadow');
        this.visibleIndicator(e);
    }

    deleteShadowClass() {
        const shadowClass = ['leftShadow', 'rightShadow', 'allShadow'];
        shadowClass.forEach((s) => {
            const shadow = document.querySelector(`.${s}`);
            if (shadow) shadow.classList.remove(`${s}`);
        });
    }

    visibleIndicator(e) {
        const indicators = e.target.lastElementChild;
        const firstIndicator = indicators.firstElementChild.firstElementChild;
        const selected = document.querySelector('.selected');
        if (selected) selected.classList.remove('selected');
        if (indicators) indicators.classList.add('selected');
        this.clickIndicator(firstIndicator);
    }

    clickIndicator(e) {
        this.items.forEach((i) => {
            const pushed = document.querySelector('.pushed');
            if (pushed) pushed.classList.remove('pushed');
            const target = (e.target) ? e.target : e;
            target.classList.add('pushed');
            if (i.dataset.set == target.dataset.set) {
                const nth = this.getItemIndex(i);
                this.diff = nth - this.itemHalfLength;
                if (this.diff < 0) this.moveToPrev();
                else if (this.diff > 0) this.moveToNext();
            }
        });
    }

    getItemIndex(item) {
        for(let i = 0; i < item.parentNode.childNodes.length; i++) {
            if (item.parentNode.childNodes[i] === item) return i;
        }
    }
}

export default MainCard;
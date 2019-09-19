import miniCarouselData from "../../data/mini-carousel.js";

class MiniCarousel {
    constructor() {
        this.data = miniCarouselData;
        this.sec = { run: 3, stop: 7 };
    }

    render() {
        return `<div class="carousel-container">
                    <div class="carousel-control">
                        <button class="prev">&lt;</button>
                    </div>
                    <div class="carousel-content">
                        <div class="carousel-item-container"></div>
                    </div>
                    <div class="carousel-control">
                        <button class="next">&gt;</button>
                    </div>
                </div>
                <div class="content-container">
                    <div class="content-title">Amazon Originals,<br>exclusively on Prime Video</div>
                    <div class="content-subtitle">Prime Video is the only place where you can watch Amazon<br>
                                                Original series like "The Marvelous Mrs. Maisel", "Tom Clancy's<br>
                                                Jack Ryan", "Homecoming", and "The Man in the High Castle".</div>
                    <div class="content-link">
                        <a class="a-link-normal" title="Explore Prime Video" href="/gp/video/storefront/ref=dvm_us_aq_np_dhb_be_optorigt1?ie=UTF8&amp;merchId=originals1">Explore Prime Video<img class="arrow" src="https://i.imgur.com/jEz38Eo.png"></a>
                    </div>
                </div>`;
    }

    getElementById() {
        this.carousel = document.querySelector('.carousel-container');
        this.container = this.carousel.querySelector('.carousel-item-container');
        this.container.innerHTML = this.insertItem(this.makeItemOrder());
        this.container.childNodes.forEach((d) => {if (d.nodeName === '#text') d.remove()});
        this.item = this.carousel.querySelector('.carousel-item');
        this.items = this.carousel.querySelectorAll('.carousel-item');
        this.prev = this.carousel.querySelector('.prev');
        this.next = this.carousel.querySelector('.next');
        this.init();
        this.attachEvent();
    }

    insertItem(order) {
        return (order.map((o) => `<div class="carousel-item" data-set="${o}"><a href="${this.data[o].link}"><img src="${this.data[o].image}"></a></div>`));
    }

    makeItemOrder() {
        this.initIndex = 0;
        this.children = [];
        this.itemLength = this.data.length;
        for (let i = 0; i < this.itemLength; i++) this.children.push(i);
        this.itemHalfLength = Math.floor(this.itemLength / 2);
        this.leftChildren = this.children.splice(0, this.initIndex);
        this.extraChildren = this.children;
        this.rightChildren = this.extraChildren.splice(0, this.itemHalfLength);
        this.itemHalfLength = this.extraChildren.length;
        this.children = (this.extraChildren.concat(this.leftChildren)).concat(this.rightChildren);
        return this.children;
    }

    init() {
        this.pushCnt = 0;
        this.timeoutCnt = 0;
        this.reverse = false;
        this.itemWidth = this.item.offsetWidth;
        this.itemLength = this.items.length;
        this.offset = -this.itemWidth;
        this.standardPosition = -(this.itemWidth * this.itemHalfLength);
        this.container.style.transition = 'transform 0s ease 0s';
        this.container.style.transform = `translate(${this.standardPosition}px, 0)`;
        this.interval = setInterval(this.moveToNext.bind(this), this.sec.run * 1000);
    }

    attachEvent() {
        this.container.addEventListener('transitionend', this.moveWithoutAnimation.bind(this));
        this.prev.addEventListener('click', this.moveToPrev.bind(this));
        this.prev.addEventListener('click', this.stopInterval.bind(this));
        this.next.addEventListener('click', this.moveToNext.bind(this));
        this.next.addEventListener('click', this.stopInterval.bind(this));
    }

    stopInterval() {
        this.pushCnt++;
        clearInterval(this.interval);
        setTimeout(() => {
            this.timeoutCnt--;
            if (this.timeoutCnt + this.pushCnt == 0) {
                this.interval = setInterval(this.moveToNext.bind(this), this.sec.run * 1000);
                this.pushCnt = 0;
                this.timeoutCnt = 0;
            }
        }, this.sec.stop * 1000);
    }

    moveToPrev() {
        this.offset = -this.itemWidth;
        this.reverse = true;
        this.move();
    }

    moveToNext() {
        this.offset = this.itemWidth;
        this.reverse = false;
        this.move();
    }

    move() {
        this.container.style.transition = `transform 200ms ease-out`;
        this.container.style.transform = `translate(${this.standardPosition - this.offset}px, 0)`;
    }

    moveWithoutAnimation() {
        this.changeItemOrder();
        this.container.style.transition = 'transform 0ms';
        this.container.style.transform = `translate(-${this.itemWidth * this.itemHalfLength}px, 0)`;
    }

    changeItemOrder() {
        const firstChild = this.container.firstElementChild;
        const lastChild = this.container.lastElementChild;
        if (this.reverse) {
            this.container.removeChild(lastChild);
            this.container.prepend(lastChild);
        } else {
            this.container.removeChild(firstChild);
            this.container.appendChild(firstChild);
        }
    }
}
export default MiniCarousel;
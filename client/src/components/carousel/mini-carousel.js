import miniCarouselData from "../../data/mini-carousel.js";

class MiniCarousel {
    constructor() {
        this.data = miniCarouselData;
        this.sec = { run: 3, stop: 9 };
    }

    render() {
        return `<div class="carousel-container">
                    <div class="carousel-control">
                        <button class="prev">&lt;</button>
                    </div>
                    <div class="carousel-content">
                        <div class="carousel-item-container">
                            ${this.data.map((d) => {
                                return `<div class="carousel-item"><a href="${d.link}"><img src="${d.image}"></a></div>`;
                            })}
                        </div>
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
        this.item = this.carousel.querySelector('.carousel-item');
        this.items = this.carousel.querySelectorAll('.carousel-item');
        this.prev = this.carousel.querySelector('.prev');
        this.next = this.carousel.querySelector('.next');
        this.init();
        this.attachEvent();
    }

    init() {
        this.itemWidth = this.item.offsetWidth;
        this.itemLength = this.items.length;
        this.offset = 0;
        this.currentItem = 1;
        this.insertClone();
        this.offset = -this.itemWidth;
        this.container.childNodes.forEach((d) => {if(d.nodeName === '#text') d.remove()});
        this.moveWithoutAnimation();
        this.interval = setInterval(this.moveToNext.bind(this), this.sec.run * 1000);
    }

    clearInterval() {
        clearInterval(this.interval);
        setTimeout(() => { this.interval = setInterval(this.moveToNext.bind(this), this.sec.run * 1000); }, this.sec.stop * 1000);
    }

    attachEvent() {
        this.prev.addEventListener('click', this.clearInterval.bind(this));
        this.prev.addEventListener('click', this.moveToPrev.bind(this));
        this.next.addEventListener('click', this.clearInterval.bind(this));
        this.next.addEventListener('click', this.moveToNext.bind(this));
    }

    insertClone() {
        const firstItem = this.items[0];
        const lastItem = this.items[this.itemLength - 1];
        this.container.insertBefore(lastItem.cloneNode(true), this.container.firstChild);
        this.container.appendChild(firstItem.cloneNode(true));
    }

    moveToPrev() {
        this.offset += this.itemWidth;
        this.move();
        this.currentItem--;
        if (this.isClone()) {
            this.offset -= this.itemLength * this.itemWidth;
            setTimeout(() => this.moveWithoutAnimation(), 200);
            this.currentItem = this.currentItem + this.itemLength;
        }
    }

    moveToNext() {
        this.offset -= this.itemWidth;
        this.move();
        this.currentItem++;
        if (this.isClone()) {
            this.offset += this.itemLength * this.itemWidth;
            setTimeout(() => this.moveWithoutAnimation(), 200);
            this.currentItem = this.currentItem - this.itemLength;
        }
    }

    isClone() {
        return this.currentItem === 0 || this.currentItem === this.itemLength + 1;
    }

    move() {
        this.container.style.transition = `transform 200ms ease-out`;
        this.container.style.transform = `translate(${this.offset}px, 0)`;
    }

    moveWithoutAnimation() {
        this.container.style.transition = 'none';
        this.container.style.transform = `translate(${this.offset}px, 0)`;
    }
}
export default MiniCarousel;
import miniCarouselData from "../../data/mini-carousel.js";

class MiniCarousel {
    constructor() {
        this.data = miniCarouselData;
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
}
export default MiniCarousel;
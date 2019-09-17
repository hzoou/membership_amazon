import MiniCarousel from "./src/components/carousel/mini-carousel.js";

const render = () => {
    const miniCarousel = new MiniCarousel();
    document.querySelector('.mini-carousel').innerHTML = miniCarousel.render();
};

window.addEventListener('DOMContentLoaded', render);
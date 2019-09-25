import MiniCarousel from "./components/Mini-carousel.js";
import MainCard from "./components/Main-card.js";

const render = () => {
    const mainCard = new MainCard();
    document.querySelector('.main').innerHTML = mainCard.render();
    mainCard.afterRender();

    const miniCarousel = new MiniCarousel();
    document.querySelector('.mini-carousel').innerHTML = miniCarousel.render();
    miniCarousel.afterRender();
};

document.addEventListener('DOMContentLoaded', render);
window.addEventListener('DOMContentLoaded', render);
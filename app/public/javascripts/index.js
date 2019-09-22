import MiniCarousel from "./components/mini-carousel.js";
import MainCard from "./components/main-card.js";

const render = () => {
    const mainCard = new MainCard();
    document.querySelector('.main').innerHTML = mainCard.render();
    mainCard.getElementById();

    const miniCarousel = new MiniCarousel();
    document.querySelector('.mini-carousel').innerHTML = miniCarousel.render();
    miniCarousel.getElementById();
};

document.addEventListener('DOMContentLoaded', render);
window.addEventListener('DOMContentLoaded', render);
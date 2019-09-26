import Table from "./components/Table.js";

const title = document.querySelector('.title');
const renderHtml = (page) => {
    title.innerHTML = page.render();
    page.afterRender();
};

const routes = {
    '': () => {
        renderHtml(new Table());
    },
    'user': () => {
        renderHtml(new Table('user'));
    },
    'category': () => {
        renderHtml(new Table('category'));
    },
    'mini_carousel': () => {
        renderHtml(new Table('mini_carousel'));
    },
    'main_carousel': () => {
        renderHtml(new Table('main_carousel'));
    },
    otherwise() {
    }
};

const router = () => {
    const hash = location.hash.replace('#', '');
    (routes[hash] || routes.otherwise)();
};

window.addEventListener('hashchange', router);
window.addEventListener('DOMContentLoaded', router);
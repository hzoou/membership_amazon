import Table from "./components/table.js";

const content = document.querySelector('.content');
const renderHtml = (page) => {
    content.innerHTML = page.render();
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
    'test': () => {
        renderHtml(new Table('test'));
    },
    otherwise() {
    }
};

const router = () => {
    const hash = location.hash.replace('#', '');
    console.log(hash);
    (routes[hash] || routes.otherwise)();
};

window.addEventListener('hashchange', router);
window.addEventListener('DOMContentLoaded', router);
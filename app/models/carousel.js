const db = require('../database/connection').connect();
const carousel = require('../schema/query');

module.exports = {
    getMainCarouselData: async (req, res) => {
        const result = {};
        result['categoryCnt'] = await carousel.showGroupCount(db, 'main_carousel', 'category_idx');
        result['category'] = await carousel.selectAll(db, 'category');
        result['data'] = await carousel.selectByOrder(db, 'main_carousel', 'category_idx');
        res.send(result);
    },

    getMiniCarouselData: async (req, res) => {
        res.send(await carousel.selectAll(db, 'mini_carousel'));
    }
};
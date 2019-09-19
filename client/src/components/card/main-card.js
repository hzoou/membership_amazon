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
}

export default MainCard;
import Slider from "./modules/slider";


window.addEventListener('DOMContentLoaded', () => {
    'use strict';

    const pagesSlider = new Slider('.page', '.sidecontrol__controls .next', '.main-logo');
    pagesSlider.render();
});
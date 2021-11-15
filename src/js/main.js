import VideoPlayer from "./modules/playVideo";
import Slider from "./modules/slider";


window.addEventListener('DOMContentLoaded', () => {
    'use strict';

    const pagesSlider = new Slider('.page', '.sidecontrol__controls .next', '.main-logo');
    pagesSlider.render();

    const player = new VideoPlayer('.showup .play', '.overlay');
    player.init();
    
});
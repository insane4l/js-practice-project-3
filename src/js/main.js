import VideoPlayer from "./modules/playVideo";
import MainSlider from "./modules/slider/slider-main";
import SecondarySlider from "./modules/slider/slider-secondary";


window.addEventListener('DOMContentLoaded', () => {
    'use strict';

    const mainSlider = new MainSlider({
        container: '.page',
        nextBtns: '.sidecontrol__controls .next',
        resetBtns: '.main-logo'
    });
    mainSlider.render();


    const showUpSlider = new SecondarySlider({
        container: '.showup__content-slider', 
        prevBtns: '.showup__prev', 
        nextBtns: '.showup__next', 
        activeClass: 'card-active',
        animate: true
    });
    showUpSlider.init();


    const modulesSlider = new SecondarySlider({
        container: '.modules__content-slider', 
        prevBtns: '.modules__info-btns .slick-prev', 
        nextBtns: '.modules__info-btns .slick-next',
        activeClass: 'card-active',
        autoplay: true
    });
    modulesSlider.init();


    const feedSlider = new SecondarySlider({
        container: '.feed__slider', 
        prevBtns: '.feed__slider .slick-prev', 
        nextBtns: '.feed__slider .slick-next', 
        activeClass: 'feed__item-active'
    });
    feedSlider.init();


    const player = new VideoPlayer('.showup .play', '.overlay');
    player.init();
    
});
export default class Slider {
    constructor({container = null,
                 prevBtns = null,
                 nextBtns = null,
                 resetBtns = null,
                 activeClass = '',
                 animate,
                 autoplay} = {}) {
        this.container = document.querySelector(container);
        try {this.slides = this.container.children;} catch(e){}
        this.prevBtns = document.querySelectorAll(prevBtns);
        this.nextBtns = document.querySelectorAll(nextBtns);
        this.resetBtns = document.querySelectorAll(resetBtns);
        this.activeClass = activeClass;
        this.animate = animate;
        this.autoplay = autoplay;
        this.slideIndex = 1;
    }

}
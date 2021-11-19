import Slider from "./slider"

export default class MainSlider extends Slider {
    constructor(container, nextBtns, resetBtns) {
        super(container, nextBtns, resetBtns);
    }

    showSlide(n) {
        if (n > this.slides.length) {
            this.slideIndex = 1;
        }

        if (n < 1) {
            this.slideIndex = this.slides.length;
        }

        this.slides.forEach( slide => {
            slide.classList.remove('fadeIn');
            slide.classList.add('animated', 'fadeOut');
            slide.style.display = 'none';
        });

        this.currentSlide = this.slides[this.slideIndex - 1];
        this.currentSlide.classList.remove('fadeOut');
        this.currentSlide.classList.add('fadeIn');
        this.currentSlide.style.display = 'block';

        try {
            if(n === 3) {
                setTimeout( () => {
                    try {
                        this.hanson.style.opacity = '1';
                        this.hanson.classList.add('slideInUp');
                    } catch(e) {}
                }, 3000)
            } else {
                this.hanson.style.opacity = '0';
                this.hanson.classList.remove('slideInUp');
            }
        } catch(e) {}
    }

    plussSlide(n) {
        this.showSlide(this.slideIndex += n)
    }

    bindArrows(btns, direction) {
        btns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                e.preventDefault();
                this.plussSlide(direction);
            });
        });
    }

    bindTriggers() {
        this.resetBtns.forEach( btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                this.slideIndex = 1;
                this.showSlide(this.slideIndex);
            });
        });

        // this.nextBtns.forEach(btn => {
        //     btn.addEventListener('click', () => this.plussSlide(1));
        // });
        // this.nextBtns.forEach(btn => {
        //     btn.addEventListener('click', () => this.plussSlide(1));
        // });
        this.bindArrows(this.prevBtns, -1);
        this.bindArrows(this.nextBtns, +1);

        this.additionalBtns = document.querySelectorAll('.sidecontrol__controls .next');
        this.additionalBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                this.plussSlide(1);
            });
        });

    }

    render() {
        if (this.container) {
            try {
                this.hanson = document.querySelector('.hanson');
                this.hanson.style.opacity = '0';
                this.hanson.classList.add('animated');
            } catch(e){}
            
            this.bindTriggers();
            this.showSlide(this.slideIndex);
        }
    }
}
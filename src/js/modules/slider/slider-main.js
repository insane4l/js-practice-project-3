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
                    this.hanson.style.opacity = '1';
                    this.hanson.classList.add('slideInUp');
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

    render() {
        try {
            this.hanson = document.querySelector('.hanson');
            this.hanson.style.opacity = '0';
            this.hanson.classList.add('animated');
        } catch(e){}

        this.resetBtns.forEach( btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                this.slideIndex = 1;
                this.showSlide(this.slideIndex);
            });
        });


        this.nextBtns.forEach(btn => {
            btn.addEventListener('click', () => this.plussSlide(1));
        });
        
        this.showSlide(this.slideIndex);
    }
}
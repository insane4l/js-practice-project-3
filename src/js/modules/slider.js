export default class Slider {
    constructor(sliderSelector, arrowsSelector, resetSelector) {
        this.wrapper = document.querySelector(sliderSelector);
        this.slides = this.wrapper.children;
        this.btns = document.querySelectorAll(arrowsSelector);
        this.resetBtns = document.querySelectorAll(resetSelector);

        this.slideIndex = 1;
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

        const currentSlide = this.slides[this.slideIndex - 1];
        currentSlide.classList.remove('fadeOut');
        currentSlide.classList.add('fadeIn');
        currentSlide.style.display = 'block';
    }

    plussSlide(n) {
        this.showSlide(this.slideIndex += n)
    }

    render() {
        if (this.resetBtns.length > 0) {
            this.resetBtns.forEach( btn => {
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.slideIndex = 1;
                    this.showSlide(this.slideIndex);
                });
            });
        }

        this.btns.forEach(btn => {
            btn.addEventListener('click', () => this.plussSlide(1))
        });

        this.showSlide(this.slideIndex);
    }
}
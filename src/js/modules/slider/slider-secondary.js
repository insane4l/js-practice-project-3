import Slider from "./slider";

export default class SecondarySlider extends Slider {
    constructor(container, prevBtns, nextBtns, activeClass, animate, autoplay) {
        super(container, prevBtns, nextBtns, activeClass, animate, autoplay);
    }

    decorateActiveSlide(slide) {
        this.slides.forEach( el => {
            el.classList.remove(this.activeClass);
            if (this.animate) {
                el.querySelector('.card__title').style.opacity = '0.4';
                el.querySelector('.card__controls-arrow').style.opacity = '0';
            }
        });

        slide.classList.add(this.activeClass);

        if (this.animate) {
            slide.querySelector('.card__title').style.opacity = '1';
            slide.querySelector('.card__controls-arrow').style.opacity = '1';
        }
    }

    checkOtherChildren(childrenTag) { // check if container childrens not only slides (for example buttons position: absolute)
        const allChildren = this.container.children;
        if ([...allChildren].some(el => el.tagName === childrenTag)) this.hasOtherChildren = childrenTag;
    }

    showNextSlide() {
        if (!this.hasOtherChildren) {
            this.container.appendChild(this.slides[0]);

        } else {
            let slides = [];
            this.slides.forEach(el => {
                if (el.tagName !== this.hasOtherChildren) slides.push(el);
            })

            this.container.insertBefore(slides[0], this.container.children[slides.length]);
        }

        this.decorateActiveSlide(this.slides[0]);
    }

    bindTriggers() {

        this.prevBtns.forEach( el => {
            el.addEventListener('click', () => {

                this.activeSlide = this.slides[this.slides.length - 1];

                if (this.hasOtherChildren) {
                    let slides = [];

                    this.slides.forEach(el => {
                        if (el.tagName !== this.hasOtherChildren) slides.push(el);
                    })
                    this.activeSlide = slides[slides.length - 1];
                }

                this.container.insertBefore(this.activeSlide, this.slides[0]);
                this.decorateActiveSlide(this.activeSlide);
            });
        });

        this.nextBtns.forEach( el => {
            el.addEventListener( 'click', () => this.showNextSlide() );
        });
    }

    init() {
        this.container.style.cssText = `
            display: flex;
            flex-wrap: wrap;
            overflow: hidden;
            align-items: flex-start;
        `;

        this.bindTriggers();
        this.decorateActiveSlide(this.slides[0]);
        this.checkOtherChildren('BUTTON');

        if (this.autoplay) {
            setInterval(() => this.showNextSlide(), 3000);
        }
    }
}
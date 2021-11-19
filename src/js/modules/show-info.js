export default class ShowInfo {
    constructor(btns) {
        this.btns = document.querySelectorAll(btns);
    }

    init() {

        this.btns.forEach( btn => {
            btn.addEventListener('click', () => {
                const nextEl = btn.closest('.module__info-show').nextElementSibling;

                nextEl.classList.toggle('msg');
                nextEl.style.marginTop = '20px';
            });
        });
    }
}
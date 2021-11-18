export default class DifferenceLists {
    constructor(firstList, secondList, itemSelector) {
        this.firstList = document.querySelector(firstList);
        this.secondList = document.querySelector(secondList);
        this.itemSelector = itemSelector;
        this.firstCounter = 0;
        this.secondCounter = 0;
    }

    hideCards(list) {
        let items = list.querySelectorAll(this.itemSelector);
        
        items.forEach(el => {
            if(el !== items[items.length - 1]) {
                el.style.display = 'none';
                el.classList.add('animated', 'fadeInDown');
            }
        });
    }

    bindTriggers(list, counter) {
        const items = list.querySelectorAll(this.itemSelector),
              button = items[items.length - 1];

        button.addEventListener('click', () => {
            if (counter < items.length - 2) {
                items[counter].style.display = 'flex';
                counter++;
            } else {
                items[counter].style.display = 'flex';
                button.classList.add('animated', 'fadeOut');
                setTimeout(function() {
                    button.remove();
                }, 1000);
            }
        });
    }

    init() {
        try {
            this.hideCards(this.firstList);
            this.hideCards(this.secondList);

            this.bindTriggers(this.firstList, this.firstCounter);
            this.bindTriggers(this.secondList, this.secondCounter);
        } catch(e){}
    }
}
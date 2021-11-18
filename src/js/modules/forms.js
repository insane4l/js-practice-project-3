export default class SubmittingForms {
    constructor(formSelector, url) {
        this.forms = document.querySelectorAll(formSelector);
        this.message = {
            loading: 'Отправка данных...',
            success: 'Спасибо! Мы свяжемся с вами в ближайшее время',
            failure: 'Произошла ошибка. Пожалуйста перезагрузите страницу и попробуйте заново'
        };
        this.path = url;
    }

    checkMailInputs() {
        const mailInputs = document.querySelectorAll('[type="email"]');

        mailInputs.forEach( el => {
            el.addEventListener('keypress', (e) => {
                if(e.key.match(/[^a-z 0-9 @ \.]/ig)) {
                    e.preventDefault();
                }
            })
        })
    }

    initPhoneMask() {
        
        const setCursorPosition = (pos, elem) => {
            elem.focus();

            if (elem.setSelectionRange) {
                elem.setSelectionRange(pos, pos);
            } else if (elem.createTextRange) { // for old browsers (if setSelectionRange not supported)
                let range = elem.createTextRange();

                range.collapse(true); // default but just in case
                range.moveEnd('character', pos); 
                range.moveStart('character', pos); // selection start = selection end
                range.select(); // select (move cursor)
            }
        };

        function createMask(event) {
            let matrix = '+1 (___) ___-____',
                i = 0,
                def = matrix.replace(/\D/g, ''),
                val = this.value.replace(/\D/g, '');
            
            if (def.length >= val.length) {
                val = def;
            }

            this.value = matrix.replace(/./g, function(a) {
                return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? '' : a;
            });

            if (event.type === 'blur') {
                if (this.value.length == 2) {
                    this.value = '';
                }
            } else {
                setCursorPosition(this.value.length, this);
            }
        }

        const inputs = document.querySelectorAll('[name="phone"]');

        inputs.forEach( input => {
            input.addEventListener('focus', createMask);
            input.addEventListener('input', createMask);
            input.addEventListener('blur', createMask);
        })
    }

    bindSubmittingForms() {
        this.forms.forEach( form => this.handleSubmit(form) );
    }

    handleSubmit(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const formBtns = form.querySelectorAll('button');
            this.disableButtons(formBtns, true);
            const messageBlock = this.createStatusMessage(form.parentNode, this.message.loading);
            const formData = new FormData(form);
            
            this.postData(this.path, formData)
                .then( () => {
                    messageBlock.textContent = this.message.success;
                    this.clearInputs(form);
                })
                .catch( () => {
                    messageBlock.textContent = this.message.failure;
                    this.disableButtons(formBtns, false);
                })
                .finally( () => {
                    setTimeout(() => {
                        messageBlock.remove();
                        this.disableButtons(formBtns, false);
                    }, 5000)
                });
        });
    }

    async postData(url, data) {
        const res = await fetch(url, {
            method: 'POST',
            body: data
        });

        return await res.text();
    }

    createStatusMessage(container, message) {
        const messageBlock = document.createElement('div');

        messageBlock.textContent = message;
        messageBlock.style.cssText = `
        width: 100%;
        margin-top: 20px;
        font-size: 18px;
        text-align: center;
        color: grey;
        `

        container.appendChild(messageBlock);

        return messageBlock;
    }

    disableButtons(btns, disabled) {
        btns.forEach( el => {
            el.disabled = disabled;
        });
    }

    clearInputs(form) {
        form.querySelectorAll('input').forEach( el => {
            el.value = '';
        });
    }


    init() {
        this.checkMailInputs();
        this.initPhoneMask();
        this.bindSubmittingForms();
    }
}
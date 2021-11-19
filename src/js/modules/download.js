export default class Download {
    constructor(triggers) {
        this.btns = document.querySelectorAll(triggers);
    }

    bindTriggers() {
        this.btns.forEach( btn => {
            btn.addEventListener('click', () => {

                const path = btn.getAttribute('data-link');
                this.downloadFile(path);
            });
        });
    }

    downloadFile(path) {
        const link = document.createElement('a');
        link.setAttribute('href', path);
        link.setAttribute('download', 'some_file_descr');
        link.style.display = 'none';
        document.body.appendChild(link);

        link.addEventListener('click', (e) => e.preventDefault() );

        link.click();
        link.remove();
    }

    init() {
        this.bindTriggers()
    }
}
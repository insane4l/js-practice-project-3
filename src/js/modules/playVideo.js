export default class VideoPlayer {
    constructor(triggerSelector, overlaySelector) {
        this.btns = document.querySelectorAll(triggerSelector);
        this.overlay = document.querySelector(overlaySelector);
        this.close = this.overlay.querySelector('.close');
    }

    bindTriggers() {
        this.btns.forEach( btn => {
            btn.addEventListener('click', () => {
                const path = btn.getAttribute('data-url');
                this.createPlayer(path);

                this.overlay.style.display = 'flex';
            });
        });
    }

    bindCloseBtn() {
        this.close.addEventListener('click', () => {
            this.overlay.style.display = 'none';
            this.player.stopVideo();
        });
    }

    createPlayer(url) {
        if (!this.player) {
            this.player = new YT.Player('frame', {
                height: '100%',
                width: '100%',
                videoId: url
            });
        }
    }

    init() {
        const tag = document.createElement('script');

        tag.src = "https://www.youtube.com/iframe_api";
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

        this.bindTriggers();
        this.bindCloseBtn();
    }
}
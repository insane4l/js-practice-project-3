export default class VideoPlayer {
    constructor(triggerSelector, overlaySelector) {
        this.btns = document.querySelectorAll(triggerSelector);
        this.overlay = document.querySelector(overlaySelector);
        this.close = this.overlay.querySelector('.close');
        this.onPlayerStateChange = this.onPlayerStateChange.bind(this);
    }

    bindTriggers() {
        this.btns.forEach( btn => {
            btn.addEventListener('click', () => {
                const disabledBtn = btn.querySelector('.closed');

                if (!disabledBtn) {
                    this.activeBtn = btn;

                    const path = btn.getAttribute('data-url');
    
                    this.createPlayer(path);
    
                    this.overlay.style.display = 'flex';
                }

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
                videoId: url,
                events: {
                    'onStateChange': this.onPlayerStateChange
                }
            });
        } else {
            this.player.loadVideoById({videoId: url})
        }
    }

    onPlayerStateChange(e) {
        try {
            if (e.data === 0) {
                const nextVideoBlock = this.activeBtn.closest('.module__video-item').nextElementSibling;
                const nextVideoBtn = nextVideoBlock.querySelector('.play__circle');
                const nextVideoBtnImg = nextVideoBtn.querySelector('svg');
                const nextVideoBtnText = nextVideoBlock.querySelector('.play__text');
                const playImg = this.activeBtn.querySelector('svg').cloneNode(true);
                
                if (nextVideoBtn.classList.contains('closed')) {
                    nextVideoBlock.style.opacity = '1';
                    nextVideoBlock.style.filter = 'none';

                    nextVideoBtn.classList.remove('closed');
                    nextVideoBtnImg.remove();
                    nextVideoBtn.appendChild(playImg);

                    nextVideoBtnText.textContent = 'play video';
                    nextVideoBtnText.classList.remove('attention');
                }
            }
        } catch(e){}
        
    }

    init() {
        if (this.btns.length > 0) {
            const tag = document.createElement('script');

            tag.src = "https://www.youtube.com/iframe_api";
            const firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

            this.bindTriggers();
            this.bindCloseBtn();
        }
    }
}
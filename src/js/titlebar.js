import utils from './utils';

class Titlabar {
    constructor(player) {
        this.player = player;

        this.autoHideTimer = 0;
        if (!utils.isMobile) {
            this.player.container.addEventListener('mousemove', () => {
                this.setAutoHide();
            });
            this.player.container.addEventListener('click', () => {
                this.setAutoHide();
            });
            this.player.on('play', () => {
                this.setAutoHide();
            });
            this.player.on('pause', () => {
                this.setAutoHide();
            });
        }

        this.initBackButton();
        this.initPlayButton();
    }

    initBackButton() {
        if (this.player.template.titlebarBackButton) {
            this.player.template.titlebarBackButton.addEventListener('click', (e) => {
                e.preventDefault();
                this.player.events.trigger('titlebar_back');
            });
        }
    }

    initPlayButton() {
        if (!utils.isMobile) {
        } else {
            this.player.template.videoWrap.addEventListener('click', () => {
                this.toggle();
            });
            this.player.template.controllerMask.addEventListener('click', () => {
                this.toggle();
            });
        }
    }

    setAutoHide() {
        this.show();
        clearTimeout(this.autoHideTimer);
        this.autoHideTimer = setTimeout(() => {
            if (this.player.video.played.length && !this.player.paused && !this.disableAutoHide) {
                this.hide();
            }
        }, 3000);
    }

    isShow() {
        return !this.player.container.classList.contains('dplayer-hide-titlebar');
    }

    show() {
        this.player.container.classList.remove('dplayer-hide-titlebar');
    }

    hide() {
        this.player.container.classList.add('dplayer-hide-titlebar');
    }

    toggle() {
        if (this.isShow()) {
            this.hide();
        } else {
            this.show();
        }
    }
}
export default Titlabar;

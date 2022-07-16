import utils from './utils';

class Gesture {
    constructor(player) {
        this.player = player;
        if (utils.isMobile) {
            this.player.container.addEventListener('touchstart', (e) => {
                this.touchstart(e);
            }, false);
            this.player.container.addEventListener('touchend', (e) => {
                this.touchend(e);
            }, false);
        }
    }

    touchstart(e) {
        if (!this.longTouchTimer) {
            this.longTouchTimer = setTimeout(() => {
                // 如果是播放中
                if (!this.player.paused) {
                    // 长按加速
                    this.speedUp = true;
                    this.player.template.speedUpItem.classList.remove('hidden');
                    this.player.speed(2); // 默认2倍加速
                }
            }, 2500);
        }
    }

    touchend(e) {
        if (this.longTouchTimer) {
            clearTimeout(this.longTouchTimer);
            this.longTouchTimer = null;
        }
        if (this.speedUp) {
            this.player.speed(1); // 恢复正常
            this.speedUp = false;
            this.player.template.speedUpItem.classList.add('hidden');
        }
    }
}

export default Gesture;
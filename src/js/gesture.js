import utils from './utils';

class Gesture {
    constructor(player) {
        this.player = player;
        if (utils.isMobile) {
            this.player.container.addEventListener('touchstart', (e) => {
                this.touchstart(e);
            }, false);
            this.player.container.addEventListener('touchmove', (e) => {
                this.touchMove(e);
            }, false);
            this.player.container.addEventListener('touchend', (e) => {
                this.touchend(e);
            }, false);
        }
    }

    touchstart(e) {
        if (!this.player.video.duration) return;

        // 长按事件
        if (!this.longTouchTimer && !this.moveProgress) {
            this.longTouchTimer = setTimeout(() => {
                // 如果是播放中
                if (!this.player.paused) {
                    // 长按加速
                    this.speedUp = true;
                    this.player.events.trigger('speed_up');
                    this.player.template.speedUpItem.classList.remove('hidden');
                    this.player.speed(2); // 默认2倍加速
                }
            }, 1500);
        }

        // 左右滑动进度条事件
        const target = e.target || e.srcElement || e.currentTarget;
        /**
         * 屏幕总宽度(px) / 视频时长(s) = 像素点/s
         * offset: 调优参数，可以依据滑动屏幕的习惯来进行调优
         */
        this.pxPerSecond = target.clientWidth / this.player.video.duration + 25;
        this.beginX = e.touches ? e.touches[0].clientX : 0;
    }

    touchMove(e) {
        if (!this.player.video.duration) return;
        // 如果在加速中，则忽略移动
        if (this.speedUp) return;

        // 检测是否真的发生移动
        const currentX = e.touches ? e.touches[0].clientX : 0;
        const delta = currentX - this.beginX;
        if (Math.abs(delta) <= 5) return; // 取绝对值(右滑为正，左滑为负)
        this.moveProgress = true;
        this.moveLength = delta;
    }

    touchend(e) {
        if (!this.player.video.duration) return;

        if (this.longTouchTimer) {
            clearTimeout(this.longTouchTimer);
            this.longTouchTimer = null;
        }
        if (this.speedUp) {
            this.player.speed(1); // 恢复正常
            this.speedUp = false;
            this.player.template.speedUpItem.classList.add('hidden');
        }
        if (this.moveProgress) {
            this.moveProgress = false;
            const time = this.player.video.currentTime + Math.round(this.moveLength / this.pxPerSecond);
            if (time < 0) {
                this.player.seek(0);
            } else {
                this.player.seek(time);
            }
        }
    }
}

export default Gesture;
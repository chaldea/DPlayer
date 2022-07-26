
class Playlist {
    constructor(player) {
        this.player = player;
        this.initSliceButton();
        this.initItems();
    }

    initSliceButton() {
        if (this.player.template.sliceButton) {
            this.player.template.sliceButton.addEventListener('click', (e) => {
                e.preventDefault();
                this.show();
                this.player.controller.hide();
                this.player.titlabar.hide();
            });
        }

        this.player.template.videoWrap.addEventListener('click', () => {
            if (this.isShow()) {
                this.hide();
            }
        });
    }

    initItems() {
        if (this.player.template.playlistItems && this.player.template.playlistItems.length > 0) {
            for (const [i, v] of this.player.template.playlistItems.entries()) {
                v.addEventListener('click', (e) => {
                    e.preventDefault();
                    const selected = this.player.options.playlist[i];
                    this.player.events.trigger('playlist_select', selected);
                    this.select(v);
                    // if (this.isShow()) {
                    //     this.hide();
                    // }
                });
            }
        }
    }

    select(node) {
        if (this.player.template.playlistItems && this.player.template.playlistItems.length > 0) {
            for (const item of this.player.template.playlistItems) {
                if (item.classList.contains('selected')) {
                    item.classList.remove('selected');
                    item.classList.add('visited');
                    break;
                }
            }
            node.classList.add('selected');
        }
    }

    isShow() {
        return this.player.container.classList.contains('dplayer-show-playlist');
    }

    show() {
        this.player.container.classList.add('dplayer-show-playlist');
    }

    hide() {
        this.player.container.classList.remove('dplayer-show-playlist');
    }

    toggle() {
        if (this.isShow()) {
            this.hide();
        } else {
            this.show();
        }
    }
}

export default Playlist;
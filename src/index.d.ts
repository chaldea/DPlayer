// Type definitions for dplayer 1.25
// Project: https://github.com/DIYgod/DPlayer#readme
// Definitions by: Guanyunhan <https://github.com/Guanyunhan>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 2.6

export as namespace DPlayer;

export type Lang = 'en' | 'zh-cn' | 'zh-tw';
export type Preload = 'none' | 'metadata' | 'auto';
export type VideoType = 'auto' | 'hls' | 'flv' | 'dash' | 'webtorrent' | 'normal';
export type SubTitleType = 'webvtt' | 'ass';
export type DirectionType = 'top' | 'right' | 'bottom';
export type FullScreenType = 'web' | 'browser';
export type ImageFormat = 'image/jpeg' | 'image/png' | 'image/bmp';

export interface DPlayerOptions {
  [key: string]: any;

  container: HTMLElement | null;
  live?: boolean | undefined;
  autoplay?: boolean | undefined;
  theme?: string | undefined;
  loop?: boolean | undefined;
  lang?: Lang | string | undefined;
  screenshot?: boolean | undefined;
  hotkey?: boolean | undefined;
  preload?: Preload | undefined;
  logo?: string | undefined;
  volume?: number | undefined;
  mutex?: boolean | undefined;
  video?: DPlayerVideo | undefined;
  subtitle?: DPlayerSubTitle | undefined;
  danmaku?: DPlayerDanmaku | undefined;
  contextmenu?: DPlayerContextMenuItem[] | undefined;
  highlight?: DPlayerHighLightItem[] | undefined;
  apiBackend?: DPlayerAPIBackend | undefined;
  titlebar?: DPlayerTitlebar | undefined;
}

export interface DPlayerTitlebar {
  title?: string
}

export interface DPlayerDanmakuItem {
  time: number;
  type: DirectionType;
  color: number;
  author: string;
  text: string;
}

export interface DPlayerContextMenuItem {
  text: string;
  link?: string | undefined;
  click?: (() => void) | undefined;
}

export interface DPlayerHighLightItem {
  text: string;
  time: number;
}

export interface DPlayerVideoQuality {
  name: string;
  url: string;
  type?: string | undefined;
}

export interface DPlayerVideo {
  url: string;
  pic?: string | undefined;
  thumbnails?: string | undefined;
  type?: VideoType | string | undefined;
  customType?: any;
  quality?: DPlayerVideoQuality[] | undefined;
  defaultQuality?: number | undefined;
}

export interface DPlayerSubTitle {
  url: string;
  type?: SubTitleType | undefined;
  fontSize?: string | undefined;
  bottom?: string | undefined;
  color?: string | undefined;
}

export interface DPlayerDanmaku {
  id: string;
  api: string;
  token?: string | undefined;
  maximum?: string | undefined;
  addition?: string[] | undefined;
  user?: string | undefined;
  bottom?: string | undefined;
  unlimited?: boolean | undefined;
}

export interface DPlayerAPIBackend {
  read(options: any): void;

  send(options: any): void;
}

export interface Danmaku {
  send(danmaku: DPlayerDanmakuItem, callback: () => void): void;

  draw(danmaku: DPlayerDanmakuItem): void;

  opacity(percentage: number): void;

  clear(): void;

  hide(): void;

  show(): void;
}

export interface FullScreen {
  request(type: FullScreenType): void;

  cancel(type: FullScreenType): void;
}

export default class DPlayer {
  events: any;
  video: HTMLVideoElement;
  danmaku: Danmaku;
  fullScreen: FullScreen;

  constructor(options: DPlayerOptions);

  play(): void;

  pause(): void;

  seek(time: number): void;

  toggle(): void;

  on(event: string, handler: () => void): void;

  switchVideo(video: DPlayerVideo, danmaku?: DPlayerDanmaku): void;

  notice(text: string, time: number, opacity: number): void;

  switchQuality(index: number): void;

  destroy(): void;

  speed(rate: number): void;

  volume(percentage: number, nostorage: boolean, nonotice: boolean): void;

  screenshot(type?: ImageFormat, quality?: number): string;
}

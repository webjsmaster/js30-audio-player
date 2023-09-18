import './player.scss';
import View from '../../../util/view.js';
import Button from './button/button.js';
import { audio1, audio2, typeButton } from '../../../util/variables.js';
import Range from './range/range.js';

import ElementCreator from '../../../util/element-creator.js';
import getTimeCodeFromNum from '../../../util/get-time.js';

export default class Player extends View {
  _currentTrack = 1;
  _isPlay = false;

  constructor() {
    /**
     * @type {import('../../util/element-creator.js').ElementParams} params
     */
    const params = {
      tag: 'div',
      classNames: ['player'],
      textContent: '',
      callback: null,
    };
    super(params);

    // ======== > singleton < ======== //
    if (Player.exists) {
      return Player.instance;
    }
    Player.instance = this;
    Player.exists = true;
    // ======== > singleton < ======== //

    this.tracks = [audio1, audio2];
    this.configureAudio();
    this.configureView();
  }

  getStatus() {
    return this._isPlay;
  }

  configureAudio() {
    this.audio = new Audio();
    this.audio.src = this.tracks[this._currentTrack];


    this.audio.addEventListener(
      'loadeddata',
      () => {
        this.configureView();
        this.name.textContent = this.tracks[this._currentTrack].split('/')
          .pop()
          .split('.')[0];
        this.lengthTime.textContent = getTimeCodeFromNum(this.audio.duration);
      },
      false
    );
    setInterval(() => {
      this.range.setValueRange(this.audio.currentTime);
      this.range.updatePos();
      this.currentTime.textContent = getTimeCodeFromNum(this.audio.currentTime);
    }, 500);
  }

  toggleStatus() {
    this._isPlay = !this._isPlay;
    this._isPlay ? this.audio.play() : this.audio.pause();
  }

  configureView() {
    const player = this.elementCreator.getElement();
    player.replaceChildren();
    this.playButton = null;
    if (this._isPlay) {
      this.playButton = new Button(typeButton.pause).getHtmlElement();
    } else {
      this.playButton = new Button(typeButton.play).getHtmlElement();
    }
    this.leftButton = new Button(typeButton.arrowLeft).getHtmlElement();
    this.rightButton = new Button(typeButton.arrowRight).getHtmlElement();
    this.range = new Range(this.audio.duration);
    const time = new ElementCreator({
      tag: 'div',
      classNames: ['time'],
    }).getElement();
    this.currentTime = new ElementCreator({
      tag: 'div',
      classNames: ['time__current'],
    }).getElement();
    this.name = new ElementCreator({
      tag: 'div',
      classNames: ['time__name'],
    }).getElement();
    this.lengthTime = new ElementCreator({
      tag: 'div',
      classNames: ['time__length'],
    }).getElement();

    this.currentTime.textContent = getTimeCodeFromNum(this.audio.currentTime);
    time.append(this.currentTime, this.name, this.lengthTime);
    player.append(this.playButton, time, this.range.getHtmlElement(), this.leftButton, this.rightButton);
  }

  updateView() {
    const player = this.elementCreator.getElement();
    player.removeChild(this.playButton);
    if (this._isPlay) {
      this.playButton = new Button(typeButton.pause).getHtmlElement();
    } else {
      this.playButton = new Button(typeButton.play).getHtmlElement();
    }
    player.prepend(this.playButton);
    this.range.setValueRange(this.audio.currentTime);
    this.range.updatePos();
    this.currentTime.textContent = getTimeCodeFromNum(this.audio.currentTime);
    this.lengthTime.textContent = getTimeCodeFromNum(this.audio.duration);
  }

  changeTrack(direction) {
    this.audio.pause();
    this.audio = null;
    this._currentTrack = this._currentTrack === 0 ? 1 : 0;
    this.configureAudio();
    this._isPlay ? this.audio.play() : this.audio.pause();
  }
}

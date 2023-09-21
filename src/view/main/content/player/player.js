import './player.scss';
import View from '../../../../util/view.js';
import Button from './button/button.js';
import {content, typeButton} from '../../../../util/variables.js';
import Range from './range/range.js';

import ElementCreator from '../../../../util/element-creator.js';
import getTimeCodeFromNum from '../../../../util/get-time.js';
import Preloader from "../../../preloader/preloader";

export default class Player extends View {
  _currentTrack = 0;
  _isPlay = false;
  _isLoading = false;

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

    this.observers = [];

    // ======== > singleton < ======== //
    if (Player.exists) {
      return Player.instance;
    }
    Player.instance = this;
    Player.exists = true;
    // ======== > singleton < ======== //

    this.content = content;
    this.configureAudio();

  }

  getStatus() {
    return this._isPlay;
  }

  configureAudio() {
    this.audio = new Audio();
    this.audio.src = this.content[this._currentTrack].audio;
    this.setStatusLoading(true);
    this.configureView()

    this.audio.addEventListener(
      'loadeddata',
      () => {
        this.setStatusLoading(false);
        this.configureView();
        this.name.textContent = this.content[this._currentTrack].name;
        this.lengthTime.textContent = getTimeCodeFromNum(this.audio.duration);

        setInterval(() => {
          this.range.setValueRange(this.audio.currentTime);
          this.range.updatePos();
          this.currentTime.textContent = getTimeCodeFromNum(this.audio.currentTime);
        }, 500);

        console.log('🍁: ', getTimeCodeFromNum(this.audio.duration))

      },
      false
    );

    this.audio.addEventListener('ended', () => {
      this.changeTrack(typeButton.arrowRight)
    })
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
    if (this._isLoading) {
      player.append(new Preloader().getHtmlElement());
    } else {
      player.append(this.playButton, time, this.range.getHtmlElement(), this.leftButton, this.rightButton);
    }
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

    if (direction === typeButton.arrowLeft) {
      this._currentTrack = this._currentTrack === 0 ? this.content.length - 1 : this._currentTrack - 1;
    } else if (direction === typeButton.arrowRight) {
      this._currentTrack = this._currentTrack === this.content.length - 1 ? 0 : this._currentTrack + 1;
    }

    this.notifyObserver();
    this.configureAudio();
    this._isPlay ? this.audio.play() : this.audio.pause();
  }

  getCurrentTrack() {
    return this._currentTrack;
  }

  setStatusLoading(status) {
    this._isLoading = status
  }

  getStatusLoading() {
    return this._isLoading;
  }

  // =======> Observer <======== //
  subscribe(observer) {
    this.observers.push(observer);
  }

  notifyObserver() {
    this.observers.forEach(o => o.update());
  }

  // =======> Observer <======== //
}


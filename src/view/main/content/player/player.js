import './player.scss';
import View from '../../../../util/view.js';
import Button from './button/button.js';
import {content, typeButton} from '../../../../util/variables.js';
import Range from './range/range.js';

import ElementCreator from '../../../../util/element-creator.js';
import getTimeCodeFromNum from '../../../../util/get-time.js';
import Preloader from '../../../preloader/preloader';

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

    this.createAllHtmlElements();
    this.configureAudio();
    this.configureView();

  }

  createAllHtmlElements() {
    this.playButton = new Button(typeButton.play).getHtmlElement();
    this.leftButton = new Button(typeButton.arrowLeft).getHtmlElement();
    this.rightButton = new Button(typeButton.arrowRight).getHtmlElement();
    this.loader = new Preloader().getHtmlElement();
    this.range = new Range();
    this.infoContainer = new ElementCreator({tag: 'div', classNames: ['player__container']}).getElement();

    this.info = new ElementCreator({tag: 'div', classNames: ['time']}).getElement();
    this.currentTime = new ElementCreator({tag: 'div', classNames: ['time__current']}).getElement();
    this.name = new ElementCreator({tag: 'div', classNames: ['time__name']}).getElement();
    this.lengthTime = new ElementCreator({tag: 'div', classNames: ['time__length']}).getElement();

    this.info.append(this.currentTime, this.name, this.lengthTime);
  }

  getStatus() {
    return this._isPlay;
  }

  configureAudio() {
    this.audio = new Audio();
    this.audio.src = this.content[this._currentTrack].audio;
    this.setStatusLoading(true);
    this.rerenderView();
    this.playButton.disabled = true;

    this.audio.addEventListener(
      'loadeddata',
      () => {
        this.setStatusLoading(false);
        this.playButton.disabled = false;
        this.rerenderView();
        this.range.setMaxAttr(this.audio.duration);

        setInterval(() => {
          this.range.setValueRange(this.audio.currentTime);
          this.range.updatePos();
          this.currentTime.textContent = getTimeCodeFromNum(this.audio.currentTime);
        }, 500);


      },
      false
    );

    this.audio.addEventListener('ended', () => {
      this.changeTrack(typeButton.arrowRight);
    });
  }


  configureView() {
    const player = this.elementCreator.getElement();
    player.append(this.playButton, this.infoContainer, this.range.getHtmlElement(), this.leftButton, this.rightButton);
  }

  rerenderView() {
    this.infoContainer.replaceChildren();
    if (this.getStatusLoading()) {
      this.infoContainer.append(this.loader)
    } else {
      this.currentTime.textContent = getTimeCodeFromNum(this.audio.currentTime);
      this.lengthTime.textContent = getTimeCodeFromNum(this.audio.duration);
      this.name.textContent = this.content[this._currentTrack].name;

      this.infoContainer.append(this.info)
    }
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

  toggleStatus() {
    this._isPlay = !this._isPlay;
    this._isPlay ? this.audio.play() : this.audio.pause();
  }

  getCurrentTrack() {
    return this._currentTrack;
  }

  setStatusLoading(status) {
    this._isLoading = status;
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


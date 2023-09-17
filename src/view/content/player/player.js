import './player.scss';
import View from '../../../util/view.js';
import Button from './button/button.js';
import { typeButton } from '../../../util/variables.js';
import Range from './range/range.js';

export default class Player extends View {
  static _isPlay = false;

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
    this.configureView();
  }

  static setStatus(status) {
    this._isPlay = status;
    this.console.log('[31] 🐬: ', this._isPlay);
  }

  static getStatus() {
    return this._isPlay;
  }

  configureView() {
    const player = this.elementCreator.getElement();
    player.append(new Button(typeButton.play).getHtmlElement());
    player.append(new Button(typeButton.pause).getHtmlElement());
    player.append(new Range().getHtmlElement());
    // player.append(new RangeTest().getHtmlElement());
  }

  toggleImgButton() {

  }
}

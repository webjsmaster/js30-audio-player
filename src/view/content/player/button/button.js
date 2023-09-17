import './button.scss';
import View from '../../../../util/view.js';
import ElementCreator from '../../../../util/element-creator.js';
import { buttonImg, typeButton } from '../../../../util/variables.js';
// eslint-disable-next-line import/no-named-as-default,import/no-named-as-default-member
import Player from '../player.js';

export default class Button extends View {
  /**
   * @param {('play' | 'pause' | 'arrowRight' | 'arrowLeft')} type
   */
  constructor(type) {
    /**
     * @type {import('../../util/element-creator.js').ElementParams} params
     */
    const params = {
      tag: 'button',
      classNames: ['button'],
      textContent: '',
      attribute: [{
        id: 'id',
        value: type,
      }],
      callback: () => this.handlerButton(),
    };
    super(params);
    this.configureView(type);
  }

  configureView(type) {
    this.elementCreator.getElement()
      .append(this.insertImg(type)
        .getElement());
  }

  insertImg(type) {
    const img = buttonImg[type];

    /**
     * @type {import('../../util/element-creator.js').ElementParams} params
     */
    const param = {
      tag: 'img',
      attribute: [{
        id: 'src',
        value: img,
      }],
      callback: null,
      classNames: [],
      textContent: '',
    };
    return new ElementCreator(param);
  }

  handlerButton() {
    const idButton = this.getHtmlElement()
      .getAttribute('id');
    if (idButton === typeButton.play || idButton === typeButton.pause) {
      Player.setStatus(!Player.getStatus());
    }
  }
}

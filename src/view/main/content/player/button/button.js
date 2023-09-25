import './button.scss';
import View from '../../../../../util/view.js';
import ElementCreator from '../../../../../util/element-creator.js';
import { buttonImg, typeButton } from '../../../../../util/variables.js';
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
    this.player = new Player();
    this.configureView(type);
  }

  configureView(type) {
    this.img = this.insertImg(type).getElement();
    this.elementCreator.getElement().append(this.img);
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
      this.player.toggleStatus();
      this.toggleImgButton();
    } else if (idButton === typeButton.arrowRight || idButton === typeButton.arrowLeft) {
      this.player.changeTrack(idButton);
    }
  }

  toggleImgButton() {
    if (this.player.getStatus()) {
      this.img.setAttribute('src', buttonImg.pause);
    } else {
      this.img.setAttribute('src', buttonImg.play);
    }
  }
}

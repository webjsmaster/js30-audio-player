import './poster.scss';
import View from '../../../../util/view.js';
import { content } from '../../../../util/variables.js';
import ElementCreator from '../../../../util/element-creator.js';
import Player from '../player/player.js';

export default class Poster extends View {
  constructor() {
    /**
     * @type {import('../../util/element-creator.js').ElementParams} params
     */
    const params = {
      tag: 'div',
      classNames: ['poster'],
      textContent: '',
      callback: null,
    };
    super(params);

    // ======== > singleton < ======== //
    if (Poster.exists) {
      return Poster.instance;
    }
    Poster.instance = this;
    Poster.exists = true;
    // ======== > singleton < ======== //

    this.player = new Player();
    this.content = content;
    this.configureView();
  }

  configureView() {
    const poster = this.elementCreator.getElement();
    const img = this.content[this.player.getCurrentTrack()].poster;
    poster.replaceChildren();
    /**
     * @type {import('../../util/element-creator.js').ElementParams} params
     */
    const paramsImg = {
      tag: 'img',
      classNames: ['poster__image'],
      attribute: [{
        id: 'src',
        value: img,
      }],
      callback: null,
      textContent: '',
    };

    poster.append(new ElementCreator(paramsImg).getElement());
  }

  update() {
    this.configureView();
  }
}

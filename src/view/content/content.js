import './content.scss';
import View from '../../util/view.js';
import Player from './player/player.js';
import Poster from './poster/poster.js';

export default class Content extends View {
  constructor() {
    /**
     * @type {import('../../util/element-creator.js').ElementParams} params
     */
    const params = {
      tag: 'div',
      classNames: ['content'],
      textContent: '',
      callback: null,
    };
    super(params);
    this.configureView();
  }

  configureView() {
    const content = this.elementCreator.getElement();
    const player = new Player().getHtmlElement();
    const poster = new Poster().getHtmlElement();
    content.append(poster, player);
  }
}

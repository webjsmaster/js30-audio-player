import './info.scss';
import View from '../../../../../util/view.js';

export default class Info extends View {
  constructor() {
    /**
     * {ElementParams} params
     */
    super({ tag: 'div', classNames: ['player__info'] });
  }
}

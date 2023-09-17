import './poster.scss';
import View from '../../../util/view.js';

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
  }
}

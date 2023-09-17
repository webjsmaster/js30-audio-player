import './wrapper.scss';
import View from '../util/view.js';
import Content from './content/content.js';

export default class Wrapper extends View {
  constructor() {
    /**
     * @type {import('../../util/element-creator.js').ElementParams} params
     */
    const params = {
      tag: 'div',
      classNames: ['wrapper'],
      textContent: '',
      callback: null,
    };
    super(params);
    this.configureView();
  }

  configureView() {
    const wrapper = this.elementCreator.getElement();
    wrapper.append(new Content().getHtmlElement());
  }
}

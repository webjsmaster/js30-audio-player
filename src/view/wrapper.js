import './wrapper.scss';
import View from '../util/view.js';
import Footer from './footer/footer.js';
import Main from './main/main.js';

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
    wrapper.append(new Main().getHtmlElement(), new Footer().getHtmlElement());
  }
}

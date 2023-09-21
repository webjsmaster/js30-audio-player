import './footer.scss';
import View from '../../util/view.js';
import Container from './container/container.js';

export default class Footer extends View {
  constructor() {
    /**
     * @type {import('../../util/element-creator').ElementParams} params
     */
    const params = {
      tag: 'footer',
      classNames: ['footer'],
    };
    super(params);
    this.configureView();
  }

  configureView() {
    const footer = this.elementCreator.getElement();
    footer.append(new Container().getHtmlElement());
  }
}

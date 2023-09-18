import './main.scss';
import View from '../../util/view';
import Content from './content/content';

export default class Main extends View {
  constructor() {
    /**
     * @type {import('../../util/element-creator.js').ElementParams} params
     */
    const params = {
      tag: 'main',
      classNames: ['main'],
    };
    super(params);
    this.configureView();
  }

  configureView() {
    const main = this.elementCreator.getElement();
    main.append(new Content().getHtmlElement());
  }
}

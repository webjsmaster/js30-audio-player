import './preloader.scss';
import View from '../../util/view.js';
import ElementCreator from '../../util/element-creator.js';

export default class Preloader extends View {
  constructor() {
    /**
     * @type {ElementParams} params
     */
    const params = {
      tag: 'div',
      classNames: ['preloader'],
    };
    super(params);
    this.configureView();
  }

  configureView() {
    /**
     * @type {ElementParams} params
     */
    const paramsBar = {
      tag: 'div',
      classNames: ['preloader__bar'],
    };

    const preloader = this.elementCreator.getElement();
    Array.from(Array(5)).forEach(() => preloader.append(
      new ElementCreator(paramsBar).getElement(),
    ));

    return this.elementCreator.getElement();
  }
}

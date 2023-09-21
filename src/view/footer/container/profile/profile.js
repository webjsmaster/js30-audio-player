import './profile.scss';
import View from '../../../../util/view.js';
import ElementCreator from '../../../../util/element-creator.js';
import icon from '../../../../public/github.svg';

export default class Profile extends View {
  constructor() {
    /**
     * @type {ElementParams} params
     */
    const params = {
      tag: 'div',
      classNames: ['footer__profile'],
    };
    super(params);
    this.configureView();
  }

  configureView() {
    /**
     * @type {ElementParams} params
     */
    const params = {
      tag: 'a',
      classNames: ['footer__profile-link'],
      attribute: [{ id: 'href', value: 'https://github.com/webjsmaster' }, { id: 'target', value: '_blank' }],
    };

    const paramsImg = {
      tag: 'img',
      classNames: ['footer__img'],
      attribute: [{ id: 'src', value: `${icon}` }, { id: 'fill', value: 'red' }],
    };

    const link = new ElementCreator(params).getElement();
    link.append(new ElementCreator(paramsImg).getElement());


    const profile = this.elementCreator.getElement();
    profile.append(link);
  }
}

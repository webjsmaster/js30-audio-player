/**
 * @typedef {{
 *     tag: string,
 *     classNames: Array<string>,
 * }} ViewParams
 */
import ElementCreator from './element-creator.js';
import { Observer } from './observer.js';

export default class View extends Observer {
  /**
   * @param {import('./element-creator').ElementParams} params
   */
  constructor(params) {
    super();
    this.elementCreator = this.createView(params);
  }

  /**
   * @returns {HTMLElement}
   */
  getHtmlElement() {
    return this.elementCreator.getElement();
  }

  /**
   * @param {import('./element-creator').ElementParams} params
   * @returns {ElementCreator}
   */
  createView(params) {
    const elementParams = {
      tag: params.tag,
      classNames: params.classNames,
      textContent: params.textContent,
      callback: params.callback,
      attribute: params.attribute,
    };
    return new ElementCreator(elementParams);
  }
}

import Wrapper from './view/wrapper.js';

export default class App {
  constructor() {
    this.body = document.querySelector('#app');
    this.createHtmlElement();
  }

  createHtmlElement() {
    const content = new Wrapper();
    this.body.append(content.getHtmlElement());
  }
}

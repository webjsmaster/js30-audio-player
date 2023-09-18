import Wrapper from './view/wrapper.js';
import Poster from './view/main/content/poster/poster';
import Player from './view/main/content/player/player';

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

const poster = new Poster();
const player = new Player();
player.subscribe(poster);

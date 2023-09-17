import playImg from '../public/play2.png';
import pauseImg from '../public/pause2.png';
import arrowRightImg from '../public/arrowR1.png';

/**
 * @typedef {{
 * play: 'play',
 * arrowLeft: 'arrowLeft',
 * pause: 'pause',
 * arrowRight: 'arrowRight',
 * }} typeButton
 */

/**
 * @type {typeButton}
 */

const typeButton = {
  play: 'play',
  pause: 'pause',
  arrowLeft: 'arrowLeft',
  arrowRight: 'arrowRight',
};

const buttonImg = {
  play: playImg,
  pause: pauseImg,
  arrowLeft: 'arrowLeft',
  arrowRight: arrowRightImg,
};

export { typeButton, buttonImg };

import playImg from '../public/play2.png';
import pauseImg from '../public/pause2.png';
import arrowRightImg from '../public/arrowR1.png';
import arrowLeftImg from '../public/arrowL1.png';
import audio1 from '../public/Vandelux-Tulum.mp3';
import audio2 from '../public/Meute-Holy-harbour.mp3';

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
  arrowLeft: arrowLeftImg,
  arrowRight: arrowRightImg,
};

export {
  typeButton, buttonImg, audio1, audio2,
};

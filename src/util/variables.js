import playImg from '../public/play2.png';
import pauseImg from '../public/pause2.png';
import arrowRightImg from '../public/arrowR1.png';
import arrowLeftImg from '../public/arrowL1.png';
import audio1 from '../public/Vandelux-Tulum.mp3';
import audio2 from '../public/Meute-Holy-harbour.mp3';
import audio3 from '../public/Neon Project Feat. Ana - The Gate Of Passion.mp3';
import poster1 from '../public/vandelux.jpeg';
import poster2 from '../public/meute.jpg';
import poster3 from '../public/neon-audio2.jpg';

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

/**
 * @typedef {{
 * id: number,
 * poster: string,
 * name: string,
 * audio: string,
 * }} contentType
 */

/**
 * @type {[contentType]}
 */
const content = [
  {
    id: 1,
    poster: poster1,
    name: 'Vandelux - Tulum',
    audio: audio1,
  },
  {
    id: 2,
    poster: poster2,
    name: 'Meute - Holy harbour',
    audio: audio2,
  },
  {
    id: 3,
    poster: poster3,
    name: 'Neon Project Feat. Ana - The Gate Of Passion',
    audio: audio3,
  },
];

const posters = [poster1, poster2, poster3];

export {
  typeButton, buttonImg, audio1, audio2, audio3, posters, content,
};

import './range.scss';
import View from '../../../../../util/view.js';
import ElementCreator from '../../../../../util/element-creator.js';
import Player from '../player.js';

export default class Range extends View {
  constructor(duration) {
    /**
     * @type {import('../../util/element-creator.js').ElementParams} params
     */
    const params = {
      tag: 'div',
      textContent: '',
      classNames: ['range'],
      callback: null,
    };
    super(params);
    this.player = new Player();
    this.range = null;
    this.rangeRight = null;
    this.configureView(duration);
    this.updatePos();
  }

  configureView(duration) {
    const maxTime = duration || 500;
    /**
     * @type {import('../../util/element-creator.js').ElementParams} params
     */
    const params = {
      tag: 'input',
      textContent: '',
      classNames: [],
      callback: null,
      attribute: [{
        id: 'id',
        value: 'range',
      }, {
        id: 'type',
        value: 'range',
      }, {
        id: 'min',
        value: '0',
      }, {
        id: 'max',
        value: maxTime,
      }, {
        id: 'value',
        value: '0',
      }, {
        id: 'step',
        value: '1',
      }],
    };

    /**
     * @type {import('../../util/element-creator.js').ElementParams} params
     */
    const paramsLine = {
      tag: 'div',
      textContent: '',
      classNames: ['range-line'],
      callback: null,
    };
    /**
     * @type {import('../../util/element-creator.js').ElementParams} params
     */
    const paramsLineR = {
      tag: 'div',
      textContent: '',
      classNames: ['range-line-right'],
      callback: null,
    };
    /**
     * @type {import('../../util/element-creator.js').ElementParams} params
     */
    const paramsLineL = {
      tag: 'div',
      textContent: '',
      classNames: ['range-line-left'],
      callback: null,
    };
    const rangeBlock = this.elementCreator.getElement();
    const rangeLine = new ElementCreator(paramsLine).getElement();
    this.rangeRight = new ElementCreator(paramsLineR).getElement();
    const rangeLineL = new ElementCreator(paramsLineL).getElement();
    rangeLine.append(rangeLineL, this.rangeRight);
    this.range = new ElementCreator(params).getElement();
    this.range.addEventListener('input', () => {
      this.player.audio.currentTime = this.range.value;
      this.updatePos();
    });
    rangeBlock.append(this.range, rangeLine);
  }

  setValueRange(value) {
    if (value !== 'NaN') {
      this.range.value = value;
    }
  }

  getRangePercent() {
    const { max } = this.range;
    const { min } = this.range;
    const relativeValue = this.range.value - min;
    const ticks = max - min;
    const percent = relativeValue / ticks;
    return percent;
  }

  updatePos() {
    const percent = this.getRangePercent();
    const left = percent * 100;
    this.rangeRight.style.width = `calc(100% - ${left}%)`;
  }
}

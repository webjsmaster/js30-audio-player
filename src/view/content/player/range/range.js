import './range.scss';
import View from '../../../../util/view.js';
import ElementCreator from '../../../../util/element-creator.js';

export default class Range extends View {
  constructor() {
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
    this.range = null;
    this.rangeRight = null;
    this.configureView();
    this.updatePos();
  }

  configureView() {
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
        value: '99',
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
      this.updatePos();
    });
    rangeBlock.append(this.range, rangeLine);
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

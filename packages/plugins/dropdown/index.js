import Pop from './../pop';
import utils from './../../utils/utils';

const Default = {
  trigger: 'click',
  html: true,
  placement: 'bottom-start',
  template: `<div role="select" class="v-dropdown"><div class="v-dropdown-inner"></div></div>`,
  innerSelector: '.v-dropdown-inner',
  preventOverflow: true,
  type: 'dropdown',
  delay: 0,
  offset: '0, 1'
};

class Dropdown extends Pop {
  constructor(el, param) {
    param = utils.extend({}, Default, {
    }, param);
    if (!param.container) {
      param.getContainer = function (el) {
        let container = el || document.body;
        while (container && container.tagName != 'BODY' && container.tagName != 'HTML' && !utils.hasClass(container, 'v-dropdown-common-container')) {
          container = container.parentNode;
        }
        return container;
      };
    }
    super(el, param);
  }
}

export default Dropdown;

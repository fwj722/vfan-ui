import DatePicker from './datepicker';

/* istanbul ignore next */
DatePicker.install = function(Vue) {
  Vue.component(DatePicker.name, DatePicker);
};
export default DatePicker;

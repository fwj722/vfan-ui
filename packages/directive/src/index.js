
const directive = {};
directive.install = Vue => {
  Vue.directive("int", {
    inserted: function(el) {
      el.addEventListener("keypress", function(e) {
        // 通过正则过滤小数点后两位
        e.target.value = e.target.value.match(/^\d*(.?\d{0,1})/g)[0] || null;
      });
    }
  });
};

export default directive;

import VCard from "./src/card";

/* istanbul ignore next */
VCard.install = function(Vue) {
  Vue.component(VCard.name, VCard);
};

export default VCard;
import Player from "./src/player";
Player.install = function(Vue){
  Vue.component(Player.name, Player);
}
export default Player;

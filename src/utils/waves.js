//涟漪类，使其相对独立
class MavesClass {
  showWaves(_this, e) {
    let wavesDiv = _this.getElementsByClassName("waves");
    //第一次没有涟漪div，动态生成
    if (wavesDiv[0] == null) {
      const oSpan = document.createElement("span");
      oSpan.setAttribute("class", "waves mmd-waves-effect");
      _this.appendChild(oSpan);
      const len = _this.getElementsByTagName("span").length;
      wavesDiv = _this.getElementsByTagName("span")[len - 1];
    } else {
      //设置按钮样式为’waves-effect‘即去掉动画样式’waves-effect-animation‘
      // wavesDiv[0].className = "mmd-waves-effect";
      wavesDiv[0].setAttribute("class", "waves mmd-waves-effect");
    }

    //计算涟漪坐标（折算成左上角坐标而非中心点），涟漪大小（取外标签最长边）
    let wH =
      _this.offsetWidth > _this.offsetHeight
        ? _this.offsetWidth
        : _this.offsetHeight;
    let nX = e.offsetX - wH / 2;
    let nY = e.offsetY - wH / 2;

    let DivDom = null;

    if (!wavesDiv[0]) {
      //设置涟漪div样式，准备播放动画
      DivDom = wavesDiv;
    } else {
      DivDom = wavesDiv[0];
    }
    DivDom.style.width = wH + "px";
    DivDom.style.height = wH + "px";
    DivDom.style.left = nX + "px";
    DivDom.style.top = nY + "px";
    DivDom.setAttribute(
      "class",
      "waves mmd-waves-effect mmd-waves-effect-animation"
    );
  };
}

const waves = e => {
  const m = new MavesClass();
  m.showWaves(e.currentTarget, e);
};

export default  waves

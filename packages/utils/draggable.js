/**
 * author： fanwenjing
 * mail： 1508488207@qq.com
 * 此文件只适用于普通页面的文件引入，vue-drag.js可用于vue和普通页面，使用vue时建议选择vue-drag
 */
Object.prototype.tinyDraggable = function(options) {
  var settings = Object.assign({}, { handle: 0, exclude: 0 }, options);
  var handle = settings.handle ? settings.handle : "." + this.className;
  var _this = this;
  var handleDom = null;
  if (settings.exclude) {
    handleDom = _this;
  } else {
    handleDom = document.querySelector(handle);
  }
  handleDom.addEventListener(
    "mousedown",
    function(e) {
      if (settings.exclude) {
        var newStr = settings.exclude.replace(/\s*/g, "");
        var curName = null;
        if (e.target.className === "") {
          curName = e.target.tagName.toLowerCase();
        } else {
          curName = "." + e.target.className;
        }

        if (settings.exclude && newStr.split(",").indexOf(curName) > -1) return;
      }

      e.preventDefault();
      var event = e || window.event;
      var diffX = event.pageX - _this.offsetLeft;
      var diffY = event.pageY - _this.offsetTop;
      document.onmousemove = function(event) {
        var event = event || window.event;
        var moveX = event.pageX - diffX;
        var moveY = event.pageY - diffY;

        if (moveX < 0) {
          moveX = 0;
        } else if (moveX > window.innerWidth - _this.offsetWidth) {
          moveX = window.innerWidth - _this.offsetWidth;
        }
        if (moveY < 0) {
          moveY = 0;
        } else if (moveY > window.innerHeight - _this.offsetHeight) {
          moveY = window.innerHeight - _this.offsetHeight;
        }

        _this.style.left = moveX + "px";
        _this.style.top = moveY + "px";
      };
      document.onmouseup = function() {
        this.onmousemove = null;
        this.onmouseup = null;
      };
    },
    false
  );
};
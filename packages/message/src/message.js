/**
 * 消息提示组件
 * 
 * 1.调用
 * 字符串类型参数： $.message('成功');
 * 对象型参数：$.message({});
 * 
 * 2.参数详解
 *  message:' 操作成功',    //提示信息
    time:'2000',           //显示时间（默认：2s）
    type:'success',        //显示类型，包括4种：success.error,info,warning
    showClose:false,       //显示关闭按钮（默认：否）
    autoClose:true,        //是否自动关闭（默认：是）
 * 
 * type:success,error,info,warning
 */
var messageBox = Object.assign({
  message: (options) =>{
    var defaults = {
      message: " 提示消息",
      time: "2000",
      type: "success",
      showClose: false,
      icoImg: "",
      iconFont: "",
      autoClose: true,
      style:"",
      onClose: function () { },
    };
    if (typeof options === "string") {
      defaults.message = options;
    }
    if (typeof options === "object") {
      defaults = Object.assign({}, defaults, options);
    }
    //message模版
    var templateClose = document.createElement("a");
    templateClose.className = "c-message--close";
    var closeBtn = document.createTextNode("×");
    templateClose.appendChild(closeBtn);

    var template = document.createElement("div");
    template.className = "c-message messageFadeInDown";
    template.id = "message-wrap";

    var innerEle = document.createElement("div");
    innerEle.className = "c-message--main";

    var icoEle = document.createElement("i");
    if (defaults.icoImg) {
      if (defaults.iconFont) {
        icoEle.className = "c-message--icon " + defaults.iconFont;
        if(defaults.style){
          icoEle["style"].cssText=JSON.stringify(defaults.style).replace(/^{|}|"|'$/g,"").replace(",",";")
        }
      } else {
        icoEle.className = "c-message--icon";
        var imgDom = document.createElement("img");
        imgDom.src = checkIcon(defaults.icoImg);
        imgDom.style.maxWidth = "40px";
        imgDom.style.maxHeight = "40px";
        icoEle.appendChild(imgDom);
      }
    } else {
      if (defaults.iconFont) {
        icoEle.className = "c-message--icon " + defaults.iconFont;
        if(defaults.style){
          icoEle["style"].cssText=JSON.stringify(defaults.style).replace(/^{|}|"|'$/g,"").replace(",",";")
        }
      } else {
        icoEle.className = " c-message--icon c-message--" + defaults.type;
      }
    }

    innerEle.appendChild(icoEle);
    if (defaults.showClose) {
      innerEle.appendChild(templateClose);
    }

    var innerNode = document.createTextNode(defaults.message);
    var outEle = document.createElement("div");
    outEle.className = "c-message--tip";
    outEle.appendChild(innerNode);
    innerEle.appendChild(outEle);
    template.appendChild(innerEle);

    var $body = document.querySelector("body");
    var $message = template;
    var timer;
    var closeFn, removeFn;
    $body.appendChild(template);
    //关闭
    closeFn = function () {
      $message.classList.add('messageFadeOutUp');
      timer = setTimeout(function () {
        removeFn()
      }, 600);
    };
    //移除
    removeFn = function () {
      $message&&$message.parentNode&&$message.parentNode.removeChild($message)
      defaults.onClose(defaults);
      clearTimeout(timer);
    };
    // 全部移除
    document.querySelector(".c-message")&&document.querySelector(".c-message").parentNode.removeChild(document.querySelector(".c-message"))
    $body.appendChild($message);
    //居中
    $message.style.marginLeft = "-" + $message.offsetWidth / 2 + "px"

    //点击关闭
    templateClose.addEventListener("click", function () {
      closeFn();
    });

    //自动关闭
    if (defaults.autoClose) {
      timer = setTimeout(function () {
        closeFn();
      }, defaults.time);
    }
  },
});

function checkIcon(value) {
  const PICTURE_EXPRESSION = /\.(png|jpe?g|gif|svg)(\?.*)?$/; // 图片
  const URL_REGULAR_EXPRESSION = /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- ./?%&=]*)?/; // url正则
  if (
    (value.startsWith("data:image/") && value.indexOf(";base64")) ||
    PICTURE_EXPRESSION.test(value) ||
    URL_REGULAR_EXPRESSION.test(value)
  ) {
    // 是base64  ||带图片格式的名称  ||http/https路径
    return value;
  } else {
    console.error(
      "图片路径错误，此处设置的value值为字体图标|本地图片路径|网络图片路径|base64"
    );
  }
}
export default messageBox


;(function () {
  var fan = function (node) {
    return new fan.prototype.init(node)
  }

  var rClass = /[\t\r\n\f]/g;
  var rNotWhite = (/\S+/g);
  rTrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
  //方法类
  fan.prototype = {
    init: function (param) {
      var param = param.trim()
      var mark = param.charAt(0)
      if (mark == '#') {
        this.dom = [document.getElementById(param.substring(1))] //获取
      } else if (mark == '.') {
        this.dom = [].slice.call(
          document.getElementsByClassName(param.substring(1))
        )
      } else {
        this.dom = [].slice.call(document.getElementsByTagName(param))
      }
      return this
    },
    trim: "".trim && !"".trim.call("\uFEFF\xA0") ?
		function( text ) {
			return text == null ?
				"" :
				"".trim.call( text );
		} :
		function( text ) {
			return text == null ?
				"" :
				( text + "" ).replace( rTrim, "" );
		},
    //添加css成功
    css: function () {
      if (arguments.length % 2 != 0) {
        console.log('请输入偶数的参数')
        return false
      }
      for (var i = 0; i <= arguments.length; i += 2) {
        this.dom[0].style[arguments[i]] = arguments[i + 1]
      }
    },

    addClass: function(cls){ 
      var classes = ( cls || "" ).match( rNotWhite ) || [];
      var elem,cur,cLaz,finalValue;
			for (var i = 0, len = this.dom.length; i < len; i++ ) {
				elem = this.dom[i];
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rClass, " " ) :
					" "
				);
				if ( cur ) {
					j = 0;
					while ( (cLaz = classes[j++]) ) {
						if ( cur.indexOf( " " + cLaz + " " ) < 0 ) {
							cur += cLaz + " ";
						}
          }
					finalValue =this.trim(cur);
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
     },

    //添加class
    hasClass: function( cls ) {
      var className = " " + cls + " ";
      for (var i = 0,l = this.dom.length ; i < l; i++ ) {
        if ( this.dom[i].nodeType === 1 && (" " + this.dom[i].className + " ").replace(rClass, " ").indexOf( className ) >= 0 ) {
          return true;
        }
      }
      return false;
    },

    //删除class单个样式成功
    removeClass: function (sclass) {
      for(var i=0;i<this.dom.length;i++){
        this.dom[i].classList.remove(sclass)
      }
    },
    //添加attr单个属性成功
    attr: function (sname, sval) {
      this[0].setAttribute[sname] = sval
    },

    //获取单个父元素成功
    parent: function () {
      this[0] = this[0].parentElement
      return this
    },

    //获取所有下一级的子元素
    children: function (num) {
      if (num == null) {
        this[0] = this[0].children
        console.log(this)
        return this
      } else {
        this[0] = this[0].children[num]
        console.log(this)
        return this
      }
    },

    //设置表单的值成功(成功)
    val: function (arguments) {
      if (arguments == null) {
        return this[0].value
      } else {
        return (this[0].value = arguments)
      }
    },
    //转换为html代码成功(成功)
    html: function (arguments) {
      if (arguments == null) {
        console.log(this[0].innerHTML)
        return (this[0].innerHTML = null)
      } else {
        console.log(this[0].innerHTML)
        return (this[0].innerHTML = arguments)
      }
    },
    //获取文本值成功
    text: function (arguments) {
      if (arguments == null || arguments == undefined) {
        return this.dom.innerText
      } else {
        return this.dom.map((v) => (v.innerText = arguments))
      }
    },
    //前面追加节点成功
    prepend: function (arguments) {
      return (this[0].innerHTML = arguments + this[0].innerHTML)
    },
    //后面追加节点成功
    append: function (arguments) {
      //因为appendChild方法，追加节点必须创建一个对象，所以我这里，用的innerHTML方法。
      //var para = document.createElement(arguments);
      //return this[0].appendChild(para);
      return (this[0].innerHTML += arguments)
    },
    get: function (url, fn) {
      // XMLHttpRequest对象用于在后台与服务器交换数据
      var xhr = new XMLHttpRequest()
      xhr.open('GET', url, true)
      xhr.onreadystatechange = function () {
        // readyState == 4说明请求已完成
        if ((xhr.readyState == 4 && xhr.status == 200) || xhr.status == 304) {
          // 从服务器获得数据
          fn.call(this, xhr.responseText)
          console.log(xhr.responseText)
        }
      }
      xhr.send()
    },
    // datat应为'a=a1&b=b1'这种字符串格式，在jq里如果data为对象会自动将对象转成这种字符串格式
    post: function (url, data, fn) {
      var xhr = new XMLHttpRequest()
      xhr.open('POST', url, true)
      // 添加http头，发送信息至服务器时内容编码类型
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
      xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 304)) {
          fn.call(this, xhr.responseText)
        }
      }
      xhr.send(data)
    },
    ajax: function () {},

    //淡入成功
    show: function (time = 200) {
      var num = 0
      this[0].style.display = 'block'
      this[0].style.opacity = num
      var st = setInterval(() => {
        num++
        this[0].style.opacity = num / 10
        if (num >= 10) {
          clearInterval(st)
        }
      }, time)
    },
    //淡出成功
    hide: function (time = 200) {
      var num = 10
      var st = setInterval(() => {
        num--
        this[0].style.opacity = num / 10
        if (num <= 0) {
          clearInterval(st)
        }
      }, time)
    },
    //移入事件成功
    onmouseover: function (fun) {
      this[0].onmouseover = fun
      //console.log(this[0].childNodes);//不让子节点有移入方法
      /*for(var i=0;i<this[0].childNodes.length;i++){
              this[0].childNodes[i].onmouseover = null;
          }*/
      return this
    },
    //移出事件成功
    onmouseout: function (fun) {
      this[0].onmouseout = fun
      return this
    },
    //移入移出事件成功
    hover: function (fun1, fun2) {
      this[0].onmouseover = fun1
      this[0].onmouseout = fun2
      return this
    },
    //toggleClass添加删除成功
    toggleClass: function (sclass) {
      console.log(arguments)
      for (var i = 0; i < arguments.length; i++) {
        if (this[0].classList.contains(arguments[i])) {
          this[0].classList.remove(arguments[i])
        } else {
          this[0].classList.add(arguments[i])
        }
      }
    },

    //点击事件成功
    onclick: function (fun) {
      this[0].onclick = fun
      return this
    },
    //双击事件成功
    ondblclick: function (fun) {
      this[0].ondblclick = fun
      return this
    },
    //鼠标释放事件成功
    onmouseup: function (fun) {
      this[0].onmouseup = fun
      return this
    },
    //光标聚集事件成功
    onfocus: function (fun) {
      this[0].onfocus = fun
      return this
    },
    //失焦事件事件成功
    onblur: function (fun) {
      this[0].onblur = fun
      return this
    },
    //内容选中事件
    onselect: function (fun) {
      this[0].onselect = fun
      return this
    },
    //文本框内容改变事件
    onchange: function (fun) {
      this[0].onchange = fun
      return this
    },
    //加载事件
    onload: function (fun) {
      this[0].onload = fun
      return this
    },
    //卸载事件
    onunload: function (fun) {
      this[0].onunload = fun
      return this
    },
    //设置高度成功
    height: function (arguments) {
      if (arguments == null) {
        return this[0].clientHeight
      } else {
        return (this[0].clientHeight = arguments)
      }
    },
    //设置宽度成功
    width: function (arguments) {
      if (arguments == null) {
        return this[0].clientWidth
      } else {
        return (this[0].clientWidth = arguments)
      }
    },
  }

  fan.prototype.init.prototype = fan.prototype //把fan的原型赋值给init的原型
  window.f = window.fan = fan
})()

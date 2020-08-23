// ==========================================================================
// 全屏
// ==========================================================================

import browser from './utils/browser';
import { closest,getElements, hasClass, toggleClass } from './utils/elements';
import { on, triggerEvent } from './utils/events';
import is from './utils/is';
import { silencePromise } from './utils/promise';

class Fullscreen {
  constructor(player) {
    // 继承父级属性
    this.player = player;

    // 获取前缀
    this.prefix = Fullscreen.prefix;
    this.property = Fullscreen.property;

    // 滚动位置，默认是 x: 0, y: 0
    this.scrollPosition = { x: 0, y: 0 };


    this.forceFallback = player.config.fullscreen.fallback === 'force';

    // Get the fullscreen element
    // Checks container is an ancestor, defaults to null
    //获取全屏element元素
    //检查容器是不是一个祖先元素，默认为空
    this.player.elements.fullscreen =
      player.config.fullscreen.container && closest(this.player.elements.container, player.config.fullscreen.container);

    //注册事件监听器
     //处理事件（如果用户按下esc等键）
    on.call(
      this.player,
      document,
      this.prefix === 'ms' ? 'MSFullscreenChange' : `${this.prefix}fullscreenchange`,
      () => {
        // TODO: 过滤目标元素？
        this.onChange();
      },
    );

    // 双击时全屏切换
    on.call(this.player, this.player.elements.container, 'dblclick', event => {
      // 忽略控件中的双击
      if (is.element(this.player.elements.controls) && this.player.elements.controls.contains(event.target)) {
        return;
      }

      this.toggle();
    });

    // 全屏时点击焦点
    on.call(this, this.player.elements.container, 'keydown', event => this.trapFocus(event));

    // 更新用户界面
    this.update();
  }

  // 确定是否支持本机
  static get native() {
    return !!(
      document.fullscreenEnabled ||
      document.webkitFullscreenEnabled ||
      document.mozFullScreenEnabled ||
      document.msFullscreenEnabled
    );
  }

   // 判断使用自带全屏
  get usingNative() {
    return Fullscreen.native && !this.forceFallback;
  }

  //获取前缀
  static get prefix() {
    // 当无前缀的时候
    if (is.function(document.exitFullscreen)) {
      return '';
    }

    // 检查前缀的支持情况
    let value = '';
    const prefixes = ['webkit', 'moz', 'ms'];

    prefixes.some(pre => {
      if (is.function(document[`${pre}ExitFullscreen`]) || is.function(document[`${pre}CancelFullScreen`])) {
        value = pre;
        return true;
      }

      return false;
    });

    return value;
  }

  static get property() {
    return this.prefix === 'moz' ? 'FullScreen' : 'Fullscreen';
  }

  // 判断是否启动了全屏
  get enabled() {
    return (
      (Fullscreen.native || this.player.config.fullscreen.fallback) &&
      this.player.config.fullscreen.enabled &&
      this.player.supported.ui &&
      this.player.isVideo
    );
  }

  // 获取激活状态
  get active() {
    if (!this.enabled) {
      return false;
    }

  
    if (!Fullscreen.native || this.forceFallback) {
      return hasClass(this.target, this.player.config.classNames.fullscreen.fallback);
    }

    const element = !this.prefix ? document.fullscreenElement : document[`${this.prefix}${this.property}Element`];

    return element && element.shadowRoot ? element === this.target.getRootNode().host : element === this.target;
  }

  // 获取当前元素
  get target() {
    return browser.isIos && this.player.config.fullscreen.iosNative
      ? this.player.media
      : this.player.elements.fullscreen || this.player.elements.container;
  }

  onChange() {
    if (!this.enabled) {
      return;
    }

    //获取更新的按钮元素
    const button = this.player.elements.buttons.fullscreen;
    if (is.element(button)) {
      button.pressed = this.active;
    }

    // 触发事件
    triggerEvent.call(this.player, this.target, this.active ? 'enterfullscreen' : 'exitfullscreen', true);
  }

  toggleFallback(toggle = false) {
    // 存储或恢复滚动位置
    if (toggle) {
      this.scrollPosition = {
        x: window.scrollX || 0,
        y: window.scrollY || 0,
      };
    } else {
      window.scrollTo(this.scrollPosition.x, this.scrollPosition.y);
    }

    // 切换滚动
    document.body.style.overflow = toggle ? 'hidden' : '';

    // 切换class类
    toggleClass(this.target, this.player.config.classNames.fullscreen.fallback, toggle);

    // 在iPhone X +上强制全视口
    if (browser.isIos) {
      let viewport = document.head.querySelector('meta[name="viewport"]');
      const property = 'viewport-fit=cover';

      // 根据需要注入视口元
      if (!viewport) {
        viewport = document.createElement('meta');
        viewport.setAttribute('name', 'viewport');
      }

      //检查属性是否已经存在
      const hasProperty = is.string(viewport.content) && viewport.content.includes(property);

      if (toggle) {
        this.cleanupViewport = !hasProperty;

        if (!hasProperty) {
          viewport.content += `,${property}`;
        }
      } else if (this.cleanupViewport) {
        viewport.content = viewport.content
          .split(',')
          .filter(part => part.trim() !== property)
          .join(',');
      }
    }

    // 切换按钮和触发事件
    this.onChange();
  }

 
  trapFocus(event) {
    if (browser.isIos || !this.active || event.key !== 'Tab' || event.keyCode !== 9) {
      return;
    }

    // 获取当前焦点元素
    const focused = document.activeElement;
    const focusable = getElements.call(this.player, 'a[href], button:not(:disabled), input:not(:disabled), [tabindex]');
    const [first] = focusable;
    const last = focusable[focusable.length - 1];

    if (focused === last && !event.shiftKey) {
      //如果不使用Shift，将焦点移到第一个可以加标签的元素上
      first.focus();
      event.preventDefault();
    } else if (focused === first && event.shiftKey) {
      //如果使用Shift，则将焦点移动到可加标签的最后一个元素
      last.focus();
      event.preventDefault();
    }
  }

  //更新iu界面
  update() {
    if (this.enabled) {
      let mode;

      if (this.forceFallback) {
        mode = 'Fallback (forced)';
      } else if (Fullscreen.native) {
        mode = 'Native';
      } else {
        mode = 'Fallback';
      }

      this.player.debug.log(`${mode} fullscreen enabled`);
    } else {
      this.player.debug.log('Fullscreen not supported and fallback disabled');
    }

    // 添加样式显示按钮
    toggleClass(this.player.elements.container, this.player.config.classNames.fullscreen.enabled, this.enabled);
  }


  enter() {
    if (!this.enabled) {
      return;
    }

    if (browser.isIos && this.player.config.fullscreen.iosNative) {
      this.target.webkitEnterFullscreen();
    } else if (!Fullscreen.native || this.forceFallback) {
      this.toggleFallback(true);
    } else if (!this.prefix) {
      this.target.requestFullscreen({ navigationUI: 'hide' });
    } else if (!is.empty(this.prefix)) {
      this.target[`${this.prefix}Request${this.property}`]();
    }
  }


  exit() {
    if (!this.enabled) {
      return;
    }

    // iOS原生本机全屏
    if (browser.isIos && this.player.config.fullscreen.iosNative) {
      this.target.webkitExitFullscreen();
      silencePromise(this.player.play());
    } else if (!Fullscreen.native || this.forceFallback) {
      this.toggleFallback(false);
    } else if (!this.prefix) {
      (document.cancelFullScreen || document.exitFullscreen).call(document);
    } else if (!is.empty(this.prefix)) {
      const action = this.prefix === 'moz' ? 'Cancel' : 'Exit';
      document[`${this.prefix}${action}${this.property}`]();
    }
  }

  // 切换状态
  toggle() {
    if (!this.active) {
      this.enter();
    } else {
      this.exit();
    }
  }
}

export default Fullscreen;

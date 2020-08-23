/**
 * 事件监听
 */
import controls from './controls';
import ui from './ui';
import { repaint } from './utils/animation';
import browser from './utils/browser';
import { getElement, getElements, matches, toggleClass } from './utils/elements';
import { off, on, once, toggleListener, triggerEvent } from './utils/events';
import is from './utils/is';
import { silencePromise } from './utils/promise';
import { getAspectRatio, setAspectRatio } from './utils/style';

class Listeners {
  constructor(player) {
    this.player = player;
    this.lastKey = null;
    this.focusTimer = null;
    this.lastKeyDown = null;

    this.handleKey = this.handleKey.bind(this);
    this.toggleMenu = this.toggleMenu.bind(this);
    this.setTabFocus = this.setTabFocus.bind(this);
    this.firstTouch = this.firstTouch.bind(this);
  }

  // 按键操作
  handleKey(event) {
    const { player } = this;
    const { elements } = player;
    const code = event.keyCode ? event.keyCode : event.which;
    const pressed = event.type === 'keydown';
    const repeat = pressed && code === this.lastKey;

    // 如果设置了修饰键，释放，直接返回false，结束执行
    if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) {
      return;
    }

    if (!is.number(code)) {
      return;
    }

    // 按数字键查找
    const seekByKey = () => {
      // 将最大持续时间除以十
      player.currentTime = (player.duration / 10) * (code - 48);
    };

  //处理按键时的按键,重置键盘
    if (pressed) {
      // 检查焦点元素，并且焦点元素不可编辑，以及任何接受键输入的内容，例如： 文本输入text input
      const focused = document.activeElement;
      if (is.element(focused)) {
        const { editable } = player.config.selectors;
        const { seek } = elements.inputs;

        if (focused !== seek && matches(focused, editable)) {
          return;
        }

        if (event.which === 32 && matches(focused, 'button, [role^="menuitem"]')) {
          return;
        }
      }

      // 应该阻止以下默认键码
      const preventDefault = [32, 37, 38, 39, 40, 48, 49, 50, 51, 52, 53, 54, 56, 57, 67, 70, 73, 75, 76, 77, 79];

     
      if (preventDefault.includes(code)) {
        event.preventDefault();
        event.stopPropagation();
      }

      switch (code) {
        case 48:
        case 49:
        case 50:
        case 51:
        case 52:
        case 53:
        case 54:
        case 55:
        case 56:
        case 57:
          // 0-9
          if (!repeat) {
            seekByKey();
          }
          break;

        case 32:
        case 75:
          // Space空格键 and k键
          if (!repeat) {
            silencePromise(player.togglePlay());
          }
          break;

        case 38:
          // 向上键
          player.increaseVolume(0.1);
          break;

        case 40:
          // 向下键
          player.decreaseVolume(0.1);
          break;

        case 77:
          // M键
          if (!repeat) {
            player.muted = !player.muted;
          }
          break;

        case 39:
          // 向右键（前进键）
          player.forward();
          break;

        case 37:
          //向左键（返回键）
          player.rewind();
          break;

        case 70:
          // F 键
          player.fullscreen.toggle();
          break;

        case 67:
          // C 键
          if (!repeat) {
            player.toggleCaptions();
          }
          break;

        case 76:
          // L 键
          player.loop = !player.loop;
          break;

        /* case 73:
                    this.setLoop('start');
                    break;

                case 76:
                    this.setLoop();
                    break;

                case 79:
                    this.setLoop('end');
                    break; */

        default:
          break;
      }

      //在全屏模式下，Esc键是本地处理的,我们只需要考虑是否active
      if (code === 27 && !player.fullscreen.usingNative && player.fullscreen.active) {
        player.fullscreen.toggle();
      }


      this.lastKey = code;
    } else {
      this.lastKey = null;
    }
  }

  //切换菜单
  toggleMenu(event) {
    controls.toggleMenu.call(this.player, event);
  }

  //设备已启用touch（是否启用触摸模式）
  firstTouch() {
    const { player } = this;
    const { elements } = player;

    player.touch = true;

    // 增加touch的class类
    toggleClass(elements.container, player.config.classNames.isTouch, true);
  }

  setTabFocus(event) {
    const { player } = this;
    const { elements } = player;

    clearTimeout(this.focusTimer);

    // 忽略tab以外的任何键
    if (event.type === 'keydown' && event.which !== 9) {
      return;
    }

    // 存储对事件timeStamp的引用
    if (event.type === 'keydown') {
      this.lastKeyDown = event.timeStamp;
    }

    //删除当前classes
    const removeCurrent = () => {
      const className = player.config.classNames.tabFocus;
      const current = getElements.call(player, `.${className}`);
      toggleClass(current, className, false);
    };

    // 判断是否按下了一个按键来触发此事件
    const wasKeyDown = event.timeStamp - this.lastKeyDown <= 20;

    // 如果事先按下某个键，则忽略焦点事件
    if (event.type === 'focus' && !wasKeyDown) {
      return;
    }
    //移除当前所有的事件
    removeCurrent();

    //延迟类名的添加，直到焦点改变,此事件在事件焦点之前触发
    if (event.type !== 'focusout') {
      this.focusTimer = setTimeout(() => {
        const focused = document.activeElement;

        // 忽略当前焦点元素是否不在播放器内部
        if (!elements.container.contains(focused)) {
          return;
        }

        toggleClass(document.activeElement, player.config.classNames.tabFocus, true);
      }, 10);
    }
  }


  global(toggle = true) {
    const { player } = this;

    // 键盘快捷键
    if (player.config.keyboard.global) {
      toggleListener.call(player, window, 'keydown keyup', this.handleKey, toggle, false);
    }

    // 单击任意位置关闭菜单
    toggleListener.call(player, document.body, 'click', this.toggleMenu, toggle);

    // 通过事件检测触摸
    once.call(player, document.body, 'touchstart', this.firstTouch);

    // 标签焦点检测
    toggleListener.call(player, document.body, 'keydown focus blur focusout', this.setTabFocus, toggle, false, true);
  }

  // 容器监听
  container() {
    const { player } = this;
    const { config, elements, timers } = player;

    // 键盘快捷键
    if (!config.keyboard.global && config.keyboard.focused) {
      on.call(player, elements.container, 'keydown keyup', this.handleKey, false);
    }

    // 切换鼠标事件并进入全屏模式
    on.call(
      player,
      elements.container,
      'mousemove mouseleave touchstart touchmove enterfullscreen exitfullscreen',
      event => {
        const { controls: controlsElement } = elements;

        // 删除全屏按钮状态
        if (controlsElement && event.type === 'enterfullscreen') {
          controlsElement.pressed = false;
          controlsElement.hover = false;
        }

        //显示，然后在超时后隐藏，除非发生另一个控制事件
        const show = ['touchstart', 'touchmove', 'mousemove'].includes(event.type);
        let delay = 0;

        if (show) {
          ui.toggleControls.call(player, true);
          // 为触摸设备使用更长的超时时间
          delay = player.touch ? 3000 : 2000;
        }

        //清除定时器
        clearTimeout(timers.controls);

        // Set new timer to prevent flicker when seeking
        //设置新的定时器，以防止操作时闪烁闪烁的问题
        timers.controls = setTimeout(() => ui.toggleControls.call(player, false), delay);
      },
    );

    // Set a gutter for Vimeo
    const setGutter = (ratio, padding, toggle) => {
      // if (!player.isVimeo || player.config.vimeo.premium) {
      //   return;
      // }

      const target = player.elements.wrapper.firstChild;
      const [, y] = ratio;
      const [videoX, videoY] = getAspectRatio.call(player);

      target.style.maxWidth = toggle ? `${(y / videoY) * videoX}px` : null;
      target.style.margin = toggle ? '0 auto' : null;
    };
    // 当全屏发生更改时调整大小
    const setPlayerSize = measure => {
      //当不需要监听视口时
      if (!measure) {
        return setAspectRatio.call(player);
      }

      const rect = elements.container.getBoundingClientRect();
      const { width, height } = rect;

      return setAspectRatio.call(player, `${width}:${height}`);
    };

    const resized = () => {
      clearTimeout(timers.resized);
      timers.resized = setTimeout(setPlayerSize, 50);
    };

    on.call(player, elements.container, 'enterfullscreen exitfullscreen', event => {
      const { target, usingNative } = player.fullscreen;

      // 将不是target的事件忽略掉
      if (target !== elements.container) {
        return;
      }

      // 如果不是嵌入且未指定比率
      if (!player.isEmbed && is.empty(player.config.ratio)) {
        return;
      }

      const isEnter = event.type === 'enterfullscreen';
       // 如果未使用浏览器自带全屏API，则需要检查视口的大小
      const { padding, ratio } = setPlayerSize(isEnter);

      // Set Vimeo gutter
      setGutter(ratio, padding, isEnter);
      if (!usingNative) {
        if (isEnter) {
          on.call(player, window, 'resize', resized);
        } else {
          off.call(player, window, 'resize', resized);
        }
      }
    });
  }

  //对media事件进行监听
  media() {
    const { player } = this;
    const { elements } = player;

    // 媒体时间变更
    on.call(player, player.media, 'timeupdate seeking seeked', event => controls.timeUpdate.call(player, event));

    // 显示持续时间
    on.call(player, player.media, 'durationchange loadeddata loadedmetadata', event =>
      controls.durationUpdate.call(player, event),
    );


    on.call(player, player.media, 'ended', () => {
      // 结束时显示poster
      if (player.isHTML5 && player.isVideo && player.config.resetOnEnd) {
        // 重播
        player.restart();

        //结束后暂停，否则IE11将再次开始播放视频
        player.pause();
      }
    });

    // 检查缓冲区进度
    on.call(player, player.media, 'progress playing seeking seeked', event =>
      controls.updateProgress.call(player, event),
    );

    // 处理音量变化
    on.call(player, player.media, 'volumechange', event => controls.updateVolume.call(player, event));

    // 处理播放/暂停
    on.call(player, player.media, 'playing play pause ended emptied timeupdate', event =>
      ui.checkPlaying.call(player, event),
    );

    // 加载状态
    on.call(player, player.media, 'waiting canplay seeked playing', event => ui.checkLoading.call(player, event));

    //点击视频
    if (player.supported.ui && player.config.clickToPlay && !player.isAudio) {
      //重新获取容器
      const wrapper = getElement.call(player, `.${player.config.classNames.video}`);

      // 如果没有容器包裹则停止并返回，这永远不会发生
      if (!is.element(wrapper)) {
        return;
      }

      // 点击播放时，暂停或重新启动
      on.call(player, elements.container, 'click', event => {
        const targets = [elements.container, wrapper];


        //如果没有容器，就忽略是否单击
        if (!targets.includes(event.target) && !wrapper.contains(event.target)) {
          return;
        }

        //如果隐藏，触摸设备将仅显示控件
        if (player.touch && player.config.hideControls) {
          return;
        }

        if (player.ended) {
          this.proxy(event, player.restart, 'restart');
          this.proxy(
            event,
            () => {
              silencePromise(player.play());
            },
            'play',
          );
        } else {
          this.proxy(
            event,
            () => {
              silencePromise(player.togglePlay());
            },
            'play',
          );
        }
      });
    }

    // 禁用右键
    if (player.supported.ui && player.config.disableContextMenu) {
      on.call(
        player,
        elements.wrapper,
        'contextmenu',
        event => {
          event.preventDefault();
        },
        false,
      );
    }

    // 音量变化
    on.call(player, player.media, 'volumechange', () => {
      // 保存到storage存储
      player.storage.set({
        volume: player.volume,
        muted: player.muted,
      });
    });

    // Speed速度改变
    on.call(player, player.media, 'ratechange', () => {
      // 更新界面
      controls.updateSetting.call(player, 'speed');

      //保存到storage存储
      player.storage.set({ speed: player.speed });
    });

    // 画质改变
    on.call(player, player.media, 'qualitychange', event => {
      // 更新界面
      controls.updateSetting.call(player, 'quality', null, event.detail.quality);
    });

    //画质发生变化时更新下载链接
    on.call(player, player.media, 'ready qualitychange', () => {
      controls.setDownloadUrl.call(player);
    });

    // 使Edge的关键事件冒泡
    const proxyEvents = player.config.events.concat(['keyup', 'keydown']).join(' ');

    on.call(player, player.media, proxyEvents, event => {
      let { detail = {} } = event;

      //从媒体获取错误详细信息
      if (event.type === 'error') {
        detail = player.media.error;
      }

      triggerEvent.call(player, elements.container, event.type, true, detail);
    });
  }

  // 运行默认或自定义的handler
  proxy(event, defaultHandler, customHandlerKey) {
    const { player } = this;
    const customHandler = player.config.listeners[customHandlerKey];
    const hasCustomHandler = is.function(customHandler);
    let returned = true;

    // 执行自定义的handler
    if (hasCustomHandler) {
      returned = customHandler.call(player, event);
    }

    //如果未在自定义handler中阻止，则仅调用默认handler
    if (returned !== false && is.function(defaultHandler)) {
      defaultHandler.call(player, event);
    }
  }

  // 触发自定义和默认handler
  bind(element, type, defaultHandler, customHandlerKey, passive = true) {
    const { player } = this;
    const customHandler = player.config.listeners[customHandlerKey];
    const hasCustomHandler = is.function(customHandler);

    on.call(
      player,
      element,
      type,
      event => this.proxy(event, defaultHandler, customHandlerKey),
      passive && !hasCustomHandler,
    );
  }

  // 监听控制事件
  controls() {
    const { player } = this;
    const { elements } = player;

    //IE不支持input事件，因此回退以进行更改
    const inputEvent = browser.isIE ? 'change' : 'input';

    // 播放/暂停切换
    if (elements.buttons.play) {
      Array.from(elements.buttons.play).forEach(button => {
        this.bind(
          button,
          'click',
          () => {
            silencePromise(player.togglePlay());
          },
          'play',
        );
      });
    }

    // 暂停
    this.bind(elements.buttons.restart, 'click', player.restart, 'restart');

    // Rewind
    this.bind(elements.buttons.rewind, 'click', player.rewind, 'rewind');

    // Rewind
    this.bind(elements.buttons.fastForward, 'click', player.forward, 'fastForward');

    // 静音切换
    this.bind(
      elements.buttons.mute,
      'click',
      () => {
        player.muted = !player.muted;
      },
      'mute',
    );

    // 字幕切换
    this.bind(elements.buttons.captions, 'click', () => player.toggleCaptions());

    // 下载
    this.bind(
      elements.buttons.download,
      'click',
      () => {
        triggerEvent.call(player, player.media, 'download');
      },
      'download',
    );

    // 全屏切换
    this.bind(
      elements.buttons.fullscreen,
      'click',
      () => {
        player.fullscreen.toggle();
      },
      'fullscreen',
    );

    //画中画
    this.bind(
      elements.buttons.pip,
      'click',
      () => {
        player.pip = 'toggle';
      },
      'pip',
    );

    // airplay
    this.bind(elements.buttons.airplay, 'click', player.airplay, 'airplay');

    //设置菜单-单击切换
    this.bind(
      elements.buttons.settings,
      'click',
      event => {
        //防止文档单击侦听器关闭菜单
        event.stopPropagation();
        event.preventDefault();

        controls.toggleMenu.call(player, event);
      },
      null,
      false,
    ); 

    // 设置菜单-键盘切换
    //必须绑定到keyup，否则当keydown事件处理程序转移焦点时，Firefox会触发单击
    this.bind(
      elements.buttons.settings,
      'keyup',
      event => {
        const code = event.which;

        // We only care about space and return
        if (![13, 32].includes(code)) {
          return;
        }

        // Because return triggers a click anyway, all we need to do is set focus
        if (code === 13) {
          controls.focusFirstMenuItem.call(player, null, true);
          return;
        }

        // Prevent scroll
        event.preventDefault();

        // Prevent playing video (Firefox)
        event.stopPropagation();

        // Toggle menu
        controls.toggleMenu.call(player, event);
      },
      null,
      false, // Can't be passive as we're preventing default
    );

    // Escape closes menu
    this.bind(elements.settings.menu, 'keydown', event => {
      if (event.which === 27) {
        controls.toggleMenu.call(player, event);
      }
    });

    // Set range input alternative "value", which matches the tooltip time (#954)
    this.bind(elements.inputs.seek, 'mousedown mousemove', event => {
      const rect = elements.progress.getBoundingClientRect();
      const percent = (100 / rect.width) * (event.pageX - rect.left);
      event.currentTarget.setAttribute('seek-value', percent);
    });

    // Pause while seeking
    this.bind(elements.inputs.seek, 'mousedown mouseup keydown keyup touchstart touchend', event => {
      const seek = event.currentTarget;
      const code = event.keyCode ? event.keyCode : event.which;
      const attribute = 'play-on-seeked';

      if (is.keyboardEvent(event) && code !== 39 && code !== 37) {
        return;
      }

      // Record seek time so we can prevent hiding controls for a few seconds after seek
      player.lastSeekTime = Date.now();

      // Was playing before?
      const play = seek.hasAttribute(attribute);
      // Done seeking
      const done = ['mouseup', 'touchend', 'keyup'].includes(event.type);

      // If we're done seeking and it was playing, resume playback
      if (play && done) {
        seek.removeAttribute(attribute);
        silencePromise(player.play());
      } else if (!done && player.playing) {
        seek.setAttribute(attribute, '');
        player.pause();
      }
    });

    // Fix range inputs on iOS
    // Super weird iOS bug where after you interact with an <input type="range">,
    // it takes over further interactions on the page. This is a hack
    if (browser.isIos) {
      const inputs = getElements.call(player, 'input[type="range"]');
      Array.from(inputs).forEach(input => this.bind(input, inputEvent, event => repaint(event.target)));
    }

    // Seek
    this.bind(
      elements.inputs.seek,
      inputEvent,
      event => {
        const seek = event.currentTarget;
        // If it exists, use seek-value instead of "value" for consistency with tooltip time (#954)
        let seekTo = seek.getAttribute('seek-value');

        if (is.empty(seekTo)) {
          seekTo = seek.value;
        }

        seek.removeAttribute('seek-value');

        player.currentTime = (seekTo / seek.max) * player.duration;
      },
      'seek',
    );

    // Seek tooltip
    this.bind(elements.progress, 'mouseenter mouseleave mousemove', event =>
      controls.updateSeekTooltip.call(player, event),
    );

    // Preview thumbnails plugin
    // TODO: Really need to work on some sort of plug-in wide event bus or pub-sub for this
    this.bind(elements.progress, 'mousemove touchmove', event => {
      const { previewThumbnails } = player;

      if (previewThumbnails && previewThumbnails.loaded) {
        previewThumbnails.startMove(event);
      }
    });

    // Hide thumbnail preview - on mouse click, mouse leave, and video play/seek. All four are required, e.g., for buffering
    this.bind(elements.progress, 'mouseleave touchend click', () => {
      const { previewThumbnails } = player;

      if (previewThumbnails && previewThumbnails.loaded) {
        previewThumbnails.endMove(false, true);
      }
    });

    // Show scrubbing preview
    this.bind(elements.progress, 'mousedown touchstart', event => {
      const { previewThumbnails } = player;

      if (previewThumbnails && previewThumbnails.loaded) {
        previewThumbnails.startScrubbing(event);
      }
    });

    this.bind(elements.progress, 'mouseup touchend', event => {
      const { previewThumbnails } = player;

      if (previewThumbnails && previewThumbnails.loaded) {
        previewThumbnails.endScrubbing(event);
      }
    });

    // Polyfill for lower fill in <input type="range"> for webkit
    if (browser.isWebkit) {
      Array.from(getElements.call(player, 'input[type="range"]')).forEach(element => {
        this.bind(element, 'input', event => controls.updateRangeFill.call(player, event.target));
      });
    }

    // Current time invert
    // Only if one time element is used for both currentTime and duration
    if (player.config.toggleInvert && !is.element(elements.display.duration)) {
      this.bind(elements.display.currentTime, 'click', () => {
        // Do nothing if we're at the start
        if (player.currentTime === 0) {
          return;
        }

        player.config.invertTime = !player.config.invertTime;

        controls.timeUpdate.call(player);
      });
    }

    // Volume
    this.bind(
      elements.inputs.volume,
      inputEvent,
      event => {
        player.volume = event.target.value;
      },
      'volume',
    );

    // Update controls.hover state (used for ui.toggleControls to avoid hiding when interacting)
    this.bind(elements.controls, 'mouseenter mouseleave', event => {
      elements.controls.hover = !player.touch && event.type === 'mouseenter';
    });

    // Also update controls.hover state for any non-player children of fullscreen element (as above)
    if (elements.fullscreen) {
      Array.from(elements.fullscreen.children)
        .filter(c => !c.contains(elements.container))
        .forEach(child => {
          this.bind(child, 'mouseenter mouseleave', event => {
            elements.controls.hover = !player.touch && event.type === 'mouseenter';
          });
        });
    }

    // Update controls.pressed state (used for ui.toggleControls to avoid hiding when interacting)
    this.bind(elements.controls, 'mousedown mouseup touchstart touchend touchcancel', event => {
      elements.controls.pressed = ['mousedown', 'touchstart'].includes(event.type);
    });

    // Show controls when they receive focus (e.g., when using keyboard tab key)
    this.bind(elements.controls, 'focusin', () => {
      const { config, timers } = player;

      // Skip transition to prevent focus from scrolling the parent element
      toggleClass(elements.controls, config.classNames.noTransition, true);

      // Toggle
      ui.toggleControls.call(player, true);

      // Restore transition
      setTimeout(() => {
        toggleClass(elements.controls, config.classNames.noTransition, false);
      }, 0);

      // Delay a little more for mouse users
      const delay = this.touch ? 3000 : 4000;

      // Clear timer
      clearTimeout(timers.controls);

      // Hide again after delay
      timers.controls = setTimeout(() => ui.toggleControls.call(player, false), delay);
    });

    // Mouse wheel for volume
    this.bind(
      elements.inputs.volume,
      'wheel',
      event => {
        // Detect "natural" scroll - suppored on OS X Safari only
        // Other browsers on OS X will be inverted until support improves
        const inverted = event.webkitDirectionInvertedFromDevice;
        // Get delta from event. Invert if `inverted` is true
        const [x, y] = [event.deltaX, -event.deltaY].map(value => (inverted ? -value : value));
        // Using the biggest delta, normalize to 1 or -1 (or 0 if no delta)
        const direction = Math.sign(Math.abs(x) > Math.abs(y) ? x : y);

        // Change the volume by 2%
        player.increaseVolume(direction / 50);

        // Don't break page scrolling at max and min
        const { volume } = player.media;
        if ((direction === 1 && volume < 1) || (direction === -1 && volume > 0)) {
          event.preventDefault();
        }
      },
      'volume',
      false,
    );
  }
}

export default Listeners;

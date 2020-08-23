// ==========================================================================
// VPlayer HTML5
// ==========================================================================

import support from './support';
import { removeElement } from './utils/elements';
import { triggerEvent } from './utils/events';
import is from './utils/is';
import { silencePromise } from './utils/promise';
import { setAspectRatio } from './utils/style';

const html5 = {
  getSources() {
    if (!this.isHTML5) {
      return [];
    }

    const sources = Array.from(this.media.querySelectorAll('source'));

    //在指定了类型时,过滤掉不受支持的源
    return sources.filter(source => {
      const type = source.getAttribute('type');

      if (is.empty(type)) {
        return true;
      }

      return support.mime.call(this, type);
    });
  },

  // 获取质量等级
  getQualityOptions() {
    // 流式传输时，是否强制所有选项
    if (this.config.quality.forced) {
      return this.config.quality.options;
    }

    // 从<source>元素获取size
    return html5.getSources
      .call(this)
      .map(source => Number(source.getAttribute('size')))
      .filter(Boolean);
  },

  setup() {
    if (!this.isHTML5) {
      return;
    }

    const player = this;

    // 通过配置设置速度选项
    player.options.speed = player.config.speed.options;

    // 当固定时，设置宽高比
    if (!is.empty(this.config.ratio)) {
      setAspectRatio.call(player);
    }

    // Quality
    Object.defineProperty(player.media, 'quality', {
      get() {
        // 获取sources的值
        const sources = html5.getSources.call(player);
        const source = sources.find(s => s.getAttribute('src') === player.source);

        //如果找到匹配项，返回大小
        return source && Number(source.getAttribute('size'));
      },
      set(input) {
        if (player.quality === input) {
          return;
        }

        // 如果使用的是一个external扩展程序
        if (player.config.quality.forced && is.function(player.config.quality.onChange)) {
          player.config.quality.onChange(input);
        } else {
          // 获取资源
          const sources = html5.getSources.call(player);
          // 获得要求尺寸的首次匹配规则
          const source = sources.find(s => Number(s.getAttribute('size')) === input);

          // 找不到匹配的源
          if (!source) {
            return;
          }

          // 获取当前状态
          const { currentTime, paused, preload, readyState, playbackRate } = player.media;

          // 设定新source源
          player.media.src = source.getAttribute('src');

          // 如果preload 为“ none”并且当前源未加载，则阻止加载
          if (preload !== 'none' || readyState) {
            // 重播时间
            player.once('loadedmetadata', () => {
              player.speed = playbackRate;
              player.currentTime = currentTime;

              //如果没有暂停时
              if (!paused) {
                silencePromise(player.play());
              }
            });

            // 加载新的source源
            player.media.load();
          }
        }

        // 触发变更事件t
        triggerEvent.call(player, player.media, 'qualitychange', false, {
          quality: input,
        });
      },
    });
  },

  //取消当前的网络请求
  cancelRequests() {
    if (!this.isHTML5) {
      return;
    }

    // 删除子资源
    removeElement(html5.getSources.call(this));

    // 设置空白视频src属性，是为了防止MEDIA_ERR_SRC_NOT_SUPPORTED错误
    this.media.setAttribute('src', this.config.blankVideo);

    // 加载新的空源，将会取消现有请求
    this.media.load();

    // 调试
    this.debug.log('取消网络请求');
  },
};

export default html5;

// ==========================================================================
// VPlayer Captions
// TODO: 创建字幕相关的类
// ==========================================================================

import controls from './controls';
import support from './support';
import { dedupe } from './utils/arrays';
import browser from './utils/browser';
import {
  createElement,
  emptyElement,
  getAttributesFromSelector,
  insertAfter,
  removeElement,
  toggleClass,
} from './utils/elements';
import { on, triggerEvent } from './utils/events';
import fetch from './utils/fetch';
import i18n from './utils/i18n';
import is from './utils/is';
import { getHTML } from './utils/strings';
import { parseUrl } from './utils/urls';

const captions = {
  // 字幕设置
  setup() {
    // 用户界面支持判断
    if (!this.supported.ui) {
      return;
    }

    // 支持HTML5视频和文字轨道
    if (!this.isVideo  || (this.isHTML5 && !support.textTracks)) {
      // 清除菜单并隐藏
      if (
        is.array(this.config.controls) &&
        this.config.controls.includes('settings') &&
        this.config.settings.includes('captions')
      ) {
        controls.setCaptionsMenu.call(this);
      }
      return;
    }

    // 注入容器
    if (!is.element(this.elements.captions)) {
      this.elements.captions = createElement('div', getAttributesFromSelector(this.config.selectors.captions));

      insertAfter(this.elements.captions, this.elements.wrapper);
    }

    // 如果使用CORS，则需要对IE的标题进行兼容处理
    // 提取标题并注入为blob，目前还不支持数据URI！
    if (browser.isIE && window.URL) {
      const elements = this.media.querySelectorAll('track');

      Array.from(elements).forEach(track => {
        const src = track.getAttribute('src');
        const url = parseUrl(src);

        if (
          url !== null &&
          url.hostname !== window.location.href.hostname &&
          ['http:', 'https:'].includes(url.protocol)
        ) {
          fetch(src, 'blob')
            .then(blob => {
              track.setAttribute('src', window.URL.createObjectURL(blob));
            })
            .catch(() => {
              removeElement(track);
            });
        }
      });
    }

    // 获取并设置初始数据
    // * languages: 用户浏览器语言的数组.
    // * language:  用户设置或配置首选的语言
    // * active:    用户配置默认的状态
    // * toggled:   真实字幕状态

    const browserLanguages = navigator.languages || [navigator.language || navigator.userLanguage || 'en'];
    const languages = dedupe(browserLanguages.map(language => language.split('-')[0]));
    let language = (this.storage.get('language') || this.config.captions.language || 'auto').toLowerCase();

    // language参数为“自动”时使用第一（默认）浏览器语言
    if (language === 'auto') {
      [language] = languages;
    }

    let active = this.storage.get('captions');
    if (!is.boolean(active)) {
      ({ active } = this.config.captions);
    }

    Object.assign(this.captions, {
      toggled: false,
      active,
      language,
      languages,
    });

    // 监听textTracks的更改并更新字幕菜单
    if (this.isHTML5) {
      const trackEvents = this.config.captions.update ? 'addtrack removetrack' : 'removetrack';
      on.call(this, this.media.textTracks, trackEvents, captions.update.bind(this));
    }
    // 在下一个刻度中更新列表中可用的语言（不得在侦听器之前触发事件）
    setTimeout(captions.update.bind(this), 0);
  },

  // 根据tracks曲目更新设置中的可用语言选项
  update() {
    const tracks = captions.getTracks.call(this, true);
    // 获取所需的语言
    const { active, language, meta, currentTrackNode } = this.captions;
    const languageExists = Boolean(tracks.find(track => track.language === language));

    // 处理轨道（添加事件监听器和默认）
    if (this.isHTML5 && this.isVideo) {
      tracks
        .filter(track => !meta.get(track))
        .forEach(track => {
          this.debug.log('Track added', track);

          // 尝试存储原始dom元素是否为“默认”
          meta.set(track, {
            default: track.mode === 'showing',
          });

          // 关闭本地字幕渲染，以避免出现双重字幕
         //注意：mode ='hidden'强制下载曲目。 确保每条轨道不会立即下载，仅应重新分配“显示”曲目
          if (track.mode === 'showing') {
            track.mode = 'hidden';
          }

          // 添加事件监听器来更改提示
          on.call(this, track, 'cuechange', () => captions.updateCues.call(this));
        });
    }
    // 第一次匹配时更新语言，或者如果先前的匹配音轨已删除，则更新
    if ((languageExists && this.language !== language) || !tracks.includes(currentTrackNode)) {
      captions.setLanguage.call(this, language);
      captions.toggle.call(this, active && languageExists);
    }

     // 根据track长度启用或禁用字幕
    toggleClass(this.elements.container, this.config.classNames.captions.enabled, !is.empty(tracks));

    // 更新列表中的可用语言
    if (
      is.array(this.config.controls) &&
      this.config.controls.includes('settings') &&
      this.config.settings.includes('captions')
    ) {
      controls.setCaptionsMenu.call(this);
    }
  },

  // 切换字幕显示
  // 在内部用于toggleCaptions方法，将被动选项强制设置为false
  toggle(input, passive = true) {
    // 如果全都不支持
    if (!this.supported.ui) {
      return;
    }

    const { toggled } = this.captions; // 当前状态
    const activeClass = this.config.classNames.captions.active;
    // 获取下一个状态,如果在没有参数的情况下调用该方法，请根据当前值进行切换
    const active = is.nullOrUndefined(input) ? !toggled : input;

    // 更新状态和触发事件
    if (active !== toggled) {
      // When passive, don't override user preferences
      //当passive为true时，不能覆盖用户首选项
      if (!passive) {
        this.captions.active = active;
        this.storage.set({ captions: active });
      }

      // 如果passive为false，并且没有匹配到language，可切换为强制语言 
      if (!this.language && active && !passive) {
        const tracks = captions.getTracks.call(this);
        const track = captions.findTrack.call(this, [this.captions.language, ...this.captions.languages], true);

        // 覆盖用户首选项，以避免在添加匹配音轨时切换语言
        this.captions.language = track.language;

        // 设置标题，但不作为用户首选项存储在localStorage中
        captions.set.call(this, tracks.indexOf(track));
        return;
      }

      // 切换按钮（按钮已启用情况下）
      if (this.elements.buttons.captions) {
        this.elements.buttons.captions.pressed = active;
      }
      toggleClass(this.elements.container, activeClass, active);

      this.captions.toggled = active;

      // 更新设置菜单
      controls.updateSetting.call(this, 'captions');

      // 触发事件（不能使用在内部）
      triggerEvent.call(this, this.media, active ? 'captionsenabled' : 'captionsdisabled');
    }

    setTimeout(() => {
      if (active && this.captions.toggled) {
        this.captions.currentTrackNode.mode = 'hidden';
      }
    });
  },
  //通过track索引设置字幕
   //在内部用于currentTrack设置器，并将passive选项强制设置为false
  set(index, passive = true) {
    const tracks = captions.getTracks.call(this);

    //如果设置为-1，则禁用字幕
    if (index === -1) {
      captions.toggle.call(this, false, passive);
      return;
    }

    if (!is.number(index)) {
      this.debug.warn('Invalid caption argument', index);
      return;
    }

    if (!(index in tracks)) {
      this.debug.warn('Track not found', index);
      return;
    }

    if (this.captions.currentTrack !== index) {
      this.captions.currentTrack = index;
      const track = tracks[index];
      const { language } = track || {};


      //存储对节点的引用，以便在删除时失效
      this.captions.currentTrackNode = track;

      // 更新设置菜单
      controls.updateSetting.call(this, 'captions');

      // passive为false时,不能覆盖用户首选项
      if (!passive) {
        this.captions.language = language;
        this.storage.set({ language });
      }



      // 触发事件
      triggerEvent.call(this, this.media, 'languagechange');
    }

    // 显示字幕
    captions.toggle.call(this, true, passive);

    if (this.isHTML5 && this.isVideo) {
      // 如果在提示已显示的情况下更改活动曲目，则需要对其进行更新
      captions.updateCues.call(this);
    }
  },

  // 通过language设置字幕，内部用于语言设置器，并将passive选项强制设置为false
  setLanguage(input, passive = true) {
    if (!is.string(input)) {
      this.debug.warn('Invalid language argument', input);
      return;
    }
    // 标准化
    const language = input.toLowerCase();
    this.captions.language = language;

    // 设置currentTrack
    const tracks = captions.getTracks.call(this);
    const track = captions.findTrack.call(this, [language]);
    captions.set.call(this, tracks.indexOf(track), passive);
  },
  //获取当前有效的caption轨道
//如果update为false，它也会忽略没有元数据的轨道
//用于在字幕时“冻结”language选项,update为false
  getTracks(update = false) {
    // 处理媒体或文本轨道丢失或空时的情况
    const tracks = Array.from((this.media || {}).textTracks || []);
    // For HTML5, use cache instead of current tracks when it exists (if captions.update is false)
    // Filter out removed tracks and tracks that aren't captions/subtitles (for example metadata)
    //对于HTML5，当它存在时，使用缓存代替当前的轨道(如果update为false)
    //过滤掉已删除的曲目、captions和subtitles(例如元数据)
    return tracks
      .filter(track => !this.isHTML5 || update || this.captions.meta.has(track))
      .filter(track => ['captions', 'subtitles'].includes(track.kind));
  },

  // 匹配基于languages的轨道并获得第一个
  findTrack(languages, force = false) {
    const tracks = captions.getTracks.call(this);
    const sortIsDefault = track => Number((this.captions.meta.get(track) || {}).default);
    const sorted = Array.from(tracks).sort((a, b) => sortIsDefault(b) - sortIsDefault(a));
    let track;

    languages.every(language => {
      track = sorted.find(t => t.language === language);
      return !track; // 如果有匹配，则中断
    });

    // If no match is found but is required, get first
    //如果没有匹配到，但是是必需的，就获取sorted第一项
    return track || (force ? sorted[0] : undefined);
  },

  // 获取当前轨迹
  getCurrentTrack() {
    return captions.getTracks.call(this)[this.currentTrack];
  },

  //根据track获取当前的标签
  getLabel(track) {
    let currentTrack = track;

    if (!is.track(currentTrack) && support.textTracks && this.captions.toggled) {
      currentTrack = captions.getCurrentTrack.call(this);
    }

    if (is.track(currentTrack)) {
      if (!is.empty(currentTrack.label)) {
        return currentTrack.label;
      }

      if (!is.empty(currentTrack.language)) {
        return track.language.toUpperCase();
      }

      return i18n.get('enabled', this.config);
    }

    return i18n.get('disabled', this.config);
  },

  // Update captions using current track's active cues
  // 使用当前轨道提示更新字幕
  // 也可选数组参数，以防没有任何跟踪
  updateCues(input) {
    if (!this.supported.ui) {
      return;
    }

    if (!is.element(this.elements.captions)) {
      this.debug.warn('No captions element to render to');
      return;
    }

    // 只接受数组或空input
    if (!is.nullOrUndefined(input) && !Array.isArray(input)) {
      this.debug.warn('updateCues: Invalid input', input);
      return;
    }

    let cues = input;

    //从track获取cues
    if (!cues) {
      const track = captions.getCurrentTrack.call(this);

      cues = Array.from((track || {}).activeCues || [])
        .map(cue => cue.getCueAsHTML())
        .map(getHTML);
    }

    // 设置新标题文本
    const content = cues.map(cueText => cueText.trim()).join('\n');
    const changed = content !== this.elements.captions.innerHTML;

    if (changed) {
      // 清空容器并创建一个新的子元素
      emptyElement(this.elements.captions);
      const caption = createElement('span', getAttributesFromSelector(this.config.selectors.caption));
      caption.innerHTML = content;
      this.elements.captions.appendChild(caption);

      // 监听事件
      triggerEvent.call(this, this.media, 'cuechange');
    }
  },
};

export default captions;

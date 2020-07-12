/**
 * VPlayer 默认配置
 * author ferrycoln
 */
const defaults = {
  // 是否禁用
  enabled: true,
  // 定义播放器的标题
  title: '',
  // 是否开启debug模式
  debug: false,

  //是否自动播放----有的浏览器不支持网页播放器的自动播放，如果浏览器支持自动播放则使用此开关控制  ，如果不支持则无效
  autoplay: false,

  // playsinline: true,

  // 快进快退事跳过的时间
  seekTime: 10,

  // 默认音量
  volume: 1,
  // 是否静音
  muted: false,

  // 自定义持续时间
  duration: null,

 // 是否显示持续时间
 //----如果想同时显示持续时间和当前的时间，则该配置可以忽略
  displayDuration: true,

  // 是否显示当前时间的倒计时
  invertTime: true,

  // 点击当前时间将转换为剩余的时间
  toggleInvert: true,

  // 强制显示宽高比例，格式为 `'w:h'` 例如：(`'16:9'`)
  ratio: null,

  // 点击视频整个视频的容器来控制播放和暂停
  clickToPlay: true,

  // 是否自动隐藏播放器的控件
  hideControls: true,

  // 当播放完后是否重置到开始
  resetOnEnd: false,

  // 禁用标准的上下文菜单
  disableContextMenu: true,

  // 加载控制雪碧图
  loadSprite: true,
  iconPrefix: 'vplayer',
  iconUrl: require("./../../sprite/vplayer.svg"),

  //当视频出错或者视频是空帧时的默认填充
  blankVideo: './../../sprite/blank.mp4',

  // 视频的默认质量
  quality: {
    default: 576,
    // 当使用流媒体时，在界面上显示视频的质量
    options: [4320, 2880, 2160, 1440, 1080, 720, 576, 480, 360, 240],
    forced: false,
    onChange: null,
  },

  // 设置是否循环
  loop: {
    active: false,
    // start: null,
    // end: null,
  },

  // 速度选中的默认值选项
  speed: {
    selected: 1,
    // 视频的播放速度
    options: [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2, 4],
  },

  // 使用键盘快捷键来控制
  keyboard: {
    focused: true,
    global: false,
  },

  // 显示工具项提示
  tooltips: {
    controls: false,
    seek: true,
  },

  // 屏幕的字幕设置
  captions: {
    active: false,
    language: 'auto',
    // 初始化后的新视频或音频
    // ----这对于流字幕来说是必需要设置的，但是可能导致无法选择的选项，此处还待完善
    update: false,
  },

  // 全屏控制
  fullscreen: {
    enabled: true, // 是否全屏
    fallback: true, // 是否全屏到window/视口
    iosNative: false, // 控制IOS下，使用自带的全屏，不支持自定义的控件来全屏
  },

  // 本地存储
  storage: {
    enabled: true,
    key: 'vplayer',
  },

  // 罗列出播放器里面默认的控件
  controls: [
    'play-large',
    // 'restart',
    // 'rewind',
    'play',
    // 'fast-forward',
    'progress',
    'current-time',
    // 'duration',
    'mute',
    'volume',
    'captions',
    'settings',
    'pip',
    'airplay',
    // 'download',
    'fullscreen',
  ],
  settings: ['captions', 'quality', 'speed'],

  // 默认的语言
  i18n: {
    restart: 'Restart',
    rewind: 'Rewind {seektime}s',
    play: 'Play',
    pause: 'Pause',
    fastForward: 'Forward {seektime}s',
    seek: 'Seek',
    seekLabel: '{currentTime} of {duration}',
    played: 'Played',
    buffered: 'Buffered',
    currentTime: 'Current time',
    duration: 'Duration',
    volume: 'Volume',
    mute: 'Mute',
    unmute: 'Unmute',
    enableCaptions: 'Enable captions',
    disableCaptions: 'Disable captions',
    download: 'Download',
    enterFullscreen: 'Enter fullscreen',
    exitFullscreen: 'Exit fullscreen',
    frameTitle: 'Player for {title}',
    captions: 'Captions',
    settings: 'Settings',
    pip: 'PIP',
    menuBack: 'Go back to previous menu',
    speed: 'Speed',
    normal: 'Normal',
    quality: 'Quality',
    loop: 'Loop',
    start: 'Start',
    end: 'End',
    all: 'All',
    reset: 'Reset',
    disabled: 'Disabled',
    enabled: 'Enabled',
    advertisement: 'Ad',
    qualityBadge: {
      2160: '4K',
      1440: 'HD',
      1080: 'HD',
      720: 'HD',
      576: 'SD',
      480: 'SD',
    },
  },

  // URLs
  urls: {
    download: null,
    // googleIMA: {
    //   sdk: 'https://imasdk.googleapis.com/js/sdkloader/ima3.js',
    // },
  },

  // 自定义控件监听器
  listeners: {
    seek: null,
    play: null,
    pause: null,
    restart: null,
    rewind: null,
    fastForward: null,
    mute: null,
    volume: null,
    captions: null,
    download: null,
    fullscreen: null,
    pip: null,
    airplay: null,
    speed: null,
    quality: null,
    loop: null,
    language: null,
  },

  // Events to watch and bubble
  events: [
    // Events to watch on HTML5 media elements and bubble
    // https://developer.mozilla.org/en/docs/Web/Guide/Events/Media_events
    'ended',
    'progress',
    'stalled',
    'playing',
    'waiting',
    'canplay',
    'canplaythrough',
    'loadstart',
    'loadeddata',
    'loadedmetadata',
    'timeupdate',
    'volumechange',
    'play',
    'pause',
    'error',
    'seeking',
    'seeked',
    'emptied',
    'ratechange',
    'cuechange',

    // 自定义事件
    'download',
    'enterfullscreen',
    'exitfullscreen',
    'captionsenabled',
    'captionsdisabled',
    'languagechange',
    'controlshidden',
    'controlsshown',
    'ready',


    // Quality
    'qualitychange',

    // 投放广告
    'adsloaded',
    'adscontentpause',
    'adscontentresume',
    'adstarted',
    'adsmidpoint',
    'adscomplete',
    'adsallcomplete',
    'adsimpression',
    'adsclick',
  ],

  // 选择器
  // 当时用自定义的HTML时，需要更改这里来适配自定义的模板
  selectors: {
    editable: 'input, textarea, select, [contenteditable]',
    container: '.vplayer',
    controls: {
      container: null,
      wrapper: '.vplayer__controls',
    },
    labels: '[data-vplayer]',
    buttons: {
      play: '[data-vplayer="play"]',
      pause: '[data-vplayer="pause"]',
      restart: '[data-vplayer="restart"]',
      rewind: '[data-vplayer="rewind"]',
      fastForward: '[data-vplayer="fast-forward"]',
      mute: '[data-vplayer="mute"]',
      captions: '[data-vplayer="captions"]',
      download: '[data-vplayer="download"]',
      fullscreen: '[data-vplayer="fullscreen"]',
      pip: '[data-vplayer="pip"]',
      airplay: '[data-vplayer="airplay"]',
      settings: '[data-vplayer="settings"]',
      loop: '[data-vplayer="loop"]',
    },
    inputs: {
      seek: '[data-vplayer="seek"]',
      volume: '[data-vplayer="volume"]',
      speed: '[data-vplayer="speed"]',
      language: '[data-vplayer="language"]',
      quality: '[data-vplayer="quality"]',
    },
    display: {
      currentTime: '.vplayer__time--current',
      duration: '.vplayer__time--duration',
      buffer: '.vplayer__progress__buffer',
      loop: '.vplayer__progress__loop', // Used later
      volume: '.vplayer__volume--display',
    },
    progress: '.vplayer__progress',
    captions: '.vplayer__captions',
    caption: '.vplayer__caption',
  },

  // 将class类挂载到播放器
  classNames: {
    type: 'vplayer--{0}',
    provider: 'vplayer--{0}',
    video: 'vplayer__video-wrapper',
    embed: 'vplayer__video-embed',
    videoFixedRatio: 'vplayer__video-wrapper--fixed-ratio',
    embedContainer: 'vplayer__video-embed__container',
    poster: 'vplayer__poster',
    posterEnabled: 'vplayer__poster-enabled',
    ads: 'vplayer__ads',
    control: 'vplayer__control',
    controlPressed: 'vplayer__control--pressed',
    playing: 'vplayer--playing',
    paused: 'vplayer--paused',
    stopped: 'vplayer--stopped',
    loading: 'vplayer--loading',
    hover: 'vplayer--hover',
    tooltip: 'vplayer__tooltip',
    cues: 'vplayer__cues',
    hidden: 'vplayer__sr-only',
    hideControls: 'vplayer--hide-controls',
    isIos: 'vplayer--is-ios',
    isTouch: 'vplayer--is-touch',
    uiSupported: 'vplayer--full-ui',
    noTransition: 'vplayer--no-transition',
    display: {
      time: 'vplayer__time',
    },
    menu: {
      value: 'vplayer__menu__value',
      badge: 'vplayer__badge',
      open: 'vplayer--menu-open',
    },
    captions: {
      enabled: 'vplayer--captions-enabled',
      active: 'vplayer--captions-active',
    },
    fullscreen: {
      enabled: 'vplayer--fullscreen-enabled',
      fallback: 'vplayer--fullscreen-fallback',
    },
    pip: {
      supported: 'vplayer--pip-supported',
      active: 'vplayer--pip-active',
    },
    airplay: {
      supported: 'vplayer--airplay-supported',
      active: 'vplayer--airplay-active',
    },
    tabFocus: 'vplayer__tab-focus',
    previewThumbnails: {
      // Tooltip thumbs
      thumbContainer: 'vplayer__preview-thumb',
      thumbContainerShown: 'vplayer__preview-thumb--is-shown',
      imageContainer: 'vplayer__preview-thumb__image-container',
      timeContainer: 'vplayer__preview-thumb__time-container',
      // Scrubbing
      scrubbingContainer: 'vplayer__preview-scrubbing',
      scrubbingContainerShown: 'vplayer__preview-scrubbing--is-shown',
    },
  },

  // Embed attributes
  attributes: {
    embed: {
      provider: 'data-vplayer-provider',
      id: 'data-vplayer-embed-id',
    },
  },

  // Advertisements plugin
  // Register for an account here: http://vi.ai/publisher-video-monetization/?aid=vplayerio
  ads: {
    enabled: false,
    publisherId: '',
    tagUrl: '',
  },

  // Preview Thumbnails plugin
  previewThumbnails: {
    enabled: false,
    src: '',
  }
};

export default defaults;

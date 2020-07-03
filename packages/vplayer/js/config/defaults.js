// ==========================================================================
// VPlayer default config
// ==========================================================================

const defaults = {
  // Disable
  enabled: true,

  // Custom media title
  title: '',

  // Logging to console
  debug: false,

  // Auto play (if supported)
  autoplay: false,

  // Only allow one media playing at once (vimeo only)
  autopause: true,

  // Allow inline playback on iOS (this effects YouTube/Vimeo - HTML5 requires the attribute present)
  // TODO: Remove iosNative fullscreen option in favour of this (logic needs work)
  playsinline: true,

  // Default time to skip when rewind/fast forward
  seekTime: 10,

  // Default volume
  volume: 1,
  muted: false,

  // Pass a custom duration
  duration: null,

  // Display the media duration on load in the current time position
  // If you have opted to display both duration and currentTime, this is ignored
  displayDuration: true,

  // Invert the current time to be a countdown
  invertTime: true,

  // Clicking the currentTime inverts it's value to show time left rather than elapsed
  toggleInvert: true,

  // Force an aspect ratio
  // The format must be `'w:h'` (e.g. `'16:9'`)
  ratio: null,

  // Click video container to play/pause
  clickToPlay: true,

  // Auto hide the controls
  hideControls: true,

  // Reset to start when playback ended
  resetOnEnd: false,

  // Disable the standard context menu
  disableContextMenu: true,

  // Sprite (for icons)
  loadSprite: true,
  iconPrefix: 'vplayer',
  iconUrl: require("./../../sprite/vplayer.svg"),

  // Blank video (used to prevent errors on source change)
  blankVideo: './../../sprite/blank.mp4',

  // Quality default
  quality: {
    default: 576,
    // The options to display in the UI, if available for the source media
    options: [4320, 2880, 2160, 1440, 1080, 720, 576, 480, 360, 240],
    forced: false,
    onChange: null,
  },

  // Set loops
  loop: {
    active: false,
    // start: null,
    // end: null,
  },

  // Speed default and options to display
  speed: {
    selected: 1,
    // The options to display in the UI, if available for the source media (e.g. Vimeo and YouTube only support 0.5x-4x)
    options: [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2, 4],
  },

  // Keyboard shortcut settings
  keyboard: {
    focused: true,
    global: false,
  },

  // Display tooltips
  tooltips: {
    controls: false,
    seek: true,
  },

  // Captions settings
  captions: {
    active: false,
    language: 'auto',
    // Listen to new tracks added after VPlayer is initialized.
    // This is needed for streaming captions, but may result in unselectable options
    update: false,
  },

  // Fullscreen settings
  fullscreen: {
    enabled: true, // Allow fullscreen?
    fallback: true, // Fallback using full viewport/window
    iosNative: false, // Use the native fullscreen in iOS (disables custom controls)
    // Selector for the fullscreen container so contextual / non-player content can remain visible in fullscreen mode
    // Non-ancestors of the player element will be ignored
    // container: null, // defaults to the player element
  },

  // Local storage
  storage: {
    enabled: true,
    key: 'vplayer',
  },

  // Default controls
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

  // Localisation
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
    // vimeo: {
    //   sdk: 'https://player.vimeo.com/api/player.js',
    //   iframe: 'https://player.vimeo.com/video/{0}?{1}',
    //   api: 'https://vimeo.com/api/v2/video/{0}.json',
    // },
    // youtube: {
    //   sdk: 'https://www.youtube.com/iframe_api',
    //   api: 'https://noembed.com/embed?url=https://www.youtube.com/watch?v={0}',
    // },
    // googleIMA: {
    //   sdk: 'https://imasdk.googleapis.com/js/sdkloader/ima3.js',
    // },
  },

  // Custom control listeners
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

    // Custom events
    'download',
    'enterfullscreen',
    'exitfullscreen',
    'captionsenabled',
    'captionsdisabled',
    'languagechange',
    'controlshidden',
    'controlsshown',
    'ready',

    // YouTube
    // 'statechange',

    // Quality
    'qualitychange',

    // Ads
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

  // Selectors
  // Change these to match your template if using custom HTML
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

  // Class hooks added to the player in different states
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
  },

  // Vimeo plugin
  // vimeo: {
  //   byline: false,
  //   portrait: false,
  //   title: false,
  //   speed: true,
  //   transparent: false,
  //   // Whether the owner of the video has a Pro or Business account
  //   // (which allows us to properly hide controls without CSS hacks, etc)
  //   premium: false,
  //   // Custom settings from VPlayer
  //   referrerPolicy: null, // https://developer.mozilla.org/en-US/docs/Web/API/HTMLIFrameElement/referrerPolicy
  // },

  // YouTube plugin
  // youtube: {
  //   noCookie: true, // Whether to use an alternative version of YouTube without cookies
  //   rel: 0, // No related vids
  //   showinfo: 0, // Hide info
  //   iv_load_policy: 3, // Hide annotations
  //   modestbranding: 1, // Hide logos as much as possible (they still show one in the corner when paused)
  // },
};

export default defaults;

export const OVERLAY_OPACITY = 0.75;
export const OVERLAY_PADDING = 10;

export const SHOULD_ANIMATE_OVERLAY = true;
export const SHOULD_OUTSIDE_CLICK_CLOSE = true;
export const ALLOW_KEYBOARD_CONTROL = true;
export const SHOULD_OUTSIDE_CLICK_NEXT = false;

export const ESC_KEY_CODE = 27;
export const LEFT_KEY_CODE = 37;
export const RIGHT_KEY_CODE = 39;

export const ID_OVERLAY = 'guide-page-overlay';
export const ID_STAGE = 'guide-highlighted-element-stage';
export const ID_POPOVER = 'guide-popover-item';

export const CLASS_DRIVER_HIGHLIGHTED_ELEMENT = 'guide-highlighted-element';
export const CLASS_POSITION_RELATIVE = 'guide-position-relative';
export const CLASS_FIX_STACKING_CONTEXT = 'guide-fix-stacking';

export const CLASS_STAGE_NO_ANIMATION = 'guide-stage-no-animation';
export const CLASS_POPOVER_TIP = 'guide-popover-tip';
export const CLASS_POPOVER_TITLE = 'guide-popover-title';
export const CLASS_POPOVER_DESCRIPTION = 'guide-popover-description';
export const CLASS_POPOVER_FOOTER = 'guide-popover-footer';
export const CLASS_CLOSE_BTN = 'guide-close-btn';
export const CLASS_NEXT_STEP_BTN = 'guide-next-btn';
export const CLASS_PREV_STEP_BTN = 'guide-prev-btn';
export const CLASS_BTN_DISABLED = 'guide-disabled';
export const CLASS_CLOSE_ONLY_BTN = 'guide-close-only-btn';
export const CLASS_NAVIGATION_BTNS = 'guide-navigation-btns';

// NOTE: It must match the one set in the animations in CSS file
export const ANIMATION_DURATION_MS = 300;

// language=HTML
export const POPOVER_HTML = (className = '') => `
  <div id="${ID_POPOVER}" class="${className}">
    <div class="${CLASS_POPOVER_TIP}"></div>
    <div class="${CLASS_POPOVER_TITLE}">Popover Title</div>
    <div class="${CLASS_POPOVER_DESCRIPTION}">Popover Description</div>
    <div class="guide-clearfix ${CLASS_POPOVER_FOOTER}">
      <button class="${CLASS_CLOSE_BTN}">Close</button>
      <span class="guide-btn-group ${CLASS_NAVIGATION_BTNS}">
        <button class="${CLASS_PREV_STEP_BTN}">&larr; Previous</button>
        <button class="${CLASS_NEXT_STEP_BTN}">Next &rarr;</button>
      </span>
    </div>
  </div>`;

export const OVERLAY_HTML = `<div id="${ID_OVERLAY}"></div>`;
export const STAGE_HTML = `<div id="${ID_STAGE}"></div>`;

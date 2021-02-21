<template>
  <div class="v-resize-observer" tabindex="-1" />
</template>

<script>
import { getInternetExplorerVersion } from "./utils/compatibility";

let isIE;

function initCompat() {
  if (!initCompat.init) {
    initCompat.init = true;
    isIE = getInternetExplorerVersion() !== -1;
  }
}

export default {
  name: "VResizeObserver",

  mounted() {
    initCompat();
    this.$nextTick(() => {
      this._w = this.$el.offsetWidth;
      this._h = this.$el.offsetHeight;
    });
    const object = document.createElement("object");
    this._resizeObject = object;
    object.setAttribute("aria-hidden", "true");
    object.setAttribute("tabindex", -1);
    object.onload = this.addResizeHandlers;
    object.type = "text/html";
    if (isIE) {
      this.$el.appendChild(object);
    }
    object.data = "about:blank";
    if (!isIE) {
      this.$el.appendChild(object);
    }
  },

  beforeDestroy() {
    this.removeResizeHandlers();
  },

  methods: {
    compareAndNotify() {
      if (
        this._w !== this.$el.offsetWidth ||
        this._h !== this.$el.offsetHeight
      ) {
        this._w = this.$el.offsetWidth;
        this._h = this.$el.offsetHeight;
        this.$emit("notify", {
          width: this._w,
          height: this._h
        });
      }
    },

    addResizeHandlers() {
      this._resizeObject.contentDocument.defaultView.addEventListener(
        "resize",
        this.compareAndNotify
      );
      this.compareAndNotify();
    },

    removeResizeHandlers() {
      if (this._resizeObject && this._resizeObject.onload) {
        if (!isIE && this._resizeObject.contentDocument) {
          this._resizeObject.contentDocument.defaultView.removeEventListener(
            "resize",
            this.compareAndNotify
          );
        }
        this.$el.removeChild(this._resizeObject);
        this._resizeObject.onload = null;
        this._resizeObject = null;
      }
    }
  }
};
</script>

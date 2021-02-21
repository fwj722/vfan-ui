<template>
  <div
    class="v-select el-select"
    v-clickoutside="handleClose"
    @click.stop="handleToggleMenu"
  >
    <el-input
    style="width:auto"
      v-model="selectText"
      ref="reference"
      :size="size"
      :title="selectText"
      :disabled="disabled"
      :placeholder="placeholder"
      :readonly="true"
      @mouseenter.native="inputHovering = true"
      @mouseleave.native="inputHovering = false"
    >
      <template slot="prefix" v-if="$slots.prefix">
        <slot name="prefix"></slot>
      </template>
      <template slot="suffix">
        <i
          v-show="!showClose"
          :class="[
            'el-select__caret',
            'el-input__icon',
            'el-icon-' + iconClass
          ]"
        ></i>
        <i
          v-if="showClose"
          class="el-select__caret el-input__icon el-icon-circle-close"
          @click="handleClearClick"
        ></i>
      </template>
    </el-input>
    <transition name="el-zoom-in-top">
      <v-select-menu
        ref="popper"
        v-show="visible"
        :class="['v-select-dropdown', popperClass, { multiple: multiple }]"
        :append-to-body="popperAppendToBody"
        :placement="placement"
        :inputWidth="inputWidth"
      >
        <div
          class="v-select-dropdown__content"
          v-loading="loading"
          :element-loading-text="loadingText"
          element-loading-spinner="el-icon-loading"
        >
          <el-input
            v-if="search"
            v-model="filterText"
            class="el-input-search"
            ref="searchInput"
            prefix-icon="el-icon-search"
            :placeholder="popoverPlaceholder"
            clearable
          ></el-input>

          <template v-if="multiple">
            <!-- 全选框  多选时有用 -->
            <div
              v-show="showData.length"
              class="vue-recycle-scroller__item-view"
            >
              <el-checkbox
                class="vr-scroller__item "
                :indeterminate="isIndeterminate"
                @change="handlecCheckedToggle"
                v-model="checkedAll"
              >
               全选
              </el-checkbox>
            </div>
          </template>
          <!-- 全选框 end -->

          <el-checkbox-group v-model="checkedValue" @change="changeNodes">
            <v-recycle-scroller
              :style="{ height: showData.length > 9 ? '220px' : 'auto' }"
              class="vr-scroller"
              :items="showData"
              :item-size="22"
              :buffer="50"
              v-show="showData.length"
              v-slot="{ item }"
            >
              <!-- 多选 -->
              <template v-if="multiple">
                <div class="vr-scroller__item" :key="item.id">
                  <el-checkbox
                    :title="isTitle ? item.label : ''"
                    :label="item.id"
                    :disabled="item.disabled"
                    @change="handleChange($event, item)"
                    >{{ item.label }}</el-checkbox
                  >
                </div>
              </template>
              <!--  多选 end -->

              <!-- 单选 -->
              <template v-else>
                <div
                  class="vr-scroller__item el-select-dropdown__item"
                  :class="{
                    selected: checkedValue === item.id,
                    'is-disabled': item.disabled
                  }"
                  :key="item.id"
                  @click="handleChange($event, item)"
                  :title="isTitle ? item.label : ''"
                >
                  <span>{{ item.label }}</span>
                </div>
              </template>
              <!-- 单选 end -->
            </v-recycle-scroller>
            <template v-if="!showData.length">
              <slot name="empty" v-if="$slots.empty"></slot>
              <p class="el-select-dropdown__empty" v-else>
                暂无数据
              </p>
            </template>
          </el-checkbox-group>
        </div>
      </v-select-menu>
    </transition>
  </div>
</template>

<script>
import Locale from "element-ui/src/mixins/locale";
import { t } from "element-ui/src/locale";

import Clickoutside from "element-ui/src/utils/clickoutside";
import Emitter from "element-ui/src/mixins/emitter";

import {
  addResizeListener,
  removeResizeListener
} from "element-ui/src/utils/resize-event";
import VSelectMenu from "./select-dropdown";

const cloneDeep = require("lodash/cloneDeep");
const debounce = require("lodash/debounce");

export default {
  mixins: [Emitter, Locale],

  name: "VSelect",

  components: {
    VSelectMenu
  },

  directives: { Clickoutside },

  props: {
    // 传入的数据列表
    data: {
      type: Array
    },
    // 选择的值
    value: {
      type: [String, Number, Array],
      required: true
    },

    // 是否插入body
    popperAppendToBody: {
      type: Boolean,
      default: true
    },
    // 输入框尺寸
    size: {
      type: String,
      default: "small"
    },
    // 是否禁用
    disabled: {
      type: Boolean,
      default: false
    },
    // 数据模型
    props: {
      type: Object,
      default() {
        return {
          id: "id",
          label: "label",
          disabled: "disabled"
        };
      }
    },
    // 是否多选
    multiple: {
      type: Boolean,
      default: false
    },
    // 是否有搜索
    search: {
      type: Boolean,
      default: true
    },

    // 是否需要全选项
    selectAll: {
      type: Boolean,
      default: true
    },

    // 是否需要 选择框的 清除按钮
    clearable: Boolean,

    // 弹框类名
    popperClass: {
      type: String,
      default: ""
    },
    // 弹框位置
    placement: {
      type: String,
      default: "bottom-start"
    },
    // 占位符
    placeholder: {
      type: String,
      default() {
        return "已选择：";
      }
    },
    // 弹框input占位符
    popoverPlaceholder: {
      type: String,
      default() {
        return "请输入关键字搜索";
      }
    },
    // 弹框宽度
    popoverWidth: Number,

    // 选择框文字前缀
    prefix: {
      type: String,
      default() {
        return "已选择:";
      }
    },
    // 弹框是否loading
    loading: {
      type: Boolean,
      default: false
    },
    // 弹框loading text
    loadingText: {
      type: String,
      default() {
        return "正在加载中";
      }
    },
    // 是否远程搜索
    remote: {
      type: Boolean,
      default: false
    },

    // 是否需要title 当文字过长时可以使用
    isTitle: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      visible: false, // 弹框是否显示
      inputWidth: 0, // input 宽度
      selectText: "", // select 输入框显示文字
      filterText: "", // 筛选输入框显示文字
      checkedAll: false, // 是否全选
      isIndeterminate: false, // 是否半选
      formatData: [], // 原始数据格式化之后
      showData: [], // 需要展示的数据
      checkedValue: [], // 选中的 id
      inputHovering: false
    };
  },

  computed: {
    iconClass() {
      return this.visible ? "arrow-up is-reverse" : "arrow-up";
    },

    showClose() {
      let hasValue;
      if (this.multiple) {
        hasValue =
          Array.isArray(this.checkedValue) && this.checkedValue.length > 0;
      } else {
        // 这里判断数组的原因是因为数据初始化的时候是数据
        hasValue = Array.isArray(this.checkedValue)
          ? this.checkedValue.length
          : this.checkedValue * 1 === 0 || !!this.checkedValue; // 修复选择的值为 0 时不出现清空按钮问题
      }

      let criteria =
        this.clearable && !this.disabled && this.inputHovering && hasValue;
      return criteria;
    }
  },

  watch: {
    /* checkedValue(val) {
      this.setChecked(val);
    }, */
    value: {
      handler(val) {
        // this.format(this.data);
        this.setChecked(val);
      },
      immediate: true
    },
    data: {
      handler(val) {
        this.format(val);
        this.setChecked(this.value);
      },
      immediate: true
    },
    visible(val) {
      this.broadcast("ElSelectDropdown", "updatePopper");
    },
    filterText(val, oldVal) {
      if (this.remote) {
        // 有远程搜索时，触发事件，将值传递
        this.$emit("filterChange", val);
      } else {
        // 内部的过滤事件
        this.filter(val);
      }
    }
  },

  // created() {
  //   this.format(this.data);
  //   this.setChecked(this.value);
  // },

  mounted() {
    addResizeListener(this.$el, this.handleResize);
  },

  beforeDestroy() {
    if (this.$el && this.handleResize)
      removeResizeListener(this.$el, this.handleResize);
  },

  methods: {
    // 切换弹框是否展开
    handleToggleMenu() {
      if (!this.disabled) {
        this.visible = !this.visible;
        if (this.visible) {
          this.$nextTick(() => {
            this.focus();
          });
        }
      }
    },

    // 关闭弹框
    handleClose() {
      this.visible = false;
    },

    // 选择节点
    handleChange(checked, node) {
      if (node.disabled) return;

      if (this.multiple) {
        this.$emit("input", this.checkedValue);
        this.$emit("change", checked, node);
      } else {
        this.checkedValue = node.id;
        this.$emit("input", this.checkedValue);
        this.$emit("change", true, node);
        this.handleClose();
      }
    },

    // 多选时全选切换
    handlecCheckedToggle(checked) {
      this.isIndeterminate = false;
      let ids = [];
      for (let i = 0, l = this.showData.length; i < l; i++) {
        if (this.showData[i].disabled !== true) {
          ids.push(this.showData[i].id);
        }
      }
      let nodes = [];
      if (checked) {
        // 合并数据并去重
        nodes = Array.from(new Set([...ids, ...this.checkedValue]));
      } else {
        // 从已选择的数据中移除取消全选的数据
        this.checkedValue.forEach(item => {
          if (!ids.includes(item)) {
            nodes.push(item);
          }
        });
      }
      this.checkedValue = nodes;
      this.$emit("change", checked, nodes);
      this.$emit("input", this.checkedValue);
    },

    // 删除选择的数据
    handleClearClick(event) {
      this.deleteSelected(event);
    },

    // 计算input宽度
    resetInputWidth() {
      this.inputWidth = this.$refs.reference.$el.getBoundingClientRect().width;
    },

    handleResize() {
      this.resetInputWidth();
    },

    // 格式化数据
    format(items) {
      if (!Array.isArray(items)) throw Error("请传入数组类型");

      let { props } = this;
      const keys = Object.keys(props);

      this.formatData = cloneDeep(
        items.map(item => {
          keys.forEach(key => {
            item[key] = item[props[key]];
          });
          return item;
        })
      );
      this.showData = cloneDeep(this.formatData);

      // this.setChecked(this.checkedValue);
    },

    // 根据搜索条件过滤数据
    filter: debounce(function(val) {
      // 过滤数据时改变全选框的状态
      if (this.multiple) {
        this.changeNodes(this.checkedValue);
      }

      // 筛选数据
      this.showData = this.formatData.filter(item => {
        return this.isIncludes(item.label, val);
      });
      this.$nextTick(() => {
        this.broadcast("ElSelectDropdown", "updatePopper");
      });
    }, 300),

    // 设置选择节点
    setChecked(val) {
      // this.$nextTick(() => {
      //   this.checkedValue = val;
      //   if (this.multiple) {
      //     this.changeNodes(val);
      //   }
      //   this.setSelectText(val);
      // });
      this.checkedValue = val;
      if (this.multiple) {
        this.changeNodes(val);
      }
      this.setSelectText(val);
    },

    // 判断复选框的全选显示状态
    changeNodes(val) {
      this.$nextTick(() => {
        let s = 0;
        // 筛选出不能选择的数据
        let filterData = this.showData.filter(item => item.disabled !== true);

        let l = filterData.length;

        for (let i = 0; i < l; i++) {
          if (val.includes(filterData[i].id)) {
            s++;
          }
        }
        this.checkedAll = s > 0 && s === l ? true : false;

        this.isIndeterminate = !this.checkedAll && s > 0;
      });
    },

    // 设置输入框显示文字，此方法在多选下适用
    setSelectText(ids) {
      if (this.multiple) {
        const l = ids.length;
        if (l === 1) {
          for (let i = 0, j = this.formatData.length; i < j; i++) {
            let item = this.formatData[i];
            if (this.checkedValue.includes(item.id)) {
              this.selectText = item.label;
              break;
            }
          }
        } else if (l > 1) {
          this.selectText = this.prefix + l;
        } else {
          this.selectText = "";
        }
      } else {
        const node = this.formatData.find(item => item.id === ids);
        this.selectText = node ? node.label : "";
      }
    },

    // 获取选择节点
    getChecked() {
      const data = {
        id: this.checkedValue,
        node: []
      };
      if (this.multiple) {
        for (let i = 0, l = this.formatData.length; i < l; i++) {
          let obj = this.formatData[i];
          if (this.checkedValue.includes(obj.id)) {
            data.node.push(obj);
          }
        }
      } else {
        for (let i = 0, l = this.formatData.length; i < l; i++) {
          let obj = this.formatData[i];
          if (this.checkedValue === obj.id) {
            data.node = obj;
            break;
          }
        }
      }
      return data;
    },

    // 清楚选择
    deleteSelected(event) {
      event.stopPropagation();
      this.clear();
      this.$emit("clear");
    },

    clear() {
      this.checkedValue = this.multiple ? [] : "";
      if (this.multiple) {
        this.changeNodes(this.checkedValue);
      }
      this.$emit("input", this.checkedValue);
    },

    // 检测字符串是否被包含
    isIncludes(all, part) {
      return all.toLowerCase().includes(part.toLowerCase().trim());
    },

    // 搜索 input 聚焦
    focus() {
      if (!this.search) return;
      this.$refs.searchInput.focus();
    }
  }
};
</script>

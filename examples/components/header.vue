<template>
  <div class="headerWrapper">
      <div class="container header">
        <h1><router-link :to="`/`">
          <!-- logo -->
          <slot>
            <img
              src="./../assets/logo.png"
              alt="element-logo"
              class="nav-logo">
            <img
              src="./../assets/logo-mini.png"
              class="nav-logo-small">
          </slot>
        </router-link>
        </h1>

        <!-- nav -->
        <ul class="nav">
          <!-- <li class="nav-item nav-algolia-search">
            搜索
          </li> -->
          <li class="nav-item">
            <router-link
              active-class="active"
              to="/component">指南
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
              active-class="active"
              to="/">组件
            </router-link>
          </li>
         
         

          <!-- gap -->
          <li class="nav-item">
            <div class="nav-gap"></div>
          </li>

           <li class="nav-item">
            <router-link
              active-class="active"
              to="/methods">方法库
            </router-link>
          </li>

          <!-- 版本选择器 -->
          <!-- <li class="nav-item nav-versions" v-show="isComponentPage">
            <el-dropdown
              trigger="click"
              class="nav-dropdown"
              :class="{ 'is-active': verDropdownVisible }">
              <span>
                {{ version }}
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu
                slot="dropdown"
                class="nav-dropdown-list"
                @input="handleVerDropdownToggle">
                <el-dropdown-item
                  v-for="item in Object.keys(versions)"
                  :key="item"
                  @click.native="switchVersion(item)">
                  {{ item }}
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </li> -->

          <!-- 语言选择器 -->
          <!-- <li class="nav-item lang-item">
            <el-dropdown
              trigger="click"
              class="nav-dropdown nav-lang"
              :class="{ 'is-active': langDropdownVisible }">
              <span>
                {{ displayedLang }}
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu
                slot="dropdown"
                class="nav-dropdown-list"
                @input="handleLangDropdownToggle">
                <el-dropdown-item
                  v-for="(value, key) in langs"
                  :key="key"
                  @click.native="switchLang(key)">
                  {{ value }}
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </li> -->
        </ul>
      </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>
<style lang="scss" scoped>

.headerWrapper {
    height: 60px;
    background-color: #2b405f;
  }
.el-header {
  position: fixed;
  top:0;
}
.header {
    height: 60px;
    color: #fff;
    top: 0;
    left: 0;
    width: 100%;
    line-height: 60px;
    z-index: 100;
    position: relative;

    .container {
      height: 100%;
      box-sizing: border-box;
      border-bottom: 1px solid #DCDFE6;
    }

    .nav-lang-spe {
      color: #888;
    }

    h1 {
      margin: 0;
      float: left;
      font-size: 32px;
      height: 60px;
      font-weight: normal;

      a {
        color: #333;
        text-decoration: none;
        display: block;
      }

      span {
        font-size: 12px;
        display: inline-block;
        width: 34px;
        height: 18px;
        border: 1px solid rgba(255, 255, 255, .5);
        text-align: center;
        line-height: 18px;
        vertical-align: middle;
        margin-left: 10px;
        border-radius: 3px;
      }
    }

    .nav {
      float: right;
      height: 100%;
      line-height: 80px;
      background: transparent;
      padding: 0;
      margin: 0;
      &::before, &::after {
        display: table;
        content: "";
      }
      &::after {
        clear: both;
      }
    }

    .nav-gap {
      position: relative;
      width: 1px;
      height: 60px;
      padding: 0 20px;

      &::before {
        content: '';
        position: absolute;
        top: calc(50% - 8px);
        width: 1px;
        height: 16px;
        background: #4a658b;
      }
    }

    .nav-logo,
    .nav-logo-small {
          height: 50px;
          padding-top: 5px;
    }

    .nav-logo-small {
      display: none;
    }

    .nav-item {
      margin: 0;
      float: left;
      line-height: 60px;
      list-style: none;
      position: relative;
      cursor: pointer;
    
      &.nav-algolia-search {
        cursor: default;
      }
    
      &.lang-item,
      // &:last-child {
      //   cursor: default;
      //   margin-left: 34px;

      //   span {
      //     opacity: .8;
      //   }

      //   .nav-lang {
      //     cursor: pointer;
      //     display: inline-block;
      //     height: 100%;
      //     color: #888;

      //     &:hover {
      //       color: #409EFF;
      //     }
      //     &.active {
      //        font-weight: bold;
      //        color: #409EFF;
      //      }
      //   }
      // }

      a {
        text-decoration: none;
        color: #fff;
        opacity: 0.5;
        display: block;
        padding: 0 22px;

        &.active,
        &:hover {
          opacity: 1;
        }

        &.active::after {
          content: '';
          display: inline-block;
          position: absolute;
          bottom: 0;
          left: calc(50% - 15px);
          width: 30px;
          height: 2px;
          background: #409EFF;
        }
      }
    }
  }

  .nav-dropdown {
    margin-bottom: 6px;
    padding-left: 18px;
    width: 100%;

    span {
      display: block;
      width: 100%;
      font-size: 16px;
      color: #888;
      line-height: 40px;
      transition: .2s;
      padding-bottom: 6px;
      user-select: none;

      &:hover {
         cursor: pointer;
       }
    }

    i {
      transition: .2s;
      font-size: 12px;
      color: #979797;
      transform: translateY(-2px);
    }

    .is-active {
      span, i {
        color: #409EFF;
      }
      i {
        transform: rotateZ(180deg) translateY(3px);
      }
    }

    &:hover {
      span, i {
        color: #409EFF;
      }
    }
  }
  
  .nav-dropdown-list {
    width: auto;
  }

  @media (max-width: 850px) {
    .header {
      .nav-logo {
        display: none;
      }
      .nav-logo-small {
        display: inline-block;
      }
      .nav-item {
        margin-left: 6px;

        &.lang-item,
        &:last-child {
          margin-left: 10px;
        }
         
        a {
          padding: 0 5px;
        }
      }
      .nav-theme-switch, .nav-algolia-search {
        display: none;
      }
    }
  }

  @media (max-width: 700px) {
    .header {
      .container {
        padding: 0 12px;
      }
      .nav-item {
        a {
          font-size: 12px;
          vertical-align: top;
        }

        &.lang-item {
          height: 100%;
         
          .nav-lang {
            display: flex;
            align-items: center;
            
            span {
              padding-bottom: 0;
            }
          }
        }
      }
      .nav-dropdown {
        padding: 0;
        span {
          font-size: 12px;
        }
      }
      .nav-gap {
        padding: 0 8px;
      }
      .nav-versions {
        display: none;
      }
    }
  }
</style>
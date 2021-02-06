<template>
  <div>
    <div class="main-cnt">
      <div>
        <div class="banner">
          <div class="banner-desc">
            <h1>VFan-ui</h1>
            <!-- <h2>一套基于Vue的通用业务组件库</h2> -->
            <p>一套基于Vue的通用业务组件库,弥补和扩展了主流组件库所缺少的组件，方便在业务中使用，减少重复造轮子。</p>
          </div>
        </div>
        <div class="jumbotron"><img src="static/theme-index-blue.c38b733.png"
               alt="">
          <div class="jumbotron-red"
               style="height: 0px;"><img src="static/theme-index-blue.c38b733.png"
                 alt=""></div>
        </div>
        <div class="cards">
          <ul class="container">
            <li>
              <div class="card"><img src="@/assets/images/ico22.png"
                     alt="">
                <h3>精简</h3>
                <p>代码精简，组件的复用性和扩展性强。</p>
              </div>
            </li>
              <li>
              <div class="card"><img src="@/assets/images/ico23.png"
                     alt="">
                <h3>灵活</h3>
                <p>直接引入和按需引入，可以根据需要灵活选择。</p>
              </div>
            </li>
            <li>
              <div class="card"><img src="@/assets/images/ico23.png"
                     alt="">
                <h3>组件</h3>
                <p>使用组件 Demo 快速体验交互细节；使用前端框架封装的代码帮助工程师快速开发。</p>
              </div>
            </li>
            <li>
              <div class="card"><img src="@/assets/images/ico24.png"
                     alt="">
                <h3>延伸性强</h3>
                <p>组件的延伸性强，不强依赖于某个组件库，可以根据项目中不同的组件库，轻松植入。</p>
              </div>
            </li>
          
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.main-cnt {
  margin-top: -80px;
  padding: 80px 0 340px;
  box-sizing: border-box;
  min-height: 100%;
}
@media (max-width: 1140px) {
  .cards[data-v-10b2420c] {
    width: 100%;
  }
  .cards .container[data-v-10b2420c] {
    width: 100%;
    margin: 0;
  }
}
.banner {
  text-align: center;
}
.banner-desc {
  padding-top: 20px;
  h1 {
    font-size: 34px;
    margin: 0;
    line-height: 48px;
    color: #555;
  }
  p {
    font-size: 18px;
    line-height: 28px;
    color: #888;
    margin: 10px 0 5px;
  }
}

.cards {
  margin: 0 auto 110px;
  width: 1140px;
  .container {
    padding: 0;
    margin: 0 -11px;
    width: auto;
    &:after,
    &:before {
      display: table;
      content: "";
    }
    li {
      width: 25%;
      padding: 0 19px;
      box-sizing: border-box;
      float: left;
      list-style: none;
    }
  }
}

.card {
  height: 430px;
  width: 100%;
  background: #fff;
  border: 1px solid #eaeefb;
  border-radius: 5px;
  box-sizing: border-box;
  text-align: center;
  position: relative;
  transition: all 0.3s ease-in-out;
  bottom: 0;
  &:hover {
    bottom: 6px;
    box-shadow: 0 6px 18px 0 rgba(232, 237, 250, 0.5);
  }
  img {
    margin: 66px auto 60px;
    width: 160px;
    height: 120px;
  }
  h3 {
    margin: 0;
    font-size: 18px;
    color: #1f2f3d;
    font-weight: 400;
  }
  p {
    font-size: 14px;
    color: #99a9bf;
    padding: 0 25px;
    line-height: 20px;
  }
}
</style>
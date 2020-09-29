<template>
    <div class="demo-split">
        <panelSplit v-model="split3">
            <div slot="left" class="demo-split-pane no-padding">
                <panelSplit v-model="split4" mode="vertical">
                    <div slot="top" class="demo-split-pane">
                        Top Pane
                    </div>
                    <div slot="bottom" class="demo-split-pane">
                        Bottom Pane
                    </div>
                </panelSplit>
                
            </div>
            <div slot="right" class="demo-split-pane">
                Right Pane
            </div>
        </panelSplit>
         <div>
      <Poptip content="确定删除此段工作经历，是否永久删除？"
              @confirm="confirm"><v-button type="primary"
              shadow>删除</v-button></Poptip>
    </div>
    </div>
</template>

<script>
// import Split from "./panelSplit"
    export default {
        data () {
            return {
                split3: 0.5,
                split4: 0.5
            }
        },
        methods:{
          confirm () {
            alert(1)
          }
        }
    }
</script>
<style>
    .demo-split{
        height: 200px;
        border: 1px solid #dcdee2;
    }
    .demo-split-pane.no-padding{
        height: 200px;
        padding: 0;
    }
</style>
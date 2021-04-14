## Card 卡片【文档待编写】
:::demo 

```html
    <ul class="list-float w4">
        <li v-if="show">
            <v-select
              virtual
              multiple
              clearable
              v-model="editForm.goodTypeIdList"
              placeholder="请选择"
              :data="goodTypeData"
            >
            </v-select>
        </li>
    </ul>
    <script>
    export default {
      data(){
          return {
            show:false,
              editForm:{
                goodTypeIdList:[]
              },
              dialogTableVisible:true,
              goodTypeData: [
                {id:1,label:"苹果"},
                {id:2,label:"橘子"},
                {id:3,label:"桃子"},
                {id:4,label:"西红柿"},
                {id:5,label:"西蓝花"},
                {id:6,label:"茄子"},
                {id:7,label:"菠菜"},
                {id:8,label:"龙眼2"},
                {id:9,label:"荔枝"},
                {id:10,label:"火龙果"},
                {id:11,label:"葡萄"},
                {id:12,label:"西瓜"},
                {id:13,label:"黄瓜"},
                {id:14,label:"梨子"},
                {id:15,label:"杏"},
                {id:16,label:"香蕉"}
              ]
          }
      }
    }
    </script>
``
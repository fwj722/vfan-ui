## Card 卡片【文档待编写】
:::demo 

```html
    <ul class="list-float w4">
        <li>
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
              editForm:{
                goodTypeIdList:[]
              },
              dialogTableVisible:true,
              goodTypeData: [
                {id:1,label:"222"},
                {id:2,label:"333"},
                {id:3,label:"222"},
                {id:4,label:"333"},
                {id:5,label:"222"},
                {id:6,label:"333"},
                {id:7,label:"222"},
                {id:8,label:"333"},
                {id:9,label:"222"},
                {id:10,label:"333"},
                {id:11,label:"222"},
                {id:12,label:"333"},
                {id:13,label:"222"},
                {id:14,label:"333"},
                {id:15,label:"222"},
                {id:16,label:"333"},
                {id:17,label:"222"},
                {id:18,label:"333"},
                {id:19,label:"222"},
                {id:110,label:"333"},
              ]
          }
      }
    }
    </script>
``
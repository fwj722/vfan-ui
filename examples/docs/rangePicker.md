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
                {id:1,label:"陕AHJ908"},
                {id:2,label:"陕A66898"},
                {id:3,label:"陕A33508"},
                {id:4,label:"陕BHH123"},
                {id:5,label:"京AJ9w08"},
                {id:6,label:"粤A89888"},
                {id:7,label:"浙A88767"},
                {id:8,label:"青C8898S"},
                {id:9,label:"青A88DD3"},
                {id:10,label:"藏AC8438"},
                {id:11,label:"冀A88GH2"},
                {id:12,label:"陕A88G99"},
                {id:13,label:"陕U8988F"},
                {id:14,label:"海AYH231"},
                {id:15,label:"海A33422"},
                {id:16,label:"晋B78UhU"},
                {id:17,label:"陕C9009G"},
                {id:18,label:"新A67890"},
                {id:19,label:"黑AIJU78"},
                {id:20,label:"皖A787GH"}
              ]
          }
      }
    }
    </script>
``
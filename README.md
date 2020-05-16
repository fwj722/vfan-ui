# vfan-ui

## Project UI install
```
npm install vfan-ui  --save
```

### 全局引入
```
 import VFanUI from 'vfan-ui'
 import 'vfan-ui/dist/vfan-ui.css'
    
    Vue.use(VFanUI)
```

### 然后页面就可以直接使用，以button为例
```
	<v-button type="default">默认按钮</v-button>
    <v-button type="primary">主要按钮</v-button>
    <v-button type="success">成功按钮</v-button>
    <v-button type="warning">警告按钮</v-button>
    <v-button type="danger">危险按钮</v-button>
    <v-button type="purple">其他按钮</v-button>
    <v-button type="info">信息按钮</v-button>
```

### Run your end-to-end tests
```
npm run test:e2e
```
npm login=->npm publish

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

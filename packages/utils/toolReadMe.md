eg:
```javascript
const date = moment().format("YYYYMMDDHHmmss");
axios({
  url: '/user',
  method: 'get',
  responseType: 'blob'
}).then( res => {
  this.exportExcel(res, `课程成绩列表${date}.xls`);
}).catch( e => {
  console.info(e)
})
```


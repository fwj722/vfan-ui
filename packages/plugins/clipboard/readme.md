用法：
1引进来：import copy from "./copy";
2.使用：
 <button @click="handleCopy">复制</button>
handleCopy() {
      copy({
        text: "666666666666666666666666666666"
      });
    }

copy里面可配参数有：
text,
  showSuccessTip,
  showFailureTip,
  successCallback,
  failureCallback
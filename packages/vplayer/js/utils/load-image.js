/**
 * 因此使用“ naturalWidth”来确定图像是否已加载
 * 默认情况下，它检查是否至少为1px，也可以添加第二个参数来更改此值
 */
export default function loadImage(src, minWidth = 1) {
  return new Promise((resolve, reject) => {
    const image = new Image();

    const handler = () => {
      delete image.onload;
      delete image.onerror;
      (image.naturalWidth >= minWidth ? resolve : reject)(image);
    };

    Object.assign(image, { onload: handler, onerror: handler, src });
  });
}

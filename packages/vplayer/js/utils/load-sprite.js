/**
 * 加载精灵图
 */
import Storage from '../storage';
import fetch from './fetch';
import is from './is';

// 加载外部SVG精灵图
export default function loadSprite(url, id) {
  if (!is.string(url)) {
    return;
  }

  const prefix = 'cache';
  const hasId = is.string(id);
  let isCached = false;
  const exists = () => document.getElementById(id) !== null;

  const update = (container, data) => {
    // eslint-disable-next-line no-param-reassign
    container.innerHTML = data;

    if (hasId && exists()) {
      return;
    }

    //将SVG注入body中
    document.body.insertAdjacentElement('afterbegin', container);
  };

  // 如果设置了ID，则只加载一次
  if (!hasId || !exists()) {
    const useStorage = Storage.supported;

    const container = document.createElement('div');
    container.setAttribute('hidden', '');

    if (hasId) {
      container.setAttribute('id', id);
    }

    //  检查缓存
    if (useStorage) {
      const cached = window.localStorage.getItem(`${prefix}-${id}`);
      isCached = cached !== null;

      if (isCached) {
        const data = JSON.parse(cached);
        update(container, data.content);
      }
    }

    // 获得精灵图
    fetch(url)
      .then(result => {
        if (is.empty(result)) {
          return;
        }

        if (useStorage) {
          window.localStorage.setItem(
            `${prefix}-${id}`,
            JSON.stringify({
              content: result,
            }),
          );
        }

        update(container, result);
      })
      .catch(() => {});
  }
}

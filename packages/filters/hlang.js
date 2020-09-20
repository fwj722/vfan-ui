import locale from './../locale';

export default function (key, value, defaultValue) {
  if (defaultValue == null) {
    return locale.t(key, value);
  }
  return defaultValue;
}

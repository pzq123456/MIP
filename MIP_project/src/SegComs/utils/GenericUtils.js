import { GenericAnatomyColors, GenericNames } from './GenericAnatomyColors';

/**
 * 返回一个随机整数 [min, max)
 * @param {number} min
 * @param {number} max
 * @returns {number} random int
  */
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

/**
 * 返回一个随机rgb颜色 
 * @returns {string} random rgb color
 */
function randomRGB() {
  const o = Math.round,
    r = Math.random,
    s = 255;
  return rgbToHex(o(r() * s), o(r() * s), o(r() * s));
}

/**
 * 返回一个随机名称
 * @returns  {string} random name
 */
function randomName() {
  return GenericNames[getRandomInt(0, GenericNames.length)];
}

/**
 * 将rgb转换为hex 
 * @param {number} c  
 * @returns {string} hex color
 */
function componentToHex(c) {
  const hex = c.toString(16);
  return hex.length === 1 ? '0' + hex : hex;
}

/**
 * 将rgb转换为hex
 * @param {*} r
 * @param {*} g 
 * @param {*} b 
 * @returns 
 */
function rgbToHex(r, g, b) {
  return '#' + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

/**
 * 将hex转换为rgb
 * @param {*} hex 
 * @returns 
 */
function hexToRgb(hex) {
  // 作用：将hex转换为rgb
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex); 

  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

/**
 * 获取标签颜色
 * @param {*} label 
 * @param {*} rgb 
 * @returns 
 */
function getLabelColor(label, rgb = true) {
  const name = label.toLowerCase();

  for (const i of GenericAnatomyColors) {
    if (i.label === name) {
      return rgb ? hexToRgb(i.value) : i.value;
    }
  }
  return null;
}

/**
 * cookie工具类
 */
export class CookieUtils {

  /**
   * 设置cookie
   * @param {*} name
   * @param {*} value
   * @param {*} exp_y
   * @param {*} exp_m 
   * @param {*} exp_d
   * @param {*} path
   * @param {*} domain  
   * @param {*} secure
   */

  static setCookie(name, value, exp_y, exp_m, exp_d, path, domain, secure) {
    // 作用：设置cookie
    let cookie_string = name + '=' + escape(value);
    if (exp_y) {
      let expires = new Date(exp_y, exp_m, exp_d);
      cookie_string += '; expires=' + expires.toGMTString();
    }
    if (path) cookie_string += '; path=' + escape(path);
    if (domain) cookie_string += '; domain=' + escape(domain);
    if (secure) cookie_string += '; secure';
    document.cookie = cookie_string;
  }

  static getCookie(cookie_name) {
    // 作用：获取cookie
    let results = document.cookie.match(
      '(^|;) ?' + cookie_name + '=([^;]*)(;|$)'
    );
    if (results) return unescape(results[2]);
    else return null;
  }

  static getCookieString(name, defaultVal = '') {
    // 作用：获取cookie字符串
    const val = CookieUtils.getCookie(name); // 获取cookie
    console.debug(name + ' = ' + val + ' (default: ' + defaultVal + ' )');
    if (!val) {
      CookieUtils.setCookie(name, defaultVal);
      return defaultVal;
    }
    return val;
  }

  static getCookieBool(name, defaultVal = false) {
    // 作用：获取cookie布尔值
    const val = CookieUtils.getCookie(name, defaultVal);
    return !!JSON.parse(String(val).toLowerCase());
  }

  static getCookieNumber(name, defaultVal = 0) {
    // 作用：获取cookie数字
    const val = CookieUtils.getCookie(name, defaultVal);
    return Number(val);
  }
}

export {
  getRandomInt,
  randomRGB,
  randomName,
  rgbToHex,
  hexToRgb,
  getLabelColor,
};

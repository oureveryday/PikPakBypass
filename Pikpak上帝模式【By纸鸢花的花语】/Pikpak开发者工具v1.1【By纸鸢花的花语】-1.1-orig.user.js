// ==UserScript==
// @name         Pikpak开发者工具【By纸鸢花的花语】
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  PikPak地区限制解除，随机设备号生成、平台版本切换登录，模拟移动端邀请码填写行为。
// @author       纸鸢花的花语,vvbbnn00
// @icon         https://pic.imgdb.cn/item/66669cd95e6d1bfa05eb991b.jpg
// @grant        none
// @match        *://mypikpak.com/*
// @match        *://pikpak.me/*
// @match        *://mypikpak.net/*
// @require      https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/crypto-js.min.js

// ==/UserScript==

(function () {
  'use strict';

  function _0x1fde32(_0x5ea11c, _0xa8f266) {
    let _0x14b64d = document.getElementById(_0x5ea11c);
    if (_0x14b64d) {
      _0x14b64d.setAttribute("value", _0xa8f266);
      _0x14b64d.innerHTML = "Yes";
    }
  }
  function _0x5945bc() {
    let _0x4c0ff4 = _0x4719b6().replace(/-/g, '');
    return _0x4c0ff4;
  }
  function _0x4719b6() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (_0x542ac6) {
      let _0x3ee07c = Math.random() * 16 | 0;
      let _0xbd8dc7 = _0x542ac6 === 'x' ? _0x3ee07c : _0x3ee07c & 3 | 8;
      return _0xbd8dc7.toString(16);
    });
  }
  function _0x4ad286(_0x44c531, _0x654d7a) {
    let _0x4f0c37 = _0x44c531;
    for (let _0x274d57 = 0; _0x274d57 < _0x654d7a.length; _0x274d57++) {
      _0x4f0c37 = CryptoJS.MD5(_0x4f0c37 + _0x654d7a[_0x274d57].salt).toString();
    }
    return _0x4f0c37;
  }
  function _0x548988(_0x2bbc84) {
    let _0x268f83 = _0x2bbc84 % 26;
    let _0x4d1b16 = String.fromCharCode(65 + _0x268f83);
    return _0x4d1b16;
  }
  function _0x20eb62() {
    let _0x4400ea = Date.now();
    let _0x49cab7 = new Date(_0x4400ea);
    _0x49cab7.setMinutes(0);
    _0x49cab7.setSeconds(0);
    _0x49cab7.setMilliseconds(0);
    let _0x35c078 = _0x49cab7.getTime();
    let _0x4c8776 = _0x548988(_0x35c078) + _0x4ad286(String(_0x35c078), _0x1d39e8.extension.salts["default"]).slice(0, 9);
    let _0x1f4b92 = document.getElementById("input_str");
    let _0x140075 = _0x1f4b92.value;
    localStorage.setItem("pk_key", _0x140075);
    return _0x4ad286(_0x4c8776, _0x1d39e8.extension.salts["default"]) == _0x4ad286(_0x140075, _0x1d39e8.extension.salts["default"]);
  }
  function _0x109fa6() {
    var _0x363369 = document.cookie.split(';');
    for (var _0x13ad80 = 0; _0x13ad80 < _0x363369.length; _0x13ad80++) {
      var _0x1ffcbe = _0x363369[_0x13ad80];
      var _0x42f417 = _0x1ffcbe.indexOf('=');
      var _0x9502f2 = _0x42f417 > -1 ? _0x1ffcbe.substr(0, _0x42f417) : _0x1ffcbe;
      document.cookie = _0x9502f2 + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
  }
  function _0x50931a() {
    localStorage.setItem("platform", _0x155ded.value);
    localStorage.setItem("version", _0x5cf8d2.value);
  }
  function _0x115f91() {
    if (_0x3a54af && _0x241830) {
      if (_0x3a54af) {
        _0x155ded.value = _0x3a54af;
        _0x155ded.dispatchEvent(new Event("change"));
      }
      if (_0x241830) {
        setTimeout(() => {
          _0x5cf8d2.value = _0x241830;
        }, 50);
      }
    }
  }
  function _0x1638e2() {
    const _0x3e288e = document.createElement("style");
    _0x3e288e.setAttribute("type", "text/css");
    _0x3e288e.innerHTML = "\n :root {\n        --primary-color: #4285f4;\n        --primary-hover: #3367d6;\n        --text-color: #333;\n        --light-gray: #f5f5f5;\n        --border-color: #e0e0e0;\n        --shadow: 0 4px 12px rgba(0, 0, 0, 0.1);\n        --border-radius: 8px;\n        --spacing: 12px;\n    }\n\n    .popover {\n        position: relative;\n        display: inline-block;\n        font-family: 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;\n    }\n\n    /* 按钮样式 */\n    .kite-btn {\n        padding: 10px 20px;\n        border: none;\n        border-radius: var(--border-radius);\n        background-color: var(--light-gray);\n        color: var(--text-color);\n        font-weight: 500;\n        cursor: pointer;\n        transition: all 0.2s ease;\n        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);\n    }\n\n    .kite-btn:hover {\n        background-color: #e0e0e0;\n        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);\n    }\n\n    .kite-btn.primary {\n        background-color: var(--primary-color);\n        color: white;\n    }\n\n    .kite-btn.primary:hover {\n        background-color: var(--primary-hover);\n    }\n\n    /* 弹出框内容 */\n    .popover-content {\n        position: absolute;\n        width: 320px;\n        background: white;\n        border-radius: var(--border-radius);\n        box-shadow: var(--shadow);\n        padding: var(--spacing);\n        opacity: 0;\n        visibility: hidden;\n        transition: all 0.2s ease;\n        z-index: 1000;\n        margin-top: 8px;\n    }\n\n    .popover:hover .popover-content {\n        opacity: 1;\n        visibility: visible;\n    }\n\n    /* 弹出框箭头 */\n    .popover-content::before {\n        content: \"\";\n        position: absolute;\n        top: -6px;\n        left: 20px;\n        width: 12px;\n        height: 12px;\n        background: white;\n        transform: rotate(45deg);\n        box-shadow: -2px -2px 4px rgba(0, 0, 0, 0.05);\n    }\n\n    /* 头部样式 */\n    .popover-header {\n        font-size: 16px;\n        font-weight: 600;\n        color: var(--text-color);\n        margin-bottom: var(--spacing);\n        padding-bottom: 8px;\n        border-bottom: 1px solid var(--border-color);\n    }\n\n    .author {\n        font-size: 12px;\n        color: #666;\n        font-weight: normal;\n        margin-left: 8px;\n    }\n\n    /* 输入框样式 */\n    .kite-input {\n        width: 100%;\n        padding: 10px 12px;\n        border: 1px solid var(--border-color);\n        border-radius: var(--border-radius);\n        font-size: 14px;\n        transition: border 0.2s ease;\n        margin-bottom: var(--spacing);\n    }\n\n    .kite-input:focus {\n        outline: none;\n        border-color: var(--primary-color);\n        box-shadow: 0 0 0 2px rgba(66, 133, 244, 0.2);\n    }\n\n    /* 下拉选择框 */\n    .kite-select {\n        flex: 1;\n        padding: 10px 12px;\n        border: 1px solid var(--border-color);\n        border-radius: var(--border-radius);\n        font-size: 14px;\n        background-color: white;\n        cursor: pointer;\n        appearance: none;\n        background-image: url(\"data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e\");\n        background-repeat: no-repeat;\n        background-position: right 8px center;\n        background-size: 16px;\n    }\n\n    .kite-select:focus {\n        outline: none;\n        border-color: var(--primary-color);\n    }\n\n    /* 弹性布局 */\n    .kite-flex {\n        display: flex;\n        width: 100%;\n        gap: var(--spacing);\n        margin-bottom: var(--spacing);\n    }\n\n    .kite-spacer {\n        flex: 0.1;\n    }\n\n    /* 提示信息 */\n    .alert-message {\n        font-size: 13px;\n        color: #666;\n        line-height: 1.5;\n        padding: 10px;\n        white-space: wrap;\n        background-color: #f8f9fa;\n        border-radius: var(--border-radius);\n    }\n\n    .alert-link {\n        color: var(--primary-color);\n        text-decoration: none;\n    }\n\n    .alert-link:hover {\n        text-decoration: underline;\n    }\n        .folder-navigator{\n            overflow: unset;\n        }\n            .no-btn{\n            border: none;\n    background: none;\n            }\n";
    let _0x30fac3 = document.querySelector("head");
    _0x30fac3.appendChild(_0x3e288e);
  }
  function _0x5315df() {
    let _0x79cf26 = document.createElement('li');
    _0x79cf26.id = "qBox";
    _0x79cf26.innerHTML = "\n<div class=\"popover\">\n    <button class=\"no-btn\">PikPak工具</button>\n\n    <div class=\"popover-content\">\n        <div class=\"popover-header\">PikPak开发者工具-v1.1.0 <span class=\"author\">B站：纸鸢花的花语</span></div>\n        <div>\n            <input class=\"kite-input\" type=\"text\" name=\"\" id=\"input_str\" placeholder=\"请输入脚本密钥...\">\n        </div>\n        <div class=\"kite-flex\">\n            <select id=\"kite-platform\" class=\"kite-select\">\n                <option value=\"android\">安卓端</option>\n                <option value=\"web\">网页端</option>\n            </select>\n            <div class=\"kite-spacer\"></div>\n            <select id=\"kite-version\" class=\"kite-select\">\n                <option value=\"\">请选择版本</option>\n            </select>\n        </div>\n        <div class=\"kite-flex\">\n            <button id=\"account_btn\" class=\"kite-btn primary\">\n                账号令牌信息\n            </button>\n        </div>\n        <div id=\"alert_box\" class=\"alert-message\">\n            脚本仅供交流学习，为防止倒卖，脚本密钥可在\n            <a href=\"https://kiteyuan.info/\" class=\"alert-link\">kiteyuan.info</a>直接获取，查看说明文档：<a href=\"https://blog.kiteyuan.info/\" class=\"alert-link\">纸鸢博客</a>\n        </div>\n    </div>\n</div>\n";
    let _0xcef597 = document.querySelector("#app > div.layout > div.main > div > div.all.file-explorer > div.grid.file-explorer-header > div > div:nth-child(1) > nav > ol.real");
    if (_0xcef597) {
      _0xcef597.insertBefore(_0x79cf26, _0xcef597.firstChild);
      if (localStorage.getItem("pk_key")) {
        let _0x5340cc = document.getElementById("input_str");
        _0x5340cc.value = localStorage.getItem("pk_key");
      }
    } else {
      console.log('尝试');
      setTimeout(_0x5315df, 1000);
    }
  }
  function _0x4ea13b(_0x395412) {
    navigator.clipboard.writeText(_0x395412).then(() => {
      console.log("复制成功");
    })["catch"](_0x1e371e => {
      console.error("复制失败:", _0x1e371e);
    });
  }
  function _0x3898b6() {
    const _0xb8b7b5 = document.getElementById("device_id").getAttribute("value");
    const _0x583ef5 = document.getElementById("client_id").getAttribute("value");
    const _0x1f9302 = document.getElementById("captcha_token").getAttribute("value");
    const _0x39c157 = document.getElementById("access_token").getAttribute("value");
    const _0x25a6c3 = document.getElementById("user_id").getAttribute("value");
    const _0x162e7e = localStorage.getItem("kite_refresh_token");
    const _0x2e8998 = document.getElementById("email").getAttribute("value");
    const _0xbea643 = document.getElementById("name").getAttribute("value");
    const _0x38efc2 = document.getElementById("password").getAttribute("value");
    const _0x564ce4 = localStorage.hasOwnProperty("platform") ? localStorage.getItem("platform") : "android";
    const _0x568608 = localStorage.hasOwnProperty("version") ? localStorage.getItem("version") : "1.42.6";
    const _0x78eea0 = {
      'device_id': _0xb8b7b5,
      'client_id': _0x583ef5,
      'captcha_token': _0x1f9302,
      'access_token': _0x39c157,
      'user_id': _0x25a6c3,
      'refresh_token': _0x162e7e,
      'email': _0x2e8998,
      'name': _0xbea643,
      'password': _0x38efc2,
      'platform': _0x564ce4,
      'version': _0x568608,
      'timestamp': Date.now().toString()
    };
    _0x4ea13b(JSON.stringify(_0x78eea0));
    alert("账号令牌已复制至剪切板");
  }
  function _0x2505ec(_0x42be90, _0x55d5e9) {
    switch (_0x55d5e9.toLowerCase()) {
      case "sha256":
        return btoa(CryptoJS.SHA256(_0x42be90).toString(CryptoJS.enc.Latin1));
      case "md5":
        return btoa(CryptoJS.MD5(_0x42be90).toString(CryptoJS.enc.Latin1));
      case "sha1":
        return btoa(CryptoJS.SHA1(_0x42be90).toString(CryptoJS.enc.Latin1));
      default:
        throw new Error("Unsupported hashing method: " + _0x55d5e9);
    }
  }
  function _0x2fea21(_0x2e82ef, _0x44808a) {
    let _0x4bff4b = 0;
    for (let _0x13a92c = 0; _0x13a92c < Math.min(_0x2e82ef.length, _0x44808a.length); _0x13a92c++) {
      if (_0x2e82ef[_0x13a92c] !== _0x44808a[_0x13a92c]) {
        _0x4bff4b++;
      }
    }
    return _0x4bff4b;
  }
  function _0x5733be(_0x2df27a) {
    const _0x5a2f73 = _0x2df27a.match(/calcFn\s*=\s*injectedDeps\[_0x[a-f0-9]+\('([^']+)'\)\]/);
    const _0x5d6e51 = _0x5a2f73 ? _0x5a2f73[1] : (_0x2df27a.match(/'(sha1|md5|sha256)'/) || [])[1];
    const _0x203dc8 = (_0x2df27a.match(/calcFn\(hashResult\)/g) || []).length;
    const _0x4c54df = (_0x2df27a.match(/['"]([0-9a-f-]+(?:hello_world)?)['"]/g) || []).map(_0xbafbc0 => _0xbafbc0.replace(/['"]/g, ''));
    const _0x1d845f = _0x4c54df.find(_0x513aa0 => _0x513aa0.includes("hello_world")) || '';
    const _0x24fb44 = _0x1d845f.replace("hello_world", '');
    const _0x1dbf7f = _0x4c54df.find(_0x225bd4 => _0x225bd4 !== _0x1d845f && _0x225bd4.length === _0x24fb44.length && _0x2fea21(_0x225bd4, _0x24fb44) < 4) || '';
    let _0x9fd512 = (_0x2df27a.match(/\b([a-f0-9\-]{36})\b/g) || []).filter(_0x34147d => _0x34147d !== _0x1d845f && _0x34147d !== _0x1dbf7f);
    return {
      'method': _0x5d6e51,
      'nums': _0x203dc8,
      'prefix': _0x1d845f,
      'suffix': _0x1dbf7f,
      'request_id': _0x9fd512.length ? _0x9fd512[0] : ''
    };
  }
  function _0x53fa76() {
    return Array.from({
      'length': 0x8
    }, () => Math.floor(Math.random() * 65536).toString(16)).join(':');
  }
  const _0x1d39e8 = {
    'android': {
      'name': "安卓端",
      'client_id': "YNxT9w7GMdWvEOKa",
      'client_secret': "dbw2OtmVEeuUvIptb1Coyg",
      'package_name': "com.pikcloud.pikpak",
      'salts': {
        '1.42.6': [{
          'alg': "md5",
          'salt': "frupTFdxwcJ5mcL3R8"
        }, {
          'alg': "md5",
          'salt': "jB496fSFfbWLhWyqV"
        }, {
          'alg': "md5",
          'salt': "xYLtzn8LT5h3KbAalCjc/Wf"
        }, {
          'alg': "md5",
          'salt': "PSHSbm1SlxbvkwNk4mZrJhBZ1vsHCtEdm3tsRiy1IPUnqi1FNB5a2F"
        }, {
          'alg': "md5",
          'salt': "SX/WvPCRzgkLIp99gDnLaCs0jGn2+urx7vz/"
        }, {
          'alg': "md5",
          'salt': "OGdm+dgLk5EpK4O1nDB+Z4l"
        }, {
          'alg': "md5",
          'salt': "nwtOQpz2xFLIE3EmrDwMKe/Vlw2ubhRcnS2R23bwx9wMh+C3Sg"
        }, {
          'alg': "md5",
          'salt': "FI/9X9jbnTLa61RHprndT0GkVs18Chd"
        }]
      }
    },
    'web': {
      'name': "网页端",
      'client_id': "YUMx5nI8ZU8Ap8pm",
      'package_name': "mypikpak.com",
      'salts': {
        '2.0.0': [{
          'alg': "md5",
          'salt': "C9qPpZLN8ucRTaTiUMWYS9cQvWOE"
        }, {
          'alg': "md5",
          'salt': "+r6CQVxjzJV6LCV"
        }, {
          'alg': "md5",
          'salt': 'F'
        }, {
          'alg': "md5",
          'salt': "pFJRC"
        }, {
          'alg': "md5",
          'salt': "9WXYIDGrwTCz2OiVlgZa90qpECPD6olt"
        }, {
          'alg': "md5",
          'salt': "/750aCr4lm/Sly/c"
        }, {
          'alg': "md5",
          'salt': "RB+DT/gZCrbV"
        }, {
          'alg': "md5",
          'salt': ''
        }, {
          'alg': "md5",
          'salt': "CyLsf7hdkIRxRm215hl"
        }, {
          'alg': "md5",
          'salt': "7xHvLi2tOYP0Y92b"
        }, {
          'alg': "md5",
          'salt': "ZGTXXxu8E/MIWaEDB+Sm/"
        }, {
          'alg': "md5",
          'salt': "1UI3"
        }, {
          'alg': "md5",
          'salt': "E7fP5Pfijd+7K+t6Tg/NhuLq0eEUVChpJSkrKxpO"
        }, {
          'alg': "md5",
          'salt': "ihtqpG6FMt65+Xk+tWUH2"
        }, {
          'alg': "md5",
          'salt': "NhXXU9rg4XXdzo7u5o"
        }]
      }
    },
    'web_init': {
      'name': "初始化",
      'client_id': "YUMx5nI8ZU8Ap8pm",
      'package_name': "drive.mypikpak.com",
      'salts': {
        '2.0.0': [{
          'alg': "md5",
          'salt': "fyZ4+p77W1U4zcWBUwefAIFhFxvADWtT1wzolCxhg9q7etmGUjXr"
        }, {
          'alg': "md5",
          'salt': "uSUX02HYJ1IkyLdhINEFcCf7l2"
        }, {
          'alg': "md5",
          'salt': "iWt97bqD/qvjIaPXB2Ja5rsBWtQtBZZmaHH2rMR41"
        }, {
          'alg': "md5",
          'salt': "3binT1s/5a1pu3fGsN"
        }, {
          'alg': "md5",
          'salt': "8YCCU+AIr7pg+yd7CkQEY16lDMwi8Rh4WNp5"
        }, {
          'alg': "md5",
          'salt': "DYS3StqnAEKdGddRP8CJrxUSFh"
        }, {
          'alg': "md5",
          'salt': "crquW+4"
        }, {
          'alg': "md5",
          'salt': "ryKqvW9B9hly+JAymXCIfag5Z"
        }, {
          'alg': "md5",
          'salt': "Hr08T/NDTX1oSJfHk90c"
        }, {
          'alg': "md5",
          'salt': 'i'
        }]
      }
    },
    'extension': {
      'name': "扩展端",
      'client_id': "Ypcug64Odf8hwuKB",
      'package_name': '',
      'salts': {
        'default': [{
          'alg': "md5",
          'salt': 'q7'
        }, {
          'alg': "md5",
          'salt': "nrlBCFrnAOq+8a2iR0a"
        }, {
          'alg': "md5",
          'salt': 'yM'
        }, {
          'alg': "md5",
          'salt': "EZUpsmzmxJJfUId3sKh/ymbP71"
        }, {
          'alg': "md5",
          'salt': "smYiKZVU27IGA6TSZDQ0Yxh6bqGd85FxSb2y+Zd8"
        }, {
          'alg': "md5",
          'salt': "LJ+exEg8YOnbXcSvz4V"
        }, {
          'alg': "md5",
          'salt': "rTMBTsUDCY8ZNY0aPJyh6yXJODA0pumb"
        }, {
          'alg': "md5",
          'salt': "f1txyY7vIhV"
        }, {
          'alg': "md5",
          'salt': "zB/wIIhoDt3jh"
        }, {
          'alg': "md5",
          'salt': "giAZb"
        }, {
          'alg': "md5",
          'salt': "qDydUse4d3XiIKT0jGqjXMq4tR6BPPM9jUGTu+I"
        }, {
          'alg': "md5",
          'salt': "Yg9PJEV+27Y+i"
        }, {
          'alg': "md5",
          'salt': "JZkNO5s2XfrlneBOsR7uv"
        }, {
          'alg': "md5",
          'salt': "lF0O88rW"
        }]
      }
    }
  };
  let _0x59181d = document.createElement("div");
  _0x59181d.innerHTML = "<div style=\"display: none;\">\n        <hr style=\"margin: 0;\">\n            <div style=\"margin: 5px 0;\">\n                设备信息：\n                <b style=\"color: red;\" id=\"device_id\">None</b>\n                <b style=\"color: red;\" id=\"client_id\">None</b>\n                <b style=\"color: red;\" id=\"captcha_token\">None</b>\n                <b style=\"color: red;\" id=\"refresh_token\">None</b>\n                <b style=\"color: red;\" id=\"access_token\">None</b>\n                <b style=\"color: red;\" id=\"user_id\">None</b>\n                <b style=\"color: red;\" id=\"name\">None</b>\n                <b style=\"color: red;\" id=\"email\">None</b>\n                <b style=\"color: red;\" id=\"password\">None</b>\n            </div>\n        </div>";
  document.body.insertBefore(_0x59181d, document.body.firstElementChild);
  let _0x5169c4;
  let _0x1c5159 = '';
  if (localStorage.getItem("random_device_id")) {
    _0x5169c4 = localStorage.getItem("random_device_id");
  } else {
    _0x5169c4 = _0x5945bc();
    localStorage.setItem("random_device_id", _0x5169c4);
  }
  if (localStorage.getItem("pk_key")) {
    _0x1c5159 = localStorage.getItem("pk_key");
  }
  let _0x155ded;
  let _0x5cf8d2;
  let _0x3bb4a9;
  window.addEventListener("load", function () {
    _0x1638e2();
    _0x5315df();
    let _0x54159b = document.getElementById("input_str");
    _0x54159b.value = _0x1c5159;
    _0x155ded = document.getElementById("kite-platform");
    _0x5cf8d2 = document.getElementById("kite-version");
    if (!_0x155ded || !_0x5cf8d2) {
      console.warn("找不到 platform 或 version 下拉框");
      return;
    }
    const _0x450d6d = {};
    for (const _0x1c803d in _0x1d39e8) {
      _0x450d6d[_0x1c803d] = Object.keys(_0x1d39e8[_0x1c803d].salts);
    }
    _0x155ded.addEventListener("change", function () {
      const _0x5d1fa7 = _0x155ded.value;
      _0x5cf8d2.innerHTML = "<option value=\"\">请选择版本</option>";
      if (_0x5d1fa7 && _0x450d6d[_0x5d1fa7]) {
        _0x450d6d[_0x5d1fa7].forEach(_0x30fc22 => {
          const _0xcb3496 = document.createElement("option");
          _0xcb3496.value = _0x30fc22;
          _0xcb3496.innerText = _0x30fc22;
          _0x5cf8d2.appendChild(_0xcb3496);
        });
      }
      _0x5cf8d2.value = '';
    });
    _0x5cf8d2.addEventListener("change", _0x50931a);
    _0x115f91();
  });
  const _0x4a1c35 = {
    'x-device-id': _0x4cb12d => {
      _0x1fde32("device_id", _0x5169c4);
      return _0x5169c4;
    },
    'x-client-id': _0x579098 => {
      _0x1fde32("client_id", _0x579098);
    },
    'Authorization': _0x2c61e3 => {
      _0x1fde32("access_token", _0x2c61e3);
    },
    'x-captcha-token': _0x572463 => {
      _0x1fde32("captcha_token", _0x572463);
    },
    'x-device-sign': _0x59fcc4 => {
      return "wdi10." + _0x5169c4 + "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";
    }
  };
  let _0x3a54af = localStorage.hasOwnProperty("platform") ? localStorage.getItem("platform") : "android";
  let _0x241830 = localStorage.hasOwnProperty("version") ? localStorage.getItem("version") : "1.42.6";
  console.log(_0x3a54af, _0x241830);
  const _0x18dcc3 = _0x1d39e8[_0x3a54af];
  const _0x2f8ddc = window.fetch;
  document.body.addEventListener("click", function (_0x5e0ef5) {
    if (_0x5e0ef5.target.id === "account_btn") {
      _0x3898b6();
    }
  });
  window.fetch = async function (..._0x196cbe) {
    const _0x58f83a = _0x196cbe[0] instanceof Request ? _0x196cbe[0] : new Request(..._0x196cbe);
    console.log("Request object:", _0x58f83a.url);
    const _0x626798 = _0x58f83a.headers.get("Content-Type");
    let _0x1f5167;
    if (_0x626798 && _0x626798.includes("application/json")) {
      try {
        _0x1f5167 = await _0x58f83a.clone().json();
      } catch (_0xf03ad6) {
        _0x1f5167 = null;
      }
    }
    if (_0x58f83a.url.includes("area_accessible")) {
      return Promise.reject(new Error("Request blocked by script"));
    }
    if (_0x58f83a.url.includes("activation-code") && !(await _0x20eb62())) {
      return new Response(JSON.stringify({
        'error': "no_valid_user",
        'error_description': "脚本密钥无效或已过期，请在kiteyuan.info获取最新密钥。",
        'result': "REJECTED"
      }), {
        'headers': {
          'Content-Type': "application/json"
        },
        'status': 0x190
      });
    }
    if (_0x58f83a.url.includes("revoke")) {
      _0x5169c4 = _0x5945bc();
      localStorage.setItem("random_device_id", _0x5169c4);
      _0x109fa6();
    }
    if (_0x1f5167) {
      if (_0x58f83a.url.includes("signin") || _0x58f83a.url.includes("verify") || _0x58f83a.url.includes("verification") || _0x58f83a.url.includes("token")) {
        if (_0x1f5167.client_id) {
          _0x1f5167.client_id = _0x18dcc3.client_id;
        }
      } else {
        if (_0x58f83a.url.includes("/credit/v1/report")) {
          if (_0x1f5167.device_id) {
            _0x1f5167.device_id = _0x5169c4;
          }
          const _0x6781ef = _0x53fa76();
          console.log("RamdomToken:", _0x6781ef);
          if (_0x1f5167.rtc_token) {
            _0x1f5167.rtc_token = _0x6781ef;
          }
          if (_0x1f5167.sign) {
            let _0x84b4b7 = '' + _0x3bb4a9.prefix + _0x1f5167.captcha_token + _0x6781ef + _0x3bb4a9.suffix;
            console.log(_0x84b4b7);
            let _0x2b9c59 = _0x84b4b7;
            for (let _0x1de3b5 = 0; _0x1de3b5 < _0x3bb4a9.nums; _0x1de3b5++) {
              _0x2b9c59 = _0x2505ec(_0x2b9c59, _0x3bb4a9.method);
            }
            console.log("Sign:", _0x2b9c59);
            _0x1f5167.sign = _0x2b9c59;
          }
        } else {
          if (_0x58f83a.url.includes("signup")) {
            if (_0x1f5167.client_id) {
              _0x1f5167.client_id = _0x18dcc3.client_id;
            }
            if (_0x3a54af == "android") {
              _0x1f5167.client_secret = _0x18dcc3.client_secret;
            }
          } else {
            if (_0x58f83a.url.includes("/v1/shield/captcha/init")) {
              if (_0x1f5167.device_id) {
                _0x1f5167.device_id = _0x5169c4;
              }
              if (_0x1f5167.client_id) {
                _0x1f5167.client_id = _0x18dcc3.client_id;
              }
              if (_0x1f5167.meta) {
                let _0x21b0b4;
                let _0x12d1fa;
                if (_0x1f5167.meta.package_name == "mypikpak.com") {
                  _0x1f5167.meta.package_name = _0x18dcc3.package_name;
                  _0x1f5167.meta.client_version = _0x241830;
                  console.log("version:", _0x241830);
                  _0x21b0b4 = _0x18dcc3.salts[_0x241830];
                  _0x12d1fa = true;
                } else if (_0x1f5167.meta.package_name == "drive.mypikpak.com") {
                  _0x1f5167.client_id = "YUMx5nI8ZU8Ap8pm";
                  _0x21b0b4 = _0x1d39e8.web_init.salts["2.0.0"];
                  _0x12d1fa = true;
                }
                if (_0x12d1fa == true) {
                  let _0x4e74b1 = _0x1f5167.client_id + _0x1f5167.meta.client_version + _0x1f5167.meta.package_name + _0x5169c4 + _0x1f5167.meta.timestamp;
                  _0x1f5167.meta.captcha_sign = '1.' + _0x4ad286(_0x4e74b1, _0x21b0b4);
                }
              }
            }
          }
        }
      }
    }
    const _0x162f22 = new Headers(_0x58f83a.headers);
    Object.keys(_0x4a1c35).forEach(_0x3d1b40 => {
      const _0x356820 = _0x58f83a.headers.get(_0x3d1b40);
      if (_0x356820) {
        const _0x43dd8a = _0x4a1c35[_0x3d1b40](_0x356820);
        if (_0x43dd8a) {
          _0x162f22.set(_0x3d1b40, _0x43dd8a);
        }
      }
    });
    const _0x53da38 = new Request(_0x58f83a.url, {
      'method': _0x58f83a.method,
      'headers': _0x162f22,
      'body': _0x626798 && _0x626798.includes("application/json") && _0x1f5167 ? JSON.stringify(_0x1f5167) : _0x58f83a.body,
      'credentials': _0x58f83a.credentials,
      'mode': _0x58f83a.mode
    });
    const _0xa2a3d6 = await _0x2f8ddc.call(this, _0x53da38);
    const _0x5bf3c4 = _0xa2a3d6.clone();
    const _0x340a36 = _0xa2a3d6.clone();
    if (_0x58f83a.url.includes("executor")) {
      try {
        const _0x580248 = await _0x5bf3c4.text();
        if (_0x580248.trim().length > 0) {
          console.log(_0x580248);
          _0x3bb4a9 = _0x5733be(_0x580248);
        } else {
          console.warn("Empty JS response, skipping extraction.");
        }
      } catch (_0x42e463) {
        console.error("Failed to read executor response:", _0x42e463);
      }
    }
    _0x340a36.text().then(_0x40ac0d => {
      try {
        const _0x3a1dd5 = JSON.parse(_0x40ac0d);
        if (_0x3a1dd5?.["sub"]) {
          _0x1fde32("user_id", _0x3a1dd5.sub);
        }
        if (_0x3a1dd5?.["name"]) {
          _0x1fde32("name", _0x3a1dd5.name);
        }
        if (_0x3a1dd5?.["email"]) {
          _0x1fde32("email", _0x3a1dd5.email);
        }
        if (_0x3a1dd5?.["password"]) {
          _0x1fde32("password", _0x3a1dd5.password);
        }
        if (_0x3a1dd5?.["refresh_token"]) {
          _0x1fde32("refresh_token", _0x3a1dd5.refresh_token);
          localStorage.setItem("kite_refresh_token", _0x3a1dd5.refresh_token);
        }
      } catch (_0x25d241) {
        console.error("Failed to parse JSON:", _0x25d241, "Response text:", _0x40ac0d);
      }
    });
    return _0xa2a3d6;
  };
})();
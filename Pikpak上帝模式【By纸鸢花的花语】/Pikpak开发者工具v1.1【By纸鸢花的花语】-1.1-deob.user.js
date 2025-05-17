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

  function setHiddenFieldValue(elementId, value) {
    let element = document.getElementById(elementId);
    if (element) {
      element.setAttribute("value", value);
      element.innerHTML = "Yes";
    }
  }
  function generateCompactUUID() {
    let uuid = generateUUID().replace(/-/g, '');
    return uuid;
  }
  function generateUUID() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (char) {
      let randomNumber = Math.random() * 16 | 0;
      let value = char === 'x' ? randomNumber : randomNumber & 3 | 8;
      return value.toString(16);
    });
  }
  function calculateIterativeMD5(initialString, saltsArray) {
    let currentHash = initialString;
    for (let i = 0; i < saltsArray.length; i++) {
      currentHash = CryptoJS.MD5(currentHash + saltsArray[i].salt).toString();
    }
    return currentHash;
  }
  function getCharFromTimestamp(timestamp) {
    let remainder = timestamp % 26;
    let char = String.fromCharCode(65 + remainder);
    return char;
  }
  function validateScriptKey() {
    let now = Date.now();
    let dateAtHourStart = new Date(now);
    dateAtHourStart.setMinutes(0);
    dateAtHourStart.setSeconds(0);
    dateAtHourStart.setMilliseconds(0);
    let timestampAtHourStart = dateAtHourStart.getTime();
    let generatedKeyPart = getCharFromTimestamp(timestampAtHourStart) + calculateIterativeMD5(String(timestampAtHourStart), platformConfigs.extension.salts["default"]).slice(0, 9);
    let scriptKeyInputElement = document.getElementById("input_str");
    let userProvidedKey = scriptKeyInputElement.value;
    localStorage.setItem("pk_key", userProvidedKey);
    //return calculateIterativeMD5(generatedKeyPart, platformConfigs.extension.salts["default"]) == calculateIterativeMD5(userProvidedKey, platformConfigs.extension.salts["default"]);
    return true;
  }
  function clearAllCookies() {
    var cookies = document.cookie.split(';');
    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i];
      var eqPos = cookie.indexOf('=');
      var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
  }
  function savePlatformAndVersionToLocalStorage() {
    localStorage.setItem("platform", platformSelectElement.value);
    localStorage.setItem("version", versionSelectElement.value);
  }
  function loadPlatformAndVersionFromLocalStorage() {
    if (currentPlatform && currentVersion) {
      if (currentPlatform) {
        platformSelectElement.value = currentPlatform;
        platformSelectElement.dispatchEvent(new Event("change"));
      }
      if (currentVersion) {
        setTimeout(() => {
          versionSelectElement.value = currentVersion;
        }, 50);
      }
    }
  }
  function injectStyles() {
    const styleElement = document.createElement("style");
    styleElement.setAttribute("type", "text/css");
    styleElement.innerHTML = "\n :root {\n        --primary-color: #4285f4;\n        --primary-hover: #3367d6;\n        --text-color: #333;\n        --light-gray: #f5f5f5;\n        --border-color: #e0e0e0;\n        --shadow: 0 4px 12px rgba(0, 0, 0, 0.1);\n        --border-radius: 8px;\n        --spacing: 12px;\n    }\n\n    .popover {\n        position: relative;\n        display: inline-block;\n        font-family: 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;\n    }\n\n    /* 按钮样式 */\n    .kite-btn {\n        padding: 10px 20px;\n        border: none;\n        border-radius: var(--border-radius);\n        background-color: var(--light-gray);\n        color: var(--text-color);\n        font-weight: 500;\n        cursor: pointer;\n        transition: all 0.2s ease;\n        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);\n    }\n\n    .kite-btn:hover {\n        background-color: #e0e0e0;\n        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);\n    }\n\n    .kite-btn.primary {\n        background-color: var(--primary-color);\n        color: white;\n    }\n\n    .kite-btn.primary:hover {\n        background-color: var(--primary-hover);\n    }\n\n    /* 弹出框内容 */\n    .popover-content {\n        position: absolute;\n        width: 320px;\n        background: white;\n        border-radius: var(--border-radius);\n        box-shadow: var(--shadow);\n        padding: var(--spacing);\n        opacity: 0;\n        visibility: hidden;\n        transition: all 0.2s ease;\n        z-index: 1000;\n        margin-top: 8px;\n    }\n\n    .popover:hover .popover-content {\n        opacity: 1;\n        visibility: visible;\n    }\n\n    /* 弹出框箭头 */\n    .popover-content::before {\n        content: \"\";\n        position: absolute;\n        top: -6px;\n        left: 20px;\n        width: 12px;\n        height: 12px;\n        background: white;\n        transform: rotate(45deg);\n        box-shadow: -2px -2px 4px rgba(0, 0, 0, 0.05);\n    }\n\n    /* 头部样式 */\n    .popover-header {\n        font-size: 16px;\n        font-weight: 600;\n        color: var(--text-color);\n        margin-bottom: var(--spacing);\n        padding-bottom: 8px;\n        border-bottom: 1px solid var(--border-color);\n    }\n\n    .author {\n        font-size: 12px;\n        color: #666;\n        font-weight: normal;\n        margin-left: 8px;\n    }\n\n    /* 输入框样式 */\n    .kite-input {\n        width: 100%;\n        padding: 10px 12px;\n        border: 1px solid var(--border-color);\n        border-radius: var(--border-radius);\n        font-size: 14px;\n        transition: border 0.2s ease;\n        margin-bottom: var(--spacing);\n    }\n\n    .kite-input:focus {\n        outline: none;\n        border-color: var(--primary-color);\n        box-shadow: 0 0 0 2px rgba(66, 133, 244, 0.2);\n    }\n\n    /* 下拉选择框 */\n    .kite-select {\n        flex: 1;\n        padding: 10px 12px;\n        border: 1px solid var(--border-color);\n        border-radius: var(--border-radius);\n        font-size: 14px;\n        background-color: white;\n        cursor: pointer;\n        appearance: none;\n        background-image: url(\"data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e\");\n        background-repeat: no-repeat;\n        background-position: right 8px center;\n        background-size: 16px;\n    }\n\n    .kite-select:focus {\n        outline: none;\n        border-color: var(--primary-color);\n    }\n\n    /* 弹性布局 */\n    .kite-flex {\n        display: flex;\n        width: 100%;\n        gap: var(--spacing);\n        margin-bottom: var(--spacing);\n    }\n\n    .kite-spacer {\n        flex: 0.1;\n    }\n\n    /* 提示信息 */\n    .alert-message {\n        font-size: 13px;\n        color: #666;\n        line-height: 1.5;\n        padding: 10px;\n        white-space: wrap;\n        background-color: #f8f9fa;\n        border-radius: var(--border-radius);\n    }\n\n    .alert-link {\n        color: var(--primary-color);\n        text-decoration: none;\n    }\n\n    .alert-link:hover {\n        text-decoration: underline;\n    }\n        .folder-navigator{\n            overflow: unset;\n        }\n            .no-btn{\n            border: none;\n    background: none;\n            }\n";
    let headElement = document.querySelector("head");
    headElement.appendChild(styleElement);
  }
  function createToolUIPopover() {
    let listItem = document.createElement('li');
    listItem.id = "qBox";
    listItem.innerHTML = "\n<div class=\"popover\">\n    <button class=\"no-btn\">PikPak工具</button>\n\n    <div class=\"popover-content\">\n        <div class=\"popover-header\">PikPak开发者工具-v1.1.0 <span class=\"author\">B站：纸鸢花的花语</span></div>\n        <div>\n            <input class=\"kite-input\" type=\"text\" name=\"\" id=\"input_str\" placeholder=\"请输入脚本密钥...\">\n        </div>\n        <div class=\"kite-flex\">\n            <select id=\"kite-platform\" class=\"kite-select\">\n                <option value=\"android\">安卓端</option>\n                <option value=\"web\">网页端</option>\n            </select>\n            <div class=\"kite-spacer\"></div>\n            <select id=\"kite-version\" class=\"kite-select\">\n                <option value=\"\">请选择版本</option>\n            </select>\n        </div>\n        <div class=\"kite-flex\">\n            <button id=\"account_btn\" class=\"kite-btn primary\">\n                账号令牌信息\n            </button>\n        </div>\n        <div id=\"alert_box\" class=\"alert-message\">\n            脚本仅供交流学习，为防止倒卖，脚本密钥可在\n            <a href=\"https://kiteyuan.info/\" class=\"alert-link\">kiteyuan.info</a>直接获取，查看说明文档：<a href=\"https://blog.kiteyuan.info/\" class=\"alert-link\">纸鸢博客</a>\n        </div>\n    </div>\n</div>\n";
    let targetBreadcrumbContainer = document.querySelector("#app > div.layout > div.main > div > div.all.file-explorer > div.grid.file-explorer-header > div > div:nth-child(1) > nav > ol.real");
    if (targetBreadcrumbContainer) {
      targetBreadcrumbContainer.insertBefore(listItem, targetBreadcrumbContainer.firstChild);
      if (localStorage.getItem("pk_key")) {
        let scriptKeyInputElement = document.getElementById("input_str");
        scriptKeyInputElement.value = localStorage.getItem("pk_key");
      }
    } else {
      console.log('尝试');
      setTimeout(createToolUIPopover, 1000);
    }
  }
  function copyToClipboard(textToCopy) {
    navigator.clipboard.writeText(textToCopy).then(() => {
      console.log("复制成功");
    })["catch"](e => {
      console.error("复制失败:", e);
    });
  }
  function copyAccountInfoToClipboard() {
    const deviceId = document.getElementById("device_id").getAttribute("value");
    const clientId = document.getElementById("client_id").getAttribute("value");
    const captchaToken = document.getElementById("captcha_token").getAttribute("value");
    const accessToken = document.getElementById("access_token").getAttribute("value");
    const userId = document.getElementById("user_id").getAttribute("value");
    const refreshToken = localStorage.getItem("kite_refresh_token");
    const email = document.getElementById("email").getAttribute("value");
    const name = document.getElementById("name").getAttribute("value");
    const password = document.getElementById("password").getAttribute("value");
    const platform = localStorage.hasOwnProperty("platform") ? localStorage.getItem("platform") : "android";
    const version = localStorage.hasOwnProperty("version") ? localStorage.getItem("version") : "1.42.6";
    const accountInfo = {
      'device_id': deviceId,
      'client_id': clientId,
      'captcha_token': captchaToken,
      'access_token': accessToken,
      'user_id': userId,
      'refresh_token': refreshToken,
      'email': email,
      'name': name,
      'password': password,
      'platform': platform,
      'version': version,
      'timestamp': Date.now().toString()
    };
    copyToClipboard(JSON.stringify(accountInfo));
    alert("账号令牌已复制至剪切板");
  }
  function hashAndBase64Encode(inputString, hashMethod) {
    switch (hashMethod.toLowerCase()) {
      case "sha256":
        return btoa(CryptoJS.SHA256(inputString).toString(CryptoJS.enc.Latin1));
      case "md5":
        return btoa(CryptoJS.MD5(inputString).toString(CryptoJS.enc.Latin1));
      case "sha1":
        return btoa(CryptoJS.SHA1(inputString).toString(CryptoJS.enc.Latin1));
      default:
        throw new Error("Unsupported hashing method: " + hashMethod);
    }
  }
  function calculateStringDifference(string1, string2) {
    let differenceCount = 0;
    for (let i = 0; i < Math.min(string1.length, string2.length); i++) {
      if (string1[i] !== string2[i]) {
        differenceCount++;
      }
    }
    return differenceCount;
  }
  function extractHashingParamsFromScript(scriptText) {
    const methodMatch = scriptText.match(/calcFn\s*=\s*injectedDeps\[_0x[a-f0-9]+\('([^']+)'\)\]/);
    const hashingMethod = methodMatch ? methodMatch[1] : (scriptText.match(/'(sha1|md5|sha256)'/) || [])[1];
    const iterationMatch = (scriptText.match(/calcFn\(hashResult\)/g) || []).length;
    const stringLiterals = (scriptText.match(/['"]([0-9a-f-]+(?:hello_world)?)['"]/g) || []).map(s => s.replace(/['"]/g, ''));
    const prefixCandidate = stringLiterals.find(s => s.includes("hello_world")) || '';
    const actualPrefix = prefixCandidate.replace("hello_world", '');
    const suffixCandidate = stringLiterals.find(s => s !== prefixCandidate && s.length === actualPrefix.length && calculateStringDifference(s, actualPrefix) < 4) || '';
    let requestId = (scriptText.match(/\b([a-f0-9\-]{36})\b/g) || []).filter(s => s !== prefixCandidate && s !== suffixCandidate);
    return {
      'method': hashingMethod,
      'nums': iterationMatch,
      'prefix': prefixCandidate,
      'suffix': suffixCandidate,
      'request_id': requestId.length ? requestId[0] : ''
    };
  }
  function generateRandomHexToken() {
    return Array.from({
      'length': 0x8
    }, () => Math.floor(Math.random() * 65536).toString(16)).join(':');
  }
  const platformConfigs = {
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
  let hiddenDataContainer = document.createElement("div");
  hiddenDataContainer.innerHTML = "<div style=\"display: none;\">\n        <hr style=\"margin: 0;\">\n            <div style=\"margin: 5px 0;\">\n                设备信息：\n                <b style=\"color: red;\" id=\"device_id\">None</b>\n                <b style=\"color: red;\" id=\"client_id\">None</b>\n                <b style=\"color: red;\" id=\"captcha_token\">None</b>\n                <b style=\"color: red;\" id=\"refresh_token\">None</b>\n                <b style=\"color: red;\" id=\"access_token\">None</b>\n                <b style=\"color: red;\" id=\"user_id\">None</b>\n                <b style=\"color: red;\" id=\"name\">None</b>\n                <b style=\"color: red;\" id=\"email\">None</b>\n                <b style=\"color: red;\" id=\"password\">None</b>\n            </div>\n        </div>";
  document.body.insertBefore(hiddenDataContainer, document.body.firstElementChild);
  let randomDeviceId;
  let scriptKey = '';
  if (localStorage.getItem("random_device_id")) {
    randomDeviceId = localStorage.getItem("random_device_id");
  } else {
    randomDeviceId = generateCompactUUID();
    localStorage.setItem("random_device_id", randomDeviceId);
  }
  if (localStorage.getItem("pk_key")) {
    scriptKey = localStorage.getItem("pk_key");
  }
  let platformSelectElement;
  let versionSelectElement;
  let hashingParams;
  window.addEventListener("load", function () {
    injectStyles();
    createToolUIPopover();
    let scriptKeyInputElement = document.getElementById("input_str");
    scriptKeyInputElement.value = scriptKey;
    platformSelectElement = document.getElementById("kite-platform");
    versionSelectElement = document.getElementById("kite-version");
    if (!platformSelectElement || !versionSelectElement) {
      console.warn("找不到 platform 或 version 下拉框");
      return;
    }
    const platformVersionsMap = {};
    for (const platformKey in platformConfigs) {
      platformVersionsMap[platformKey] = Object.keys(platformConfigs[platformKey].salts);
    }
    platformSelectElement.addEventListener("change", function () {
      const selectedPlatform = platformSelectElement.value;
      versionSelectElement.innerHTML = "<option value=\"\">请选择版本</option>";
      if (selectedPlatform && platformVersionsMap[selectedPlatform]) {
        platformVersionsMap[selectedPlatform].forEach(version => {
          const optionElement = document.createElement("option");
          optionElement.value = version;
          optionElement.innerText = version;
          versionSelectElement.appendChild(optionElement);
        });
      }
      versionSelectElement.value = '';
    });
    versionSelectElement.addEventListener("change", savePlatformAndVersionToLocalStorage);
    loadPlatformAndVersionFromLocalStorage();
  });
  const requestHeaderModifiers = {
    'x-device-id': originalValue => {
      setHiddenFieldValue("device_id", randomDeviceId);
      return randomDeviceId;
    },
    'x-client-id': originalValue => {
      setHiddenFieldValue("client_id", originalValue);
    },
    'Authorization': originalValue => {
      setHiddenFieldValue("access_token", originalValue);
    },
    'x-captcha-token': originalValue => {
      setHiddenFieldValue("captcha_token", originalValue);
    },
    'x-device-sign': originalValue => {
      return "wdi10." + randomDeviceId + "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";
    }
  };
  let currentPlatform = localStorage.hasOwnProperty("platform") ? localStorage.getItem("platform") : "android";
  let currentVersion = localStorage.hasOwnProperty("version") ? localStorage.getItem("version") : "1.42.6";
  console.log(currentPlatform, currentVersion);
  const currentPlatformConfig = platformConfigs[currentPlatform];
  const originalFetch = window.fetch;
  document.body.addEventListener("click", function (event) {
    if (event.target.id === "account_btn") {
      copyAccountInfoToClipboard();
    }
  });
  window.fetch = async function (...fetchArgs) {
    const request = fetchArgs[0] instanceof Request ? fetchArgs[0] : new Request(...fetchArgs);
    console.log("Request object:", request.url);
    const contentType = request.headers.get("Content-Type");
    let requestBodyJson;
    if (contentType && contentType.includes("application/json")) {
      try {
        requestBodyJson = await request.clone().json();
      } catch (e) {
        requestBodyJson = null;
      }
    }
    if (request.url.includes("area_accessible")) {
      return Promise.reject(new Error("Request blocked by script"));
    }
    if (request.url.includes("activation-code") && !(await validateScriptKey())) {
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
    if (request.url.includes("revoke")) {
      randomDeviceId = generateCompactUUID();
      localStorage.setItem("random_device_id", randomDeviceId);
      clearAllCookies();
    }
    if (requestBodyJson) {
      if (request.url.includes("signin") || request.url.includes("verify") || request.url.includes("verification") || request.url.includes("token")) {
        if (requestBodyJson.client_id) {
          requestBodyJson.client_id = currentPlatformConfig.client_id;
        }
      } else {
        if (request.url.includes("/credit/v1/report")) {
          if (requestBodyJson.device_id) {
            requestBodyJson.device_id = randomDeviceId;
          }
          const randomRtcToken = generateRandomHexToken();
          console.log("RamdomToken:", randomRtcToken);
          if (requestBodyJson.rtc_token) {
            requestBodyJson.rtc_token = randomRtcToken;
          }
          if (requestBodyJson.sign) {
            let stringToSign = '' + hashingParams.prefix + requestBodyJson.captcha_token + randomRtcToken + hashingParams.suffix;
            console.log(stringToSign);
            let calculatedSign = stringToSign;
            for (let i = 0; i < hashingParams.nums; i++) {
              calculatedSign = hashAndBase64Encode(calculatedSign, hashingParams.method);
            }
            console.log("Sign:", calculatedSign);
            requestBodyJson.sign = calculatedSign;
          }
        } else {
          if (request.url.includes("signup")) {
            if (requestBodyJson.client_id) {
              requestBodyJson.client_id = currentPlatformConfig.client_id;
            }
            if (currentPlatform == "android") {
              requestBodyJson.client_secret = currentPlatformConfig.client_secret;
            }
          } else {
            if (request.url.includes("/v1/shield/captcha/init")) {
              if (requestBodyJson.device_id) {
                requestBodyJson.device_id = randomDeviceId;
              }
              if (requestBodyJson.client_id) {
                requestBodyJson.client_id = currentPlatformConfig.client_id;
              }
              if (requestBodyJson.meta) {
                let saltsForCaptchaSign;
                let shouldUseCaptchaSignLogic;
                if (requestBodyJson.meta.package_name == "mypikpak.com") {
                  requestBodyJson.meta.package_name = currentPlatformConfig.package_name;
                  requestBodyJson.meta.client_version = currentVersion;
                  console.log("version:", currentVersion);
                  saltsForCaptchaSign = currentPlatformConfig.salts[currentVersion];
                  shouldUseCaptchaSignLogic = true;
                } else if (requestBodyJson.meta.package_name == "drive.mypikpak.com") {
                  requestBodyJson.client_id = "YUMx5nI8ZU8Ap8pm";
                  saltsForCaptchaSign = platformConfigs.web_init.salts["2.0.0"];
                  shouldUseCaptchaSignLogic = true;
                }
                if (shouldUseCaptchaSignLogic == true) {
                  let captchaSignInput = requestBodyJson.client_id + requestBodyJson.meta.client_version + requestBodyJson.meta.package_name + randomDeviceId + requestBodyJson.meta.timestamp;
                  requestBodyJson.meta.captcha_sign = '1.' + calculateIterativeMD5(captchaSignInput, saltsForCaptchaSign);
                }
              }
            }
          }
        }
      }
    }
    const modifiedHeaders = new Headers(request.headers);
    Object.keys(requestHeaderModifiers).forEach(headerName => {
      const originalHeaderValue = request.headers.get(headerName);
      if (originalHeaderValue) {
        const modifiedValue = requestHeaderModifiers[headerName](originalHeaderValue);
        if (modifiedValue) {
          modifiedHeaders.set(headerName, modifiedValue);
        }
      }
    });
    const modifiedRequest = new Request(request.url, {
      'method': request.method,
      'headers': modifiedHeaders,
      'body': contentType && contentType.includes("application/json") && requestBodyJson ? JSON.stringify(requestBodyJson) : request.body,
      'credentials': request.credentials,
      'mode': request.mode
    });
    const response = await originalFetch.call(this, modifiedRequest);
    const responseCloneForExecutor = response.clone();
    const responseCloneForJson = response.clone();
    if (request.url.includes("executor")) {
      try {
        const executorScriptText = await responseCloneForExecutor.text();
        if (executorScriptText.trim().length > 0) {
          console.log(executorScriptText);
          hashingParams = extractHashingParamsFromScript(executorScriptText);
        } else {
          console.warn("Empty JS response, skipping extraction.");
        }
      } catch (e) {
        console.error("Failed to read executor response:", e);
      }
    }
    responseCloneForJson.text().then(responseTextForJson => {
      try {
        const responseJson = JSON.parse(responseTextForJson);
        if (responseJson?.["sub"]) {
          setHiddenFieldValue("user_id", responseJson.sub);
        }
        if (responseJson?.["name"]) {
          setHiddenFieldValue("name", responseJson.name);
        }
        if (responseJson?.["email"]) {
          setHiddenFieldValue("email", responseJson.email);
        }
        if (responseJson?.["password"]) {
          setHiddenFieldValue("password", responseJson.password);
        }
        if (responseJson?.["refresh_token"]) {
          setHiddenFieldValue("refresh_token", responseJson.refresh_token);
          localStorage.setItem("kite_refresh_token", responseJson.refresh_token);
        }
      } catch (e) {
        console.error("Failed to parse JSON:", e, "Response text:", responseTextForJson);
      }
    });
    return response;
  };
})();
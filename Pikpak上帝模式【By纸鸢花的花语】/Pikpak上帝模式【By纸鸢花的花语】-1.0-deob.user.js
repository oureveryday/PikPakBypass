// ==UserScript==
// @name         Pikpak上帝模式【By纸鸢花的花语】
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description
// @author       纸鸢花的花语,vvbbnn00
// @icon         https://pic.imgdb.cn/item/66669cd95e6d1bfa05eb991b.jpg
// @grant        none
// @match        *://mypikpak.com/*
// @match        *://pikpak.me/*
// @match        *://mypikpak.net/*
// @require      https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/crypto-js.min.js

// ==/UserScript==

(function () {
  "use strict";

  let dataBox = document.createElement("div");
  dataBox.innerHTML =
    '<div style="display: none;">\n        <hr style="margin: 0;">\n            <div style="margin: 5px 0;">\n                设备信息：\n                <b style="color: red;" id="device_id">None</b>\n                <b style="color: red;" id="client_id">None</b>\n                <b style="color: red;" id="captcha_token">None</b>\n                <b style="color: red;" id="access_token">None</b>\n                <b style="color: red;" id="user_id">None</b>\n            </div>\n\n        </div>';
  document.body.insertBefore(dataBox, document.body.firstElementChild);
  function update_post_data(elementId, value) {
    let element = document.getElementById(elementId);
    if (element) {
      element.setAttribute("value", value);
      element.innerHTML = "Yes";
    }
  }
  const originalFetch = window.fetch;
  function generateDeviceId() {
    let deviceId = uuidv4().replace(/-/g, "");
    return deviceId;
  }
  function uuidv4() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (char) {
        let random = (Math.random() * 16) | 0;
        let value = char === "x" ? random : (random & 3) | 8;
        return value.toString(16);
      }
    );
  }
  let RandomDeviceId;
  let inputKey = "";
  if (localStorage.getItem("random_device_id")) {
    RandomDeviceId = localStorage.getItem("random_device_id");
  } else {
    RandomDeviceId = generateDeviceId();
    localStorage.setItem("random_device_id", RandomDeviceId);
  }
  if (localStorage.getItem("pk_key")) {
    inputKey = localStorage.getItem("pk_key");
  }
  const keyHandlers = {
    "x-device-id": () => {
      update_post_data("device_id", RandomDeviceId);
      return RandomDeviceId;
    },
    "x-client-id": (clientId) => {
      update_post_data("client_id", clientId);
    },
    Authorization: (accessToken) => {
      update_post_data("access_token", accessToken);
    },
    "x-captcha-token": (captchaToken) => {
      update_post_data("captcha_token", captchaToken);
    },
    "x-device-sign": () => {
      return "wdi10." + RandomDeviceId + "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";
    },
  };
  function getSign(data, index = 0) {
    let salt1 = [
      {
        alg: "md5",
        salt: "frupTFdxwcJ5mcL3R8",
      },
      {
        alg: "md5",
        salt: "jB496fSFfbWLhWyqV",
      },
      {
        alg: "md5",
        salt: "xYLtzn8LT5h3KbAalCjc/Wf",
      },
      {
        alg: "md5",
        salt: "PSHSbm1SlxbvkwNk4mZrJhBZ1vsHCtEdm3tsRiy1IPUnqi1FNB5a2F",
      },
      {
        alg: "md5",
        salt: "SX/WvPCRzgkLIp99gDnLaCs0jGn2+urx7vz/",
      },
      {
        alg: "md5",
        salt: "OGdm+dgLk5EpK4O1nDB+Z4l",
      },
      {
        alg: "md5",
        salt: "nwtOQpz2xFLIE3EmrDwMKe/Vlw2ubhRcnS2R23bwx9wMh+C3Sg",
      },
      {
        alg: "md5",
        salt: "FI/9X9jbnTLa61RHprndT0GkVs18Chd",
      },
    ];
    let salt2 = [
      {
        alg: "md5",
        salt: "q7",
      },
      {
        alg: "md5",
        salt: "nrlBCFrnAOq+8a2iR0a",
      },
      {
        alg: "md5",
        salt: "yM",
      },
      {
        alg: "md5",
        salt: "EZUpsmzmxJJfUId3sKh/ymbP71",
      },
      {
        alg: "md5",
        salt: "smYiKZVU27IGA6TSZDQ0Yxh6bqGd85FxSb2y+Zd8",
      },
      {
        alg: "md5",
        salt: "LJ+exEg8YOnbXcSvz4V",
      },
      {
        alg: "md5",
        salt: "rTMBTsUDCY8ZNY0aPJyh6yXJODA0pumb",
      },
      {
        alg: "md5",
        salt: "f1txyY7vIhV",
      },
      {
        alg: "md5",
        salt: "zB/wIIhoDt3jh",
      },
      {
        alg: "md5",
        salt: "giAZb",
      },
      {
        alg: "md5",
        salt: "qDydUse4d3XiIKT0jGqjXMq4tR6BPPM9jUGTu+I",
      },
      {
        alg: "md5",
        salt: "Yg9PJEV+27Y+i",
      },
      {
        alg: "md5",
        salt: "JZkNO5s2XfrlneBOsR7uv",
      },
      {
        alg: "md5",
        salt: "lF0O88rW",
      },
    ];
    let salt3 = [
      {
        alg: "md5",
        salt: "fyZ4+p77W1U4zcWBUwefAIFhFxvADWtT1wzolCxhg9q7etmGUjXr",
      },
      {
        alg: "md5",
        salt: "uSUX02HYJ1IkyLdhINEFcCf7l2",
      },
      {
        alg: "md5",
        salt: "iWt97bqD/qvjIaPXB2Ja5rsBWtQtBZZmaHH2rMR41",
      },
      {
        alg: "md5",
        salt: "3binT1s/5a1pu3fGsN",
      },
      {
        alg: "md5",
        salt: "8YCCU+AIr7pg+yd7CkQEY16lDMwi8Rh4WNp5",
      },
      {
        alg: "md5",
        salt: "DYS3StqnAEKdGddRP8CJrxUSFh",
      },
      {
        alg: "md5",
        salt: "crquW+4",
      },
      {
        alg: "md5",
        salt: "ryKqvW9B9hly+JAymXCIfag5Z",
      },
      {
        alg: "md5",
        salt: "Hr08T/NDTX1oSJfHk90c",
      },
      {
        alg: "md5",
        salt: "i",
      },
    ];
    let chosenSalts;
    if (index == 0) {
      chosenSalts = salt1;
    } else {
      if (index == 1) {
        chosenSalts = salt2;
      } else if (index == 2) {
        chosenSalts = salt3;
      }
    }
    let hash = data;
    for (let i = 0; i < chosenSalts.length; i++) {
      hash = CryptoJS.MD5(hash + chosenSalts[i].salt).toString();
    }
    return hash;
  }
  function generateUppercaseLetter(number) {
    let charCode = number % 26;
    let letter = String.fromCharCode(65 + charCode);
    return letter;
  }
  function check_sign() {
    let now = Date.now();
    let date = new Date(now);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);
    let timestamp = date.getTime();
    let signedString =
      generateUppercaseLetter(timestamp) +
      getSign(String(timestamp), 1).slice(0, 9);
    let inputElement = document.getElementById("input_str");
    let inputValue = inputElement.value;
    localStorage.setItem("pk_key", inputValue);
    //return getSign(signedString, 1) == getSign(inputValue, 1);
    //crack
    return true;
  }
  function deleteAllCookies() {
    var cookies = document.cookie.split(";");
    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i];
      var eqPos = cookie.indexOf("=");
      var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
  }
  window.fetch = async function (...args) {
    const request = args[0] instanceof Request ? args[0] : new Request(...args);
    const contentType = request.headers.get("Content-Type");
    let requestBody;
    if (contentType && contentType.includes("application/json")) {
      try {
        requestBody = await request.clone().json();
      } catch (error) {}
    }
    if (request.url.indexOf("area_accessible") > -1) {
      return new Promise(() => {
        throw new Error();
      });
    } else {
      if (request.url.indexOf("activation-code") > -1) {
        if (!check_sign()) {
          const response = {
            code: "",
            details: [
              {
                "@type": "error_rich_text",
                error_rich_text: "",
              },
            ],
            error: "no_valid_user",
            error_description: "验证密钥无效或已过期，请在下方获取最新密钥。",
            result: "REJECTED",
          };
          return new Response(JSON.stringify(response), {
            headers: {
              "Content-Type": "application/json",
            },
            status: 0x190,
          });
        }
      } else {
        if (request.url.indexOf("revoke") > -1) {
          RandomDeviceId = generateDeviceId();
          localStorage.setItem("random_device_id", RandomDeviceId);
          deleteAllCookies();
        } else {
          if (
            request.url.indexOf("signin") > -1 ||
            request.url.indexOf("verify") > -1 ||
            request.url.indexOf("verification") > -1 ||
            request.url.indexOf("token") > -1
          ) {
            if (requestBody.client_id) {
              requestBody.client_id = "YNxT9w7GMdWvEOKa";
            }
          } else {
            if (request.url.indexOf("signup") > -1) {
              if (requestBody.client_id) {
                requestBody.client_id = "YNxT9w7GMdWvEOKa";
                requestBody.client_secret = "dbw2OtmVEeuUvIptb1Coyg";
              }
            } else {
              if (request.url.indexOf("init") > -1) {
                if (requestBody.device_id) {
                  requestBody.device_id = RandomDeviceId;
                }
                if (requestBody.client_id) {
                  requestBody.client_id = "YNxT9w7GMdWvEOKa";
                }
                if (requestBody.meta) {
                  let indexc;
                  let setCaptchaSign = 0;
                  if (requestBody.meta.package_name == "mypikpak.com") {
                    requestBody.meta.package_name = "com.pikcloud.pikpak";
                    requestBody.meta.client_version = "1.42.6";
                    indexc = 0;
                    setCaptchaSign = 1;
                  } else if (
                    requestBody.meta.package_name == "drive.mypikpak.com"
                  ) {
                    requestBody.client_id = "YUMx5nI8ZU8Ap8pm";
                    indexc = 2;
                    setCaptchaSign = 1;
                  }
                  let captchaString =
                    requestBody.client_id +
                    requestBody.meta.client_version +
                    requestBody.meta.package_name +
                    RandomDeviceId +
                    requestBody.meta.timestamp;
                  if (setCaptchaSign) {
                    requestBody.meta.captcha_sign =
                      "1." + getSign(captchaString, indexc);
                  }
                }
              }
            }
          }
        }
      }
    }
    const newHeaders = new Headers(request.headers);
    Object.keys(keyHandlers).forEach((headerKey) => {
      const value = request.headers.get(headerKey);
      if (value) {
        const handledValue = keyHandlers[headerKey](value);
        if (handledValue) {
          newHeaders.set(headerKey, handledValue);
        }
      }
    });
    const newRequest = new Request(request, {
      method: request.method,
      headers: newHeaders,
      body: contentType.includes("application/json")
        ? JSON.stringify(requestBody)
        : request.body,
    });
    const response = await originalFetch.call(this, newRequest);
    const clonedResponse = response.clone();
    clonedResponse.text().then((responseText) => {
      try {
        const userId = JSON.parse(responseText).sub;
        if (userId) {
          update_post_data("user_id", userId);
        }
      } catch (error) {
        console.error("Failed to parse JSON:", error);
      }
    });
    return response;
  };
  function insertStyle() {
    const styleElement = document.createElement("style");
    styleElement.setAttribute("type", "text/css");
    styleElement.innerHTML =
      "\n    #qTop {\n    user-select:none;\n    border-radius: 2px;\n    }\n    ul {\n        list-style: none;\n    }\n\n    #qBox {\n        width:100%;\n        z-index: 9999;\n        margin-top:10px\n        border-radius: 2px;\n        background-color: white;\n    }\n\n    #qBox>div {\n        font-size: 14px;\n        display: flex;\n        align-items: center;\n        justify-content: space-between;\n        padding: 5px 0px;\n    }\n    #qBox>#alert_box {\n    display: block;\n    text-align: left !important;\n    }\n\n    #qBox span {\n        \n    }\n\n    #qBox span button {\n        border: 0;\n        display: inline-block;\n        height: 30px;\n        border-radius: 2px;\n        min-width: 30px;\n    }\n\n    #qList {\n        max-width: 500px;\n        max-height: 150px;\n        overflow: hidden;\n        overflow-y: scroll;\n    }\n\n    #logo {\n        width: 35px;\n        height: 35px;\n        border-radius: 50%;\n        box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;\n        background-image: url('https://pic.imgdb.cn/item/66669cd95e6d1bfa05eb991b.jpg');\n        background-size: cover;\n    }\n    #qTitle {\n    display: inline-block;\n    width: 100%;\n    }\n    #qTitle input {\n        border: 1.5px solid gray;\n        height: 30px;\n        outline: none;\n        border-radius: 2px;\n        padding: 0 5px;\n        width:100%;\n    }\n    #qListUL {\n        padding: 0;\n    }\n    #qListUL li {\n        border: 1.5px solid gray;\n        border-radius: 2px;\n        margin: 5px 0;\n        display: flex;\n        justify-content: space-between;\n    }\n\n    ";
    let headElement = document.querySelector("head");
    headElement.appendChild(styleElement);
  }
  insertStyle();
  function insertMenu() {
    let menuElement = document.createElement("div");
    menuElement.id = "qBox";
    menuElement.innerHTML =
      '\n<div id="qTop">\n\n            <span id="logoBox">\n                <a href="https://paperkiteblog.xyz/" title="进入开发者博客">\n                    <div id="logo"></div>\n                </a>\n            </span>\n            <span>\n                PikPak开发者工具【上帝模式】\n            </span>\n        </div>\n        <div>\n            <span id="qTitle" style="color:blue">\n                <input type="text" name="" id="input_str" placeholder="请输入验证密钥...">\n            </span>\n        </div>\n        <div id="alert_box">\n       [开发者:纸鸢花的花语]为防止倒卖,验证密钥可在<a href="https://paperkite.top/">此处</a>获取,脚本免费仅供交流学习,任何问题可在<a href="https://paperkiteblog.xyz/">纸鸢の博客</a>反馈.\n        </div>\n\n';
    let footerElement = document.querySelector(".el-dialog__footer");
    if (footerElement) {
      footerElement.appendChild(menuElement);
      if (localStorage.getItem("pk_key")) {
        let inputElement = document.getElementById("input_str");
        inputElement.value = localStorage.getItem("pk_key");
      }
    } else {
      console.log("尝试");
      setTimeout(insertMenu, 1000);
    }
  }
  window.addEventListener("load", function () {
    insertMenu();
    let inputElement = document.getElementById("input_str");
    inputElement.value = inputKey;
  });
})();

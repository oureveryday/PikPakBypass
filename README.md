# Pikpak Windows 桌面端 跳过区域限制方法

* `Clear.bat` : 清除所有用户数据

```text
taskkill /f /im upnp.exe
taskkill /f /im FileHelper.exe
taskkill /f /im DownloadServer.exe
taskkill /f /im PikPak.exe
rd /S /Q %public%\PikPak
rd /S /Q %appdata%\PikPak
```

## 方法 (版本 V1.5.2.2518)

1. 打开 `Pikpak\resources\app\out\main-renderer\main.xxxxxxxx.js` (xxxxxxxx为随机二进制数，如b9ceb61b)
2. > 搜索1 (跳过区域检测):

```text
(`https://access.${e}/access_controller/v1/area_accessible`,{withCredentials:!1,withCaptcha:!1})
```

> 替换1:

```text
(console.log("Bypassing area check..."))
```

> 搜索2 (注册获取4/7天会员)(VSCode正则替换):

```text
\(0,([A-Za-z0-9]+\.[A-Za-z0-9]+)\)\(`\$\{([A-Za-z0-9]+\.[A-Za-z0-9]+)\}/activity/invite`,\{method:"POST",body:\{source:([A-Za-z0-9]+\.[A-Za-z0-9]+)\.get\(\)\.source,apk_extra:\{invite_code:[A-Za-z0-9]+\.[A-Za-z0-9]+\.get\([A-Za-z0-9]+\.[A-Za-z0-9]+\.SPREAD_ID\)\|\|""\},tf:[A-Za-z0-9]+\.[A-Za-z0-9]+\.get\(\)\.source,rf:[A-Za-z0-9]+\.[A-Za-z0-9]+\.get\(\)\.join\(\)\|\|void 0\},withCredentials:!0\}\)
```

> 替换2:

```text
{a=(0,$1)(`${$2}/activity/invite`,{method:"POST",body:{source:$3.get().source,tf:$3.get().source},withCredentials:!0,});(0,$1)(`${$2}/activity/rewardVip`,{method:"POST",body:{type:"install_web_pikpak_extension"},withCredentials:!0,});(0,$1)(`${$2}/activity/rewardVip`,{method:"POST",body:{type:"upload_file"},withCredentials:!0,});return a}
```

> 搜索3 (替换最大同时下载数1，太大无作用)(VSCode正则替换):

```text
,(.)=5,
```

> 替换3:

```text
,$1=10,
```



3. 保存文件并运行`Clear.bat`

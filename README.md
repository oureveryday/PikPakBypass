# Pikpak Windows 桌面端 跳过区域限制方法

* `Clear.bat` : 清除所有用户数据

```text
taskkill /f /im PikPak.exe
rd /S /Q %public%\PikPak
rd /S /Q %appdata%\PikPak
```

## 方法

1. 打开 `Pikpak\resources\app\out\main-renderer\main.js`
2. > 搜索1 (跳过区域检测):

```text
(`https://access.${e}/access_controller/v1/area_accessible`,{withCredentials:!1,withCaptcha:!1})
```

> 替换1:

```text
(console.log("Bypassing area check..."))
```

> 搜索2 (注册获取3天会员):

```text
{from:"web",source:T.tT.get().source}
```

> 替换2:

```text
{userType:1,versionCode:"PC-Electron",versionName:"1.0.0"}
```

3. 保存文件并运行`Clear.bat`

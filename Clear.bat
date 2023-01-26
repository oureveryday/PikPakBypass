taskkill /f /im upnp.exe
taskkill /f /im FileHelper.exe
taskkill /f /im DownloadServer.exe
taskkill /f /im PikPak.exe
rd /S /Q %public%\PikPak
rd /S /Q %appdata%\PikPak
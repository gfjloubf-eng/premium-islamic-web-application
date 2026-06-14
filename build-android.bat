@echo off
chcp 65001 >nul
echo 🕌 بناء تطبيق الأذكار للأندرويد
echo ================================

REM Step 1: Build web app
echo 📦 1. بناء تطبيق الويب...
call npm run build

REM Step 2: Sync Capacitor
echo 🔄 2. مزامنة الملفات...
call npx cap sync android

REM Step 3: Copy dist to android assets
echo 📋 3. نسخ ملفات الويب...
if exist "android\app\src\main\assets\public" rmdir /s /q "android\app\src\main\assets\public"
mkdir "android\app\src\main\assets\public"
xcopy /s /e /y "dist\*" "android\app\src\main\assets\public\"

REM Step 4: Build Debug APK
echo 🔨 4. بناء APK Debug...
cd android
call gradlew.bat assembleDebug

REM Step 5: Build Release APK
echo 🚀 5. بناء APK Release...
call gradlew.bat assembleRelease

cd ..
echo.
echo ✅ تم البناء بنجاح!
echo.
echo 📍 مواقع ملفات APK:
echo    Debug: android\app\build\outputs\apk\debug\app-debug.apk
echo    Release: android\app\build\outputs\apk\release\app-release-unsigned.apk
echo.
pause

#!/bin/bash

echo "🕌 بناء تطبيق الأذكار للأندرويد"
echo "================================"

# Step 1: Build web app
echo "📦 1. بناء تطبيق الويب..."
npm run build

# Step 2: Initialize Capacitor if needed
if [ ! -f "capacitor.config.ts" ]; then
  echo "⚙️ 2. تهيئة Capacitor..."
  npx cap init "تطبيق الأذكار" "com.azkar.app" --web-dir dist
fi

# Step 3: Add Android platform if needed
if [ ! -d "android" ]; then
  echo "📱 3. إضافة منصة Android..."
  npx cap add android
fi

# Step 4: Sync web assets to Android
echo "🔄 4. مزامنة الملفات..."
npx cap sync android

# Step 5: Copy dist to android assets
echo "📋 5. نسخ ملفات الويب..."
rm -rf android/app/src/main/assets/public
mkdir -p android/app/src/main/assets/public
cp -r dist/* android/app/src/main/assets/public/

# Step 6: Build Debug APK
echo "🔨 6. بناء APK Debug..."
cd android
./gradlew assembleDebug

# Step 7: Build Release APK
echo "🚀 7. بناء APK Release..."
./gradlew assembleRelease

echo ""
echo "✅ تم البناء بنجاح!"
echo ""
echo "📍 مواقع ملفات APK:"
echo "   Debug: android/app/build/outputs/apk/debug/app-debug.apk"
echo "   Release: android/app/build/outputs/apk/release/app-release-unsigned.apk"
echo ""

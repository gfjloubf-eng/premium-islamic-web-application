# 🕌 تطبيق الأذكار - دليل بناء APK للأندرويد

## المتطلبات الأساسية

قبل البدء، تأكد من تثبيت:

1. **Node.js** (الإصدار 18 أو أحدث)
2. **Java JDK 17** أو أحدث
3. **Android SDK** (عبر Android Studio أو Command Line Tools)

### تثبيت Android SDK

#### الخيار 1: Android Studio (الأسهل)
1. حمّل [Android Studio](https://developer.android.com/studio)
2. ثبّته واقبل التراخيص
3. SDK سيتم تثبيته تلقائياً

#### الخيار 2: Command Line Tools
```bash
# تحميل command line tools من:
# https://developer.android.com/studio#command-tools

# تعيين متغيرات البيئة
export ANDROID_HOME=$HOME/Android/Sdk
export PATH=$PATH:$ANDROID_HOME/cmdline-tools/latest/bin
export PATH=$PATH:$ANDROID_HOME/platform-tools
```

## خطوات البناء

### الخطوة 1: تثبيت الحزم
```bash
npm install
```

### الخطوة 2: بناء تطبيق الويب
```bash
npm run build
```

### الخطوة 3: مزامنة Capacitor
```bash
npx cap sync android
```

### الخطوة 4: نسخ الملفات إلى Android
```bash
# Linux/Mac
cp -r dist/* android/app/src/main/assets/public/

# Windows (PowerShell)
Copy-Item -Path "dist\*" -Destination "android\app\src\main\assets\public\" -Recurse -Force
```

### الخطوة 5: بناء APK

#### Debug APK (للتجربة)
```bash
cd android
./gradlew assembleDebug
# أو على Windows
gradlew.bat assembleDebug
```

📍 الملف: `android/app/build/outputs/apk/debug/app-debug.apk`

#### Release APK (للنشر)
```bash
cd android
./gradlew assembleRelease
# أو على Windows
gradlew.bat assembleRelease
```

📍 الملف: `android/app/build/outputs/apk/release/app-release-unsigned.apk`

## البناء السريع (أمر واحد)

### Linux/Mac:
```bash
chmod +x build-android.sh
./build-android.sh
```

### Windows:
```batch
build-android.bat
```

## توقيع APK للنشر على Google Play

### إنشاء Keystore
```bash
keytool -genkey -v -keystore azkar-release-key.keystore -alias azkar -keyalg RSA -keysize 2048 -validity 10000
```

### توقيع APK
```bash
# في مجلد android
./gradlew assembleRelease

# توقيع APK
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 \
  -keystore azkar-release-key.keystore \
  app/build/outputs/apk/release/app-release-unsigned.apk azkar

# تحسين APK
zipalign -v 4 \
  app/build/outputs/apk/release/app-release-unsigned.apk \
  app/build/outputs/apk/release/app-release.apk
```

## استكشاف الأخطاء

### خطأ: JAVA_HOME not set
```bash
# Linux/Mac
export JAVA_HOME=/usr/lib/jvm/java-17-openjdk

# Windows
set JAVA_HOME=C:\Program Files\Java\jdk-17
```

### خطأ: SDK location not found
```bash
# إنشاء ملف local.properties في مجلد android
echo "sdk.dir=/path/to/Android/Sdk" > android/local.properties
```

### خطأ: License not accepted
```bash
yes | sdkmanager --licenses
```

## معلومات التطبيق

| الخاصية | القيمة |
|---------|--------|
| اسم التطبيق | تطبيق الأذكار |
| معرف الحزمة | com.azkar.app |
| الإصدار | 1.0.0 |
| الحد الأدنى لـ Android | API 22 (Android 5.1) |
| الهدف | API 34 (Android 14) |

## الميزات

✅ أذكار الصباح والمساء  
✅ التسبيح الإلكتروني  
✅ أدعية الأنبياء  
✅ الأدعية القرآنية  
✅ المفضلة  
✅ الوضع الليلي/النهاري  
✅ دعم كامل للعربية RTL  
✅ يعمل بدون انترنت  

---

💚 بارك الله فيك وجعله في ميزان حسناتك

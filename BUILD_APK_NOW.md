# 🕌 بناء APK فوراً - تطبيق الأذكار

## ✅ المشروع جاهز للبناء!

تم إعداد جميع ملفات Android اللازمة. لبناء ملف APK، نفّذ الأوامر التالية:

---

## 🚀 الخطوات السريعة (نسخ ولصق)

### 1️⃣ مزامنة Capacitor
```bash
npx cap sync android
```

### 2️⃣ بناء Debug APK
```bash
cd android && ./gradlew assembleDebug && cd ..
```

### 3️⃣ بناء Release APK
```bash
cd android && ./gradlew assembleRelease && cd ..
```

---

## 📍 مواقع ملفات APK

بعد البناء، ستجد الملفات في:

| النوع | المسار |
|-------|--------|
| **Debug** | `android/app/build/outputs/apk/debug/app-debug.apk` |
| **Release** | `android/app/build/outputs/apk/release/app-release-unsigned.apk` |

---

## ⚠️ قبل البدء تأكد من:

1. **Android SDK** مثبت (عبر Android Studio)
2. **Java JDK 17** مثبت
3. ملف `android/local.properties` يحتوي على:
   ```
   sdk.dir=/path/to/your/Android/Sdk
   ```

---

## 🔧 إصلاح المشاكل الشائعة

### SDK not found:
```bash
echo "sdk.dir=$ANDROID_HOME" > android/local.properties
```

### License not accepted:
```bash
yes | $ANDROID_HOME/cmdline-tools/latest/bin/sdkmanager --licenses
```

### Build failed - Gradle:
```bash
cd android
./gradlew clean
./gradlew assembleDebug
```

---

## 📱 معلومات التطبيق

- **اسم التطبيق**: تطبيق الأذكار
- **معرف الحزمة**: `com.azkar.app`
- **الإصدار**: `1.0.0`
- **الحد الأدنى**: Android 5.1 (API 22)

---

💚 **بارك الله فيك** 🤲

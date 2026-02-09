# Unsent - Quick Start Guide

Get the app running in 5 minutes.

---

## Prerequisites

You need:
- ✅ Flutter SDK (3.0.0+)
- ✅ Android Studio OR Android device
- ✅ 5GB free disk space

---

## Installation

### Step 1: Install Flutter

**Windows:**
```powershell
# Download Flutter SDK from flutter.dev
# Extract to C:\src\flutter
# Add to PATH:
$env:Path += ";C:\src\flutter\bin"

# Verify:
flutter doctor
```

### Step 2: Setup Android

**Option A: Emulator** (Recommended for testing)
1. Install Android Studio
2. Open: Tools → Device Manager
3. Create new Pixel 5 device
4. Install Android 13 (API 33)
5. Launch emulator

**Option B: Physical Device** (Best performance)
1. Enable Developer Options
2. Enable USB Debugging
3. Connect via USB
4. Verify: `flutter devices`

### Step 3: Get Dependencies

```bash
cd d:\Cursor\Unsent
flutter pub get
```

### Step 4: Run the App

```bash
flutter run
```

**Done!** The app should launch on your device/emulator.

---

## Quick Test

After launch, test these 5 things:

1. **Type** → Prompt disappears ✓
2. **Wait 5s** → Release button appears ✓
3. **Tap Release** → Text drifts away ✓
4. **See message** → "You don't have to carry that anymore" ✓
5. **Tap Write Again** → Returns to empty state ✓

If all 5 work → **Success!** 🎉

---

## Build Release APK

```bash
flutter build apk --release
```

APK location:
```
build/app/outputs/flutter-apk/app-release.apk
```

Install on device:
```bash
adb install build/app/outputs/flutter-apk/app-release.apk
```

---

## Troubleshooting

### Problem: "Flutter not found"

**Solution:**
```powershell
# Add to PATH permanently
[System.Environment]::SetEnvironmentVariable('Path', $env:Path + ';C:\src\flutter\bin', [System.EnvironmentVariableTarget]::User)
```

### Problem: "No devices found"

**Solution:**
```bash
# Start emulator:
flutter emulators
flutter emulators --launch <id>

# OR connect physical device and enable USB debugging
```

### Problem: "Gradle build failed"

**Solution:**
```bash
cd android
gradlew clean
cd ..
flutter clean
flutter pub get
flutter run
```

### Problem: "App crashes on launch"

**Solution:**
```bash
# Check logs:
flutter logs

# Rebuild:
flutter clean
flutter run
```

---

## Hot Reload During Development

While app is running:
- Press **R** → Full restart
- Press **r** → Hot reload (keeps state)
- Press **q** → Quit

---

## Next Steps

- Read: `IMPLEMENTATION.md` (detailed architecture)
- Read: `DESIGN_REFERENCE.md` (visual specs)
- Read: `SETUP.md` (comprehensive guide)

---

## Support

**Flutter Docs**: https://flutter.dev/docs
**Flutter Discord**: https://discord.gg/flutter

---

**Total setup time: ~5 minutes** ⏱️

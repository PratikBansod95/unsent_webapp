# Unsent - Setup Guide

## Prerequisites

### Required Software

1. **Flutter SDK** (3.0.0 or higher)
   - Download: https://flutter.dev/docs/get-started/install
   - Verify: `flutter --version`

2. **Android Studio** (for Android development)
   - Download: https://developer.android.com/studio
   - Install Android SDK
   - Install Android Emulator (or use physical device)

3. **Git** (optional, for version control)
   - Download: https://git-scm.com/downloads

### System Requirements

- **Windows**: 10/11 (64-bit)
- **RAM**: 4GB minimum (8GB recommended)
- **Disk**: 5GB free space
- **Android**: API 21+ (Android 5.0 Lollipop and above)

## Installation Steps

### 1. Install Flutter

**Windows (PowerShell):**
```powershell
# Download Flutter SDK
# Extract to C:\src\flutter

# Add to PATH
$env:Path += ";C:\src\flutter\bin"

# Verify installation
flutter doctor
```

**Run Flutter Doctor:**
```bash
flutter doctor
```

Expected output:
```
[✓] Flutter (Channel stable, 3.x.x)
[✓] Android toolchain - develop for Android devices
[✓] Android Studio (version 20xx.x)
```

### 2. Setup Android Environment

**Install Android Studio:**
1. Download from: https://developer.android.com/studio
2. Run installer
3. Open Android Studio
4. Go to: Tools → SDK Manager
5. Install: Android SDK Platform 34 (or latest)

**Create Virtual Device:**
1. Tools → Device Manager
2. Create Device
3. Select: Pixel 5 or similar
4. System Image: Android 13 (API 33)
5. Finish and Launch

### 3. Setup Project

**Navigate to project directory:**
```bash
cd d:\Cursor\Unsent
```

**Get dependencies:**
```bash
flutter pub get
```

**Verify project:**
```bash
flutter analyze
```

Expected: No issues found!

## Running the App

### Option 1: Android Emulator

**Start emulator:**
```bash
flutter emulators
flutter emulators --launch <emulator_id>
```

**Run app:**
```bash
flutter run
```

### Option 2: Physical Device

**Enable USB Debugging:**
1. Settings → About Phone
2. Tap "Build Number" 7 times
3. Settings → Developer Options
4. Enable "USB Debugging"
5. Connect device via USB

**Verify connection:**
```bash
flutter devices
```

**Run app:**
```bash
flutter run
```

### Option 3: Hot Reload During Development

**Run with hot reload:**
```bash
flutter run
```

**While running:**
- Press `r` to hot reload
- Press `R` to hot restart
- Press `q` to quit

## Building Release APK

### Debug Build
```bash
flutter build apk --debug
```

### Release Build
```bash
flutter build apk --release
```

**Output location:**
```
build/app/outputs/flutter-apk/app-release.apk
```

### Install Release APK on Device
```bash
flutter install
```

Or manually:
1. Copy APK to device
2. Open file manager
3. Tap APK file
4. Allow "Install Unknown Apps" if prompted
5. Install

## Troubleshooting

### Issue: "Flutter command not found"

**Solution:**
```powershell
# Add Flutter to PATH permanently
[System.Environment]::SetEnvironmentVariable('Path', $env:Path + ';C:\src\flutter\bin', [System.EnvironmentVariableTarget]::User)
```

### Issue: "Android license status unknown"

**Solution:**
```bash
flutter doctor --android-licenses
# Accept all licenses
```

### Issue: "Gradle build failed"

**Solution:**
```bash
cd android
./gradlew clean
cd ..
flutter clean
flutter pub get
flutter run
```

### Issue: "SDK version conflict"

**Solution:**
Edit `android/app/build.gradle`:
```gradle
android {
    compileSdkVersion 34
    
    defaultConfig {
        minSdkVersion 21
        targetSdkVersion 34
    }
}
```

### Issue: "App crashes on launch"

**Solutions:**
1. Check logs: `flutter logs`
2. Rebuild: `flutter clean && flutter run`
3. Check device API level: Must be 21+

### Issue: "Slow performance"

**Solutions:**
1. Run in release mode: `flutter run --release`
2. Enable hardware acceleration (emulator)
3. Use physical device for testing
4. Close other apps

## Development Tips

### VS Code Setup

**Install extensions:**
1. Flutter (Dart-Code.flutter)
2. Dart (Dart-Code.dart-code)

**Recommended settings.json:**
```json
{
  "dart.flutterSdkPath": "C:\\src\\flutter",
  "editor.formatOnSave": true,
  "editor.rulers": [80, 120],
  "files.autoSave": "afterDelay"
}
```

### Android Studio Setup

**Plugins:**
1. File → Settings → Plugins
2. Install: Flutter, Dart

**Run Configuration:**
1. Run → Edit Configurations
2. Add: Flutter
3. Set: Entry point = lib/main.dart

### Performance Profiling

**Enable performance overlay:**
```dart
// In MaterialApp:
showPerformanceOverlay: true,
```

**Profile mode:**
```bash
flutter run --profile
```

**DevTools:**
```bash
flutter pub global activate devtools
flutter pub global run devtools
```

## Testing on Different Devices

### Recommended Test Devices

**Emulators:**
- Pixel 5 (1080x2340)
- Pixel 6 Pro (1440x3120)
- Samsung Galaxy S21 (1080x2400)

**Physical:**
- Any Android 5.0+ device
- Recommended: Android 10+ for best experience

### Screen Sizes
- Minimum: 360x640 (small phone)
- Maximum: 1440x3120 (large phone)
- App handles all sizes (responsive)

## Deployment Checklist

Before release:

- [ ] Test on multiple devices
- [ ] Test on Android 5.0 and latest
- [ ] Verify all animations at 60 FPS
- [ ] Test keyboard behavior
- [ ] Test back button behavior
- [ ] Test long press gesture
- [ ] Verify no data persistence
- [ ] Check app size (<10MB ideal)
- [ ] Test offline functionality
- [ ] Verify no network requests
- [ ] Test battery usage (should be minimal)

## Next Steps

After setup:

1. **Run the app**: `flutter run`
2. **Test all states**: Follow IMPLEMENTATION.md testing checklist
3. **Profile performance**: Use `--profile` mode
4. **Build release**: `flutter build apk --release`

## Support

For Flutter issues:
- Docs: https://flutter.dev/docs
- Community: https://discord.gg/flutter

For this app:
- See: IMPLEMENTATION.md
- Check: README.md

---

**Setup complete! Run `flutter run` to see your app.**

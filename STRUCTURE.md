# Unsent - Project Structure

Complete file tree and architecture overview.

---

## Directory Structure

```
Unsent/
│
├── android/                          # Android platform files
│   ├── app/
│   │   ├── src/
│   │   │   └── main/
│   │   │       ├── kotlin/
│   │   │       │   └── com/unsent/app/
│   │   │       │       └── MainActivity.kt    # Android activity
│   │   │       ├── res/
│   │   │       │   ├── drawable/
│   │   │       │   │   └── launch_background.xml  # Splash screen
│   │   │       │   └── values/
│   │   │       │       └── styles.xml         # App themes
│   │   │       └── AndroidManifest.xml        # App configuration
│   │   └── build.gradle                       # App-level Gradle config
│   ├── build.gradle                           # Project-level Gradle config
│   ├── settings.gradle                        # Gradle settings
│   └── gradle.properties                      # Gradle properties
│
├── lib/                              # Flutter application code
│   └── main.dart                     # Complete app implementation
│                                     # (600+ lines, single file)
│
├── .idea/                            # IDE configuration (IntelliJ/Android Studio)
├── .gitignore                        # Git ignore rules
├── pubspec.yaml                      # Flutter dependencies & config
│
└── Documentation/
    ├── README.md                     # Project overview
    ├── QUICKSTART.md                 # 5-minute setup guide
    ├── SETUP.md                      # Comprehensive setup guide
    ├── IMPLEMENTATION.md             # Technical architecture details
    ├── DESIGN_REFERENCE.md           # Complete visual specifications
    └── STRUCTURE.md                  # This file
```

---

## Core Files Explained

### `lib/main.dart`

**Single file containing entire app** (~600 lines)

**Structure:**
```dart
// Entry point
main()
UnsentApp()

// Main screen
UnsentScreen (StatefulWidget)
_UnsentScreenState

// Enums & Data Classes
AppState (enum)
_CharacterWidget (data class)

// Custom Widgets
_GlowButton
_FadeInOutText
GradientBackgroundPainter
_GradientNoisePainter
```

**Key Components:**

1. **State Management**
   - AppState enum (5 states)
   - TextEditingController
   - Timer for pause detection

2. **Animation Controllers** (4 total)
   - Button fade (800ms)
   - Release animation (2800ms)
   - Glow effect (2800ms)
   - After message (1000ms)

3. **Custom Painters**
   - Gradient background
   - Noise overlay

4. **Widgets**
   - Text input with gradient mask
   - Glow buttons
   - Text disassembly animation
   - Overlay messages

---

## Android Configuration Files

### `AndroidManifest.xml`

**Purpose**: App metadata and permissions

**Key Settings:**
```xml
- Package: com.unsent.app
- Label: Unsent
- Launch mode: singleTop
- Hardware acceleration: true
- Keyboard mode: adjustResize
```

**No Permissions Required**: Offline app, no special permissions

---

### `build.gradle` (App Level)

**Purpose**: Android build configuration

**Key Settings:**
```gradle
- Compile SDK: 34 (Android 14)
- Min SDK: 21 (Android 5.0)
- Target SDK: 34
- Kotlin: 1.9.0
```

---

### `MainActivity.kt`

**Purpose**: Android entry point

**Code:**
```kotlin
package com.unsent.app
import io.flutter.embedding.android.FlutterActivity
class MainActivity: FlutterActivity() {}
```

**Minimal implementation**: Flutter handles everything

---

### `styles.xml`

**Purpose**: Theme configuration

**Defines:**
- LaunchTheme (splash screen)
- NormalTheme (main app)

**Colors Match App**:
- Background: Gradient (#0F1115 → #1A1D24)

---

### `launch_background.xml`

**Purpose**: Splash screen

**Features:**
- Gradient background (matches app)
- Centered app icon
- Smooth transition to app

---

## Flutter Configuration

### `pubspec.yaml`

**Purpose**: Flutter project configuration

**Contents:**
```yaml
name: unsent
version: 1.0.0+1
sdk: '>=3.0.0 <4.0.0'

dependencies:
  flutter: sdk

dev_dependencies:
  flutter_test: sdk
  flutter_lints: ^2.0.0
```

**No External Dependencies**: Pure Flutter, no third-party packages

---

## Documentation Files

### `README.md`
- Project overview
- Core philosophy
- Feature list
- Non-negotiables

### `QUICKSTART.md`
- 5-minute setup
- Quick test checklist
- Common issues
- One-page reference

### `SETUP.md`
- Comprehensive installation
- Environment setup
- Troubleshooting
- Development tips

### `IMPLEMENTATION.md`
- Architecture details
- Animation specifications
- Performance optimizations
- Testing checklist

### `DESIGN_REFERENCE.md`
- Complete visual specs
- Color system
- Typography
- Layout & spacing
- Animation timing

### `STRUCTURE.md`
- This file
- Project organization
- File explanations
- Architecture overview

---

## Architecture Overview

### Single-Screen App

```
┌─────────────────────────────────────┐
│         UnsentScreen                │
│  (StatefulWidget)                   │
│                                     │
│  ┌─────────────────────────────┐   │
│  │  State Management           │   │
│  │  - AppState enum            │   │
│  │  - TextEditingController    │   │
│  │  - Timer (pause detection)  │   │
│  └─────────────────────────────┘   │
│                                     │
│  ┌─────────────────────────────┐   │
│  │  Animation Controllers      │   │
│  │  - Button fade              │   │
│  │  - Release animation        │   │
│  │  - Glow effect              │   │
│  │  - After message            │   │
│  └─────────────────────────────┘   │
│                                     │
│  ┌─────────────────────────────┐   │
│  │  UI Components              │   │
│  │  - GradientBackground       │   │
│  │  - TextInput                │   │
│  │  - GlowButton               │   │
│  │  - FadeText                 │   │
│  └─────────────────────────────┘   │
└─────────────────────────────────────┘
```

### State Flow

```
Empty ──type──▶ Writing ──5s pause──▶ Paused
  ▲                                      │
  │                                      │
  └──────────────◀───────────────────────┘
                  Write Again

Paused ──Release──▶ Releasing ──complete──▶ Released
                    (2.8s animation)
```

### Component Hierarchy

```
MaterialApp
└── UnsentScreen
    └── WillPopScope (back button handling)
        └── Scaffold
            └── GestureDetector (long press, swipe)
                ├── GradientBackgroundPainter (full screen)
                └── SafeArea
                    └── Column
                        ├── Title ("Unsent")
                        ├── Main Content (state-dependent)
                        │   ├── TextInput (Empty/Writing/Paused)
                        │   ├── DisassemblyAnimation (Releasing)
                        │   └── ClosureMessage (Released)
                        └── Bottom Buttons (state-dependent)
                            ├── Release (Paused)
                            └── Write Again (Released)
```

---

## Code Organization

### Why Single File?

**Benefits:**
- Easy to navigate
- No import complexity
- Clear component relationships
- Fast compilation
- Simple debugging

**Acceptable Because:**
- Single-screen app
- ~600 lines (not excessive)
- Well-structured with clear sections
- Heavily commented
- Clean separation of concerns

### File Sections

**main.dart organized as:**

1. **Imports & Entry** (lines 1-20)
2. **App Root** (lines 21-40)
3. **State Enum** (lines 41-50)
4. **Main Screen** (lines 51-400)
   - State variables
   - Lifecycle methods
   - Event handlers
   - Build methods
5. **Button Widget** (lines 401-480)
6. **Background Painter** (lines 481-530)
7. **Helper Classes** (lines 531-600)

---

## Build Output

### Development Build
```
build/
└── app/
    └── outputs/
        └── flutter-apk/
            └── app-debug.apk         (~25MB)
```

### Release Build
```
build/
└── app/
    └── outputs/
        ├── flutter-apk/
        │   └── app-release.apk       (~15MB)
        └── bundle/
            └── release/
                └── app-release.aab   (~12MB)
```

---

## Development Workflow

### Hot Reload Workflow

```
1. Edit code
2. Save file
3. Press 'r' (hot reload)
4. See changes instantly
   (for most UI changes)

5. Press 'R' (hot restart)
   (for state/logic changes)
```

### Testing Workflow

```
1. flutter run
2. Test feature
3. Check console for errors
4. Use Performance Overlay
5. Profile in release mode
6. Test on physical device
```

---

## Performance Considerations

### Why This Structure Works

**Single File Benefits:**
- Faster hot reload
- No module overhead
- Direct component access
- Clear call stack

**Optimization Points:**
- CustomPainter (GPU-accelerated)
- Const constructors
- AnimatedBuilder (isolated rebuilds)
- Positioned widgets (no relayout)

---

## Future Scalability

### If App Grows

**Recommended Split:**

```
lib/
├── main.dart                 # Entry point
├── screens/
│   └── unsent_screen.dart    # Main screen
├── widgets/
│   ├── glow_button.dart
│   └── fade_text.dart
├── painters/
│   └── gradient_painter.dart
├── models/
│   └── app_state.dart
└── utils/
    └── constants.dart
```

**But Not Needed Now**: Current structure is optimal for scope

---

## Size Analysis

### Source Code
- `lib/main.dart`: 600 lines
- Android config: ~100 lines
- Documentation: ~2000 lines
- **Total**: ~2700 lines

### App Size
- Debug APK: ~25MB (includes debug symbols)
- Release APK: ~15MB (optimized)
- Release AAB: ~12MB (Play Store bundle)

### Dependencies
- Flutter SDK: Only
- No third-party packages
- No assets
- Minimal footprint

---

## Comparison to Typical Flutter Projects

### Typical Project

```
lib/
├── main.dart
├── screens/ (5-10 files)
├── widgets/ (10-20 files)
├── models/ (5-10 files)
├── services/ (5-10 files)
├── utils/ (5-10 files)
└── assets/ (images, fonts)

Total: 30-60 files
```

### Unsent Project

```
lib/
└── main.dart

Total: 1 file
```

**Rationale**: Single-purpose app, single-screen, minimal complexity

---

## Maintenance Guide

### Adding Features

**Before adding:**
1. Ask: Does it violate core principles?
2. Check: Can it stay in single file?
3. Verify: Is it truly necessary?

**If approved:**
1. Add to appropriate section
2. Update documentation
3. Test all existing features
4. Verify animations still smooth

### Modifying Animations

**Animation changes:**
1. Adjust AnimationController duration
2. Modify Tween values
3. Change curve (Curves.easeInOut, etc.)
4. Test at 60 FPS

**Where to modify:**
- Animation setup: initState()
- Animation values: Tween/TweenSequence
- Animation triggers: Event handlers

---

**This structure is intentionally minimal to match the app's philosophy.**

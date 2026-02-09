# Unsent - Implementation Details

## Architecture Overview

This Flutter app is built as a single-screen application with state-driven UI and custom animations.

### File Structure

```
lib/
└── main.dart          # Complete app implementation (600+ lines)
```

## Core Components

### 1. State Management

**AppState Enum** - Five distinct states:
- `empty` - Initial landing with prompt text
- `writing` - Active typing state
- `paused` - 5-second pause detected, Release button visible
- `releasing` - Text disassembly animation in progress
- `released` - Closure message and Write Again button

### 2. Animation Controllers

**Four dedicated AnimationController instances:**

1. **_buttonFadeController** (800ms)
   - Fades Release/Write Again buttons in/out
   - Uses easeInOut curve

2. **_releaseAnimationController** (2800ms)
   - Drives text disassembly animation
   - Controls letter drift and opacity fade
   - 2.8 seconds matches spec (2.5-3s range)
   - Uses slowMiddle curve for natural motion

3. **_glowController** (2800ms)
   - Multi-layered warm amber glow (#E8A87C → #FFB88C)
   - Radial gradient from bottom center
   - 4-stage intensity curve with organic breathing
   - Dynamic radius expansion (0.8 → 1.8 → 1.5)
   - Outer, middle, inner, and wash layers for depth

4. **_afterMessageController** (1000ms)
   - Closure message fade-in
   - Smooth easeIn curve

### 3. Custom Painters

**_GradientNoisePainter**
- Vertical gradient: #0F1115 → #1A1D24
- 2000 noise particles (fixed seed for consistency)
- Opacity: 2.5% (matches spec 2-3%)
- No visible patterns

### 4. Text Disassembly Algorithm

**Character-level animation:**
- Each character becomes independent widget
- Random drift offsets (15-55px range for enhanced motion)
- Horizontal spread (±4px for natural loosening)
- Staggered delays (0-0.25s)
- Very subtle rotation (±0.08 radians)
- Easing: slowMiddle for drift, multi-stage for opacity
- Blur effect simulation as text fades
- Feels like "weight lifting off" with organic motion

### 5. UI Components

#### Text Input
- Full-screen TextField
- No borders or containers
- Gradient fade mask (top/bottom 5%)
- Color: #E6E6EB
- Line height: 1.8 (generous spacing)
- Slow cursor blink (default Flutter)

#### Glow Button Component
- Pill-shaped (32px border radius)
- Translucent background (black @ 40% opacity)
- Warm amber glow (BoxShadow with #E8A87C)
- Press animation: scale to 0.97
- Smooth scale transition (150ms)

#### Empty State Prompt
```
Write it.
No one will read it.
```
- Center-aligned
- 40% opacity
- Disappears on first keystroke

#### Closure Message
```
You don't have to carry that anymore.
```
- Fades in after release animation
- Soft off-white (85% opacity)
- Center-aligned with padding

### 6. Gesture Handling

**Implemented gestures:**
- Long press on empty screen → instant text clear
- Vertical drag → dismiss keyboard
- Back button → "Nothing is saved" overlay (2s fade)

### 7. Pause Detection

**Timer-based detection:**
- 5-second countdown starts on text change
- Resets on each keystroke
- Triggers Release button fade-in
- Cancelled during animations

## Performance Optimizations

### 60 FPS Target

1. **Efficient Repaints**
   - CustomPainter with shouldRepaint: false
   - AnimatedBuilder for isolated rebuilds
   - Const constructors where possible

2. **Animation Optimization**
   - Tween animations (GPU-accelerated)
   - No layout changes during animation
   - Positioned widgets for text drift (no relayout)

3. **State Management**
   - Minimal setState calls
   - Focused rebuilds with AnimatedBuilder
   - Dispose pattern for all controllers

## Color Palette

```dart
Background Gradient:
  Top: #0F1115 (near-black charcoal)
  Bottom: #1A1D24 (soft midnight blue)

Text:
  Primary: #E6E6EB (soft off-white)
  Title: White @ 80% opacity
  Prompt: White @ 40% opacity

Accent:
  Glow: #E8A87C (warm amber)
  Button background: Black @ 40% opacity

Noise Overlay:
  White @ 2.5% opacity
```

## Typography

- **Font**: System sans-serif
- **Weights**: 
  - Title: 300 (Light)
  - Body: 300 (Light)
  - Button: 400 (Regular)
- **Sizes**:
  - Title: 16px, 2.0 letter-spacing
  - Body: 18px, 1.8 line-height
  - Prompt/Message: 20px, 1.6 line-height
  - Button: 16px, 0.5 letter-spacing

## Animation Timing

| Animation | Duration | Curve | Notes |
|-----------|----------|-------|-------|
| Button fade | 800ms | easeInOut | In/out transitions |
| Text drift | 2800ms | slowMiddle | Smooth character descent |
| Text opacity | 2800ms | Multi-stage | 3-stage fade (85% → 15% → 0%) |
| Horizontal drift | 2800ms | easeOut | Subtle spread ±4px |
| Rotation | 2800ms | easeOut | Very subtle ±0.08 rad |
| Glow intensity | 2800ms | 4-stage custom | Organic breathing (0→25%→70%→55%→35%) |
| Glow radius | 2800ms | 2-stage | Expands then settles |
| After message | 1000ms | easeIn | Gentle reveal |
| Button press | 150ms | easeInOut | Tactile feedback |
| Overlay text | 2000ms | easeInOut | Back button warning |

## Non-Implemented Features

**Optional sound effect:**
- Spec mentions "soft exhale" sound
- Not implemented (requires audio asset)
- Can be added with `audioplayers` package

**Implementation notes:**
```dart
// To add sound:
// 1. Add dependency: audioplayers: ^5.0.0
// 2. Add asset to pubspec.yaml
// 3. Play during _onRelease():
//    final player = AudioPlayer();
//    await player.play(AssetSource('exhale.mp3'));
```

## Testing Recommendations

### Manual Testing Checklist

1. **State Transitions**
   - [ ] Empty → Writing on first keystroke
   - [ ] Writing → Paused after 5s
   - [ ] Paused → Writing on keystroke
   - [ ] Paused → Releasing on button tap
   - [ ] Releasing → Released after 2.8s
   - [ ] Released → Empty on Write Again

2. **Animations**
   - [ ] Text drifts downward smoothly
   - [ ] Opacity fades naturally
   - [ ] Glow appears and peaks correctly
   - [ ] Button fades are smooth
   - [ ] No janky frames during release

3. **Gestures**
   - [ ] Long press clears text
   - [ ] Swipe down dismisses keyboard
   - [ ] Back button shows overlay
   - [ ] Button press scales down

4. **Edge Cases**
   - [ ] Rapid typing doesn't trigger pause
   - [ ] Clearing text hides button
   - [ ] Multiple Write Again cycles work
   - [ ] App handles rotation (portrait only)

### Performance Testing

**FPS Monitoring:**
```bash
flutter run --profile
# Enable performance overlay in-app
# Watch for dropped frames during animation
```

**Memory Profiling:**
```bash
flutter run --profile
# Use DevTools to check for memory leaks
# Verify controllers are disposed properly
```

## Known Limitations

1. **Text Layout**
   - Character positioning is approximate
   - Long words may not wrap perfectly during animation
   - Multi-line text animates as single-line array
   - **Workaround**: Acceptable for emotional effect

2. **Keyboard Behavior**
   - Auto-focus on launch may not work on all devices
   - System keyboard varies by manufacturer
   - **Workaround**: User can tap to focus

3. **Back Button**
   - WillPopScope deprecated in Flutter 3.12+
   - Still works but may need migration
   - **Future**: Use PopScope widget

## Future Enhancements (If Requested)

### Possible Additions
- [ ] Haptic feedback on button press
- [ ] Sound effect for release
- [ ] Custom font (e.g., Inter, SF Pro)
- [ ] Accessibility: VoiceOver support
- [ ] Landscape orientation support
- [ ] Tablet layout optimization

### Intentionally Omitted
- ❌ Analytics/tracking
- ❌ Cloud sync
- ❌ Local storage
- ❌ Share functionality
- ❌ User accounts
- ❌ Notifications
- ❌ Onboarding tutorial

## Build Instructions

### Development Build
```bash
flutter pub get
flutter run
```

### Release Build (Android)
```bash
flutter build apk --release
# APK at: build/app/outputs/flutter-apk/app-release.apk
```

### Release Build (AAB for Play Store)
```bash
flutter build appbundle --release
# AAB at: build/app/outputs/bundle/release/app-release.aab
```

## Code Quality

- **Lines**: ~600 (single file)
- **Comments**: Extensive inline documentation
- **Architecture**: Clean separation of concerns
- **Null safety**: Enabled (SDK >= 3.0.0)
- **Warnings**: Zero (with flutter_lints)

## Emotional Design Checklist

- [x] Quiet (minimal UI, soft colors)
- [x] Heavy (slow animations, deliberate timing)
- [x] Safe (no saving, no tracking)
- [x] Premium (subtle gradients, soft glows)
- [x] Private (offline only, nothing persists)

---

**Implementation complete and ready for testing.**

# Unsent - Visual Design Reference

## Complete Design Specifications

This document details every visual element implemented in the Unsent app.

---

## Color System

### Background Gradient

**Type**: Linear vertical gradient
**Direction**: Top to bottom

```
Top:    #0F1115 (RGB: 15, 17, 21)    - Near-black charcoal
Bottom: #1A1D24 (RGB: 26, 29, 36)    - Soft midnight blue
```

**CSS Equivalent:**
```css
background: linear-gradient(180deg, #0F1115 0%, #1A1D24 100%);
```

### Noise Overlay

**Color**: White (#FFFFFF)
**Opacity**: 2.5%
**Implementation**: 2000 particles, 0.5px radius
**Distribution**: Random (fixed seed 42)
**Purpose**: Prevent flat appearance, add texture

### Text Colors

| Element | Color | Opacity | Hex |
|---------|-------|---------|-----|
| Body text | #E6E6EB | 100% | #E6E6EB |
| App title | White | 80% | #FFFFFF + 80% |
| Empty prompt | White | 40% | #FFFFFF + 40% |
| Closure message | White | 85% | #FFFFFF + 85% |
| Button text | White | 90% | #FFFFFF + 90% |
| Overlay text | White | 70% | #FFFFFF + 70% |

### Accent Colors

**Warm Amber Glow**:
- Primary: #E8A87C (RGB: 232, 168, 124)
- Bright core: #FFB88C (RGB: 255, 184, 140)
- Outer diffuse: #D9956B (RGB: 217, 149, 107)
- Used for: Button glow, release animation glow (multi-layer)
- Opacity ranges: 2% (outer) to 25% (inner core)

**Button Background**:
- Color: Black (#000000)
- Opacity: 40%
- Effect: Translucent dark

---

## Typography

### Font Family
**Primary**: System sans-serif
- Android: Roboto
- Fallback: system default

### Font Weights
- **300** (Light): App title, body text, prompts, messages
- **400** (Regular): Button labels

### Font Sizes & Line Heights

| Element | Size | Line Height | Letter Spacing |
|---------|------|-------------|----------------|
| App title | 16px | 1.0 | 2.0 |
| Body text | 18px | 1.8 | 0 |
| Prompt text | 20px | 1.6 | 0 |
| Closure message | 20px | 1.6 | 0 |
| Button label | 16px | 1.0 | 0.5 |
| Overlay text | 16px | 1.4 | 0 |

---

## Layout & Spacing

### Screen Structure

```
┌─────────────────────────────┐
│         32px                │
│       "Unsent"              │  Title (16px, centered)
│         24px                │
├─────────────────────────────┤
│                             │
│                             │
│    Text Input Area          │  24px horizontal padding
│    (Full height)            │  Gradient fade: 5% top/bottom
│                             │
│                             │
├─────────────────────────────┤
│                             │
│      [Release Button]       │  Centered horizontally
│         48px                │
└─────────────────────────────┘
```

### Padding & Margins

**Horizontal Padding**:
- Text area: 24px
- Closure message: 32px
- Overlay text: 32px

**Vertical Padding**:
- Top margin: 32px (after SafeArea)
- Text field content: 40px top/bottom
- Bottom margin: 48px (before SafeArea)

**Button Spacing**:
- Internal: 16px vertical, 48px horizontal
- External: Centered, 48px from bottom

---

## Text Input Styling

### TextField Configuration

**Appearance**:
- No border
- No underline
- No background
- No container

**Cursor**:
- Color: #E6E6EB
- Width: 1.5px
- Blink rate: Default Flutter (500ms)
- Always visible on launch

**Text Style**:
```dart
fontSize: 18
fontWeight: FontWeight.w300
color: #E6E6EB
height: 1.8
```

### Gradient Mask (Fade Effect)

**Type**: Linear gradient (ShaderMask)
**Direction**: Vertical (top to bottom)

```
Stops:
  0%:  Transparent
  5%:  Opaque (white)
  95%: Opaque (white)
  100%: Transparent
```

**Purpose**: Softly fade text at edges

---

## Button Design

### Pill-Shaped Button Specifications

**Dimensions**:
- Height: Auto (content + padding)
- Width: Auto (content + padding)
- Padding: 16px vertical, 48px horizontal

**Shape**:
- Border radius: 32px (fully rounded pill)
- No borders

**Background**:
- Base color: Black (#000000)
- Opacity: 40%
- Effect: Translucent, shows gradient through

**Text**:
- Size: 16px
- Weight: 400
- Color: White at 90% opacity
- Letter spacing: 0.5

### Glow Effect (BoxShadow)

```dart
BoxShadow(
  color: #E8A87C at 30% opacity,
  blurRadius: 24px,
  spreadRadius: 2px,
  offset: (0, 8px)
)
```

**Characteristics**:
- Soft, feathered edges
- Warm amber tone
- Positioned below button
- Subtle, not overwhelming

### Press Animation

**Scale**:
- Default: 1.0
- Pressed: 0.97
- Duration: 150ms
- Curve: easeInOut

**Behavior**:
- Smooth press down
- Smooth release up
- No overshoot/bounce

---

## Animation Specifications

### 1. Button Fade In/Out

**Duration**: 800ms
**Curve**: easeInOut
**Range**: 0.0 → 1.0

**Trigger**: 
- Fade in: 5 seconds after last keystroke
- Fade out: On text change or release

### 2. Text Disassembly Animation

**Total Duration**: 2800ms (2.8 seconds)

**Character Drift**:
- Direction: Downward (Y-axis)
- Distance: 15-55px (randomized per character)
- Horizontal spread: ±4px (subtle loosening)
- Rotation: ±0.08 radians (very subtle)
- Curve: slowMiddle (natural motion)
- Stagger: 0-250ms delay per character

**Opacity Fade**:
- Range: 1.0 → 0.85 → 0.15 → 0.0 (3 stages)
- Curve: easeInCubic with multi-stage timing
- Blur effect simulation as opacity decreases

**Spacing**:
- Characters loosen with horizontal drift
- Very subtle rotation for organic feel
- Natural spreading motion

### 3. Warm Glow Animation

**Duration**: 2800ms (synchronized with text)
**Type**: Radial gradient from bottom center

**Intensity Curve** (4-stage organic breathing):
```
0ms:    0%    (invisible)
420ms:  25%   (initial rise)
1120ms: 70%   (peak bloom)
1680ms: 55%   (slight settle)
2800ms: 35%   (gentle fade)
```

**Multi-Layer Glow**:
- Outer layer: #E8A87C → #D9956B, radius × 1.2
- Middle layer: #E8A87C, radius × 0.85
- Inner core: #FFB88C → #E8A87C, radius × 0.5
- Color wash: Linear gradient for background warmth

**Dynamic Radius**: 0.8 → 1.8 → 1.5 (expands then settles)
**Blend**: Multi-stop gradients for natural falloff

### 4. Closure Message Fade In

**Duration**: 1000ms
**Curve**: easeIn
**Range**: 0.0 → 1.0
**Delay**: After release animation completes

### 5. Overlay Text (Back Button Warning)

**Total Duration**: 2000ms

**Sequence**:
```
0-500ms:    Fade in  (0 → 1)
500-1500ms: Hold     (1 → 1)
1500-2000ms: Fade out (1 → 0)
```

**Curve**: easeInOut for both transitions

---

## State-Specific Layouts

### State 1: Empty

**Visible Elements**:
- App title (top)
- Prompt text (center):
  ```
  Write it.
  No one will read it.
  ```
- Text cursor (blinking)
- Keyboard (open)

**Hidden Elements**:
- Release button
- Text content

### State 2: Writing

**Visible Elements**:
- App title (top)
- User's text
- Text cursor

**Hidden Elements**:
- Prompt text (disappears on first keystroke)
- Release button (hidden until pause)

### State 3: Paused

**Visible Elements**:
- App title (top)
- User's text
- Text cursor
- Release button (faded in)

**Interaction**:
- Any keystroke → return to Writing state
- Release tap → transition to Releasing

### State 4: Releasing

**Visible Elements**:
- App title (top)
- Disassembling text (animating)
- Warm glow (animating)

**Hidden Elements**:
- Release button (faded out)
- Keyboard (dismissed)

**Duration**: 2.8 seconds

### State 5: Released

**Visible Elements**:
- App title (top)
- Closure message:
  ```
  You don't have to carry that anymore.
  ```
- Write Again button

**Hidden Elements**:
- Text content (fully disappeared)
- Warm glow (settled to subtle)

---

## Gesture Interactions

### 1. Long Press (Empty Screen)

**Trigger**: Long press on empty space
**Duration**: Default (500ms)
**Action**: Instant text clear
**Visual**: No feedback (instant)

### 2. Swipe Down

**Trigger**: Vertical drag down gesture
**Action**: Dismiss keyboard
**Visual**: Keyboard slides down (system)

### 3. Back Button

**Trigger**: Android back button press
**Condition**: Text field not empty
**Action**: Show overlay "Nothing is saved."
**Duration**: 2 seconds
**Result**: Prevent back navigation

### 4. Button Press

**Trigger**: Tap on button
**Visual**: Scale to 0.97
**Duration**: 150ms
**Curve**: easeInOut

---

## Emotional Design Principles

### Quiet
- Minimal text
- Soft colors (muted palette)
- No bright accents
- Generous white space
- Subtle animations

### Heavy (Emotional Weight)
- Slow animation timing (2.8s)
- Deliberate pacing
- No quick movements
- Weighty interactions
- Thoughtful transitions

### Safe
- No tracking
- No saving
- No external connections
- Private by design
- No data collection

### Premium
- Smooth gradients
- Soft glows
- Polished animations
- Attention to detail
- High-quality typography

### Private
- Single user
- Offline only
- Ephemeral content
- No sharing
- No accounts

---

## Performance Targets

### Frame Rate
- Target: 60 FPS
- Minimum: 50 FPS (acceptable during complex animations)
- Method: Hardware-accelerated rendering

### Animation Performance
- Use Tween animations (GPU-accelerated)
- Avoid layout changes during animation
- Use AnimatedBuilder for isolated rebuilds
- Positioned widgets for transforms

### Memory
- Dispose all controllers
- Clear character list after animation
- No persistent state
- Minimal memory footprint

---

## Accessibility Considerations

### Future Enhancements
- VoiceOver/TalkBack support
- Dynamic text sizing
- High contrast mode
- Reduced motion option

### Current Implementation
- Readable font sizes (18-20px)
- High contrast text (#E6E6EB on dark)
- Clear interactive elements
- Tactile feedback (scale animation)

---

## Platform-Specific Notes

### Android
- Uses Roboto font (system default)
- Respects system animations
- Handles soft keyboard properly
- Immersive mode (hides navigation)

### Screen Compatibility
- Minimum: 360x640 (small phone)
- Maximum: 1440x3120 (large phone)
- Responsive: Adapts to all sizes
- Orientation: Portrait only

---

## Visual Hierarchy

### Priority Levels

**Level 1 (Primary Focus)**:
- Text input area
- User's written text

**Level 2 (Secondary)**:
- Release/Write Again buttons
- Closure message

**Level 3 (Tertiary)**:
- App title
- Prompt text

**Level 4 (Background)**:
- Gradient
- Noise texture
- Warm glow

---

## Implementation Notes

### Gradient Rendering
- Uses CustomPainter for efficiency
- Single paint operation
- No overdraw
- GPU-accelerated

### Text Masking
- ShaderMask widget
- Linear gradient shader
- Applied to text area only
- No performance impact

### Button Glow
- BoxShadow (native shadow)
- Soft blur (24px)
- Positioned offset (0, 8px)
- Color: Warm amber

### Animation Controllers
- Four separate controllers
- Independent timing
- Synchronized where needed
- Proper disposal pattern

---

## Quality Checklist

Visual Polish:
- [x] Gradient smooth and deep
- [x] Noise subtle and unnoticeable
- [x] Text readable at all sizes
- [x] Buttons have tactile feel
- [x] Animations feel natural
- [x] Colors match exact specifications
- [x] Typography is clean and light
- [x] Spacing is generous and breathable

Emotional Tone:
- [x] Feels quiet and calm
- [x] Has emotional weight
- [x] Communicates safety
- [x] Appears premium
- [x] Maintains privacy

Technical:
- [x] Renders at 60 FPS
- [x] No memory leaks
- [x] Proper state management
- [x] Clean code architecture
- [x] Well-commented

---

**This design reference matches the implementation in `lib/main.dart` exactly.**

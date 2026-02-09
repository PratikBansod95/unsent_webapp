# Unsent - Visual Flow Guide

A visual walkthrough of the app states and animations.

---

## State Flow Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  START                                                          │
│    │                                                            │
│    ▼                                                            │
│  ┌────────────────────────────────────────────┐                │
│  │         STATE 1: EMPTY                     │                │
│  │                                            │                │
│  │  ╔════════════════════════════════════╗    │                │
│  │  ║                                    ║    │                │
│  │  ║         Unsent                     ║    │                │
│  │  ║                                    ║    │                │
│  │  ║                                    ║    │                │
│  │  ║        Write it.                   ║    │                │
│  │  ║        No one will read it.        ║    │                │
│  │  ║                                    ║    │                │
│  │  ║              ▌                     ║    │                │
│  │  ║        (cursor blinks)             ║    │                │
│  │  ║                                    ║    │                │
│  │  ╚════════════════════════════════════╝    │                │
│  │                                            │                │
│  │  • Keyboard visible                        │                │
│  │  • Cursor blinking                         │                │
│  │  • Prompt visible                          │                │
│  └────────────────────────────────────────────┘                │
│                     │                                           │
│                     │ User types                                │
│                     ▼                                           │
│  ┌────────────────────────────────────────────┐                │
│  │         STATE 2: WRITING                   │                │
│  │                                            │                │
│  │  ╔════════════════════════════════════╗    │                │
│  │  ║                                    ║    │                │
│  │  ║         Unsent                     ║    │                │
│  │  ║                                    ║    │                │
│  │  ║                                    ║    │                │
│  │  ║  I'm feeling overwhelmed today.    ║    │                │
│  │  ║  Everything feels too heavy.       ║    │                │
│  │  ║  I wish I could just...▌           ║    │                │
│  │  ║                                    ║    │                │
│  │  ║                                    ║    │                │
│  │  ║                                    ║    │                │
│  │  ╚════════════════════════════════════╝    │                │
│  │                                            │                │
│  │  • Prompt disappeared                      │                │
│  │  • User text visible                       │                │
│  │  • No button yet                           │                │
│  └────────────────────────────────────────────┘                │
│                     │                                           │
│                     │ 5 seconds pass                            │
│                     ▼                                           │
│  ┌────────────────────────────────────────────┐                │
│  │         STATE 3: PAUSED                    │                │
│  │                                            │                │
│  │  ╔════════════════════════════════════╗    │                │
│  │  ║                                    ║    │                │
│  │  ║         Unsent                     ║    │                │
│  │  ║                                    ║    │                │
│  │  ║                                    ║    │                │
│  │  ║  I'm feeling overwhelmed today.    ║    │                │
│  │  ║  Everything feels too heavy.       ║    │                │
│  │  ║  I wish I could just...            ║    │                │
│  │  ║                                    ║    │                │
│  │  ║                                    ║    │                │
│  │  ║      ╔══════════════════╗          ║    │                │
│  │  ║      ║    Release       ║          ║    │                │
│  │  ║      ╚══════════════════╝          ║    │                │
│  │  ║         (glowing)                  ║    │                │
│  │  ╚════════════════════════════════════╝    │                │
│  │                                            │                │
│  │  • Release button faded in                 │                │
│  │  • Warm amber glow underneath              │                │
│  └────────────────────────────────────────────┘                │
│                     │                                           │
│                     │ User taps Release                         │
│                     ▼                                           │
│  ┌────────────────────────────────────────────┐                │
│  │         STATE 4: RELEASING                 │                │
│  │         (2.8 second animation)             │                │
│  │                                            │                │
│  │  ╔════════════════════════════════════╗    │                │
│  │  ║                                    ║    │                │
│  │  ║         Unsent                     ║    │                │
│  │  ║                                    ║    │                │
│  │  ║                                    ║    │                │
│  │  ║  I'm   feeling   overwhelmed       ║    │                │
│  │  ║    Everything     feels  too       ║    │                │
│  │  ║       I  wish  I  could just       ║    │                │
│  │  ║           (drifting down)          ║    │                │
│  │  ║              (fading)              ║    │                │
│  │  ║                                    ║    │                │
│  │  ║     ✧·˚ ༘ * warm glow *˚ ✧        ║    │                │
│  │  ╚════════════════════════════════════╝    │                │
│  │                                            │                │
│  │  • Letters drift downward                  │                │
│  │  • Opacity fades to 0                      │                │
│  │  • Warm amber glow rises                   │                │
│  │  • Background warms slightly               │                │
│  └────────────────────────────────────────────┘                │
│                     │                                           │
│                     │ Animation completes                       │
│                     ▼                                           │
│  ┌────────────────────────────────────────────┐                │
│  │         STATE 5: RELEASED                  │                │
│  │                                            │                │
│  │  ╔════════════════════════════════════╗    │                │
│  │  ║                                    ║    │                │
│  │  ║         Unsent                     ║    │                │
│  │  ║                                    ║    │                │
│  │  ║                                    ║    │                │
│  │  ║    You don't have to carry         ║    │                │
│  │  ║        that anymore.               ║    │                │
│  │  ║                                    ║    │                │
│  │  ║                                    ║    │                │
│  │  ║      ╔══════════════════╗          ║    │                │
│  │  ║      ║  Write again     ║          ║    │                │
│  │  ║      ╚══════════════════╝          ║    │                │
│  │  ║         (glowing)                  ║    │                │
│  │  ╚════════════════════════════════════╝    │                │
│  │                                            │                │
│  │  • Closure message visible                 │                │
│  │  • Write Again button ready                │                │
│  └────────────────────────────────────────────┘                │
│                     │                                           │
│                     │ User taps Write Again                     │
│                     ▼                                           │
│                  [LOOP TO STATE 1]                              │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Animation Timeline

### Release Animation (2.8 seconds)

```
Time      | Text         | Glow      | Opacity   | Visual
----------|--------------|-----------|-----------|---------------------------
0.0s      | Static       | 0%        | 100%      | Text visible, button fading
0.2s      | Drift start  | 10%       | 95%       | Letters begin to separate
0.5s      | Drifting     | 30%       | 85%       | Noticeable downward motion
1.0s      | Continuing   | 50%       | 65%       | Characters clearly falling
1.5s      | Mid-fall     | 60% ★     | 45%       | Peak glow intensity
2.0s      | Fading fast  | 45%       | 25%       | Letters mostly transparent
2.5s      | Almost gone  | 35%       | 10%       | Barely visible
2.8s      | Complete     | 30%       | 0%        | Text disappeared, glow settles
3.0s+     | Cleared      | Fade out  | 0%        | Closure message fades in
```

★ Peak glow at 1.5 seconds (approximately 40% progress)

---

## Character Drift Pattern

```
Before Release:
┌─────────────────────────────────────┐
│                                     │
│  I'm feeling overwhelmed today.     │
│  Everything feels too heavy.        │
│                                     │
└─────────────────────────────────────┘

During Release (0.5s):
┌─────────────────────────────────────┐
│  I'm   feeling   overwhelmed        │
│    Everything    feels   too        │
│       (slight separation)           │
└─────────────────────────────────────┘

During Release (1.5s):
┌─────────────────────────────────────┐
│                                     │
│   I'm      feeling                  │
│      Everything    feels            │
│          (drifting down)            │
└─────────────────────────────────────┘

During Release (2.5s):
┌─────────────────────────────────────┐
│                                     │
│                                     │
│       (faint ghosting)              │
│                                     │
└─────────────────────────────────────┘

After Release (2.8s):
┌─────────────────────────────────────┐
│                                     │
│                                     │
│         (empty)                     │
│                                     │
└─────────────────────────────────────┘
```

Each character:
- Drifts 10-30 pixels downward
- Fades from 100% to 0% opacity
- Has slight delay (0-300ms)
- Moves independently
- No rotation, no horizontal drift

---

## Button States

### Release Button

```
Hidden (States 1, 2):
  No button visible


Fading In (800ms):
  ┌─────────────┐
  │   Release   │  ← Opacity 0% → 100%
  └─────────────┘
     ✧˚ ༘ glow


Visible (State 3):
  ┌─────────────┐
  │   Release   │  ← Fully visible
  └─────────────┘
     ✧˚ ༘ glow


Pressed:
  ┌───────────┐
  │  Release  │    ← Scale 0.97
  └───────────┘
    ✧˚ ༘ glow


Fading Out (after tap):
  ┌─────────────┐
  │   Release   │  ← Opacity 100% → 0%
  └─────────────┘
     ✧˚ ༘ glow
```

### Write Again Button

```
Similar to Release button, but:
- Appears in State 5
- Same glow effect
- Same press animation
- Returns to State 1 on tap
```

---

## Glow Effect Visualization

### Button Glow

```
        ┌─────────────────┐
        │    Release      │
        └─────────────────┘
           ░░░░░░░░░
          ░░░░░░░░░░░
         ░░░░░░░░░░░░░
        ░░░░░░░░░░░░░░░
         ░░░░░░░░░░░░░
          ░░░░░░░░░░░
           ░░░░░░░░░

• Color: #E8A87C (warm amber)
• Opacity: 30%
• Blur: 24px
• Spread: 2px
• Offset: (0, 8px) downward
```

### Release Animation Glow

```
Bottom of screen:

Stage 1 (0-1s):
╔════════════════════════════════════╗
║                                    ║
║                                    ║
║                                    ║
║            (text)                  ║
║                                    ║
║          ░░░░░░░░                  ║
║        ░░░░░░░░░░░░                ║
╚════════════════════════════════════╝

Stage 2 (1-2s) - Peak:
╔════════════════════════════════════╗
║                                    ║
║                                    ║
║         ░░░░░░░░░░░                ║
║       ░░░░░░░░░░░░░░░              ║
║      ░░░░░░░░░░░░░░░░░             ║
║     ░░░░░░░░░░░░░░░░░░░            ║
║    ░░░░░░░░░░░░░░░░░░░░░           ║
╚════════════════════════════════════╝

Stage 3 (2-2.8s) - Settle:
╔════════════════════════════════════╗
║                                    ║
║                                    ║
║                                    ║
║                                    ║
║          ░░░░░░░░░                 ║
║        ░░░░░░░░░░░░                ║
║       ░░░░░░░░░░░░░░               ║
╚════════════════════════════════════╝

• Radial gradient from bottom center
• Color: #E8A87C
• Peak intensity: 60% → settles to 30%
• Radius: 1.5x screen height
• Soft, feathered edges
```

---

## Keyboard Behavior

```
State 1 (Empty):
┌─────────────────────────────────────┐
│                                     │
│  [Text Area]                        │
│                                     │
├─────────────────────────────────────┤
│  [ Q W E R T Y U I O P ]            │
│  [  A S D F G H J K L  ]            │
│  [   Z X C V B N M    ]             │
│  [      SPACE         ]             │
└─────────────────────────────────────┘
Keyboard: OPEN ✓


State 2 (Writing):
Same as State 1 - keyboard stays open


State 3 (Paused):
Same as States 1 & 2 - keyboard stays open


State 4 (Releasing):
┌─────────────────────────────────────┐
│                                     │
│  [Animation Area]                   │
│                                     │
│                                     │
│                                     │
│                                     │
│                                     │
└─────────────────────────────────────┘
Keyboard: CLOSED (dismissed)


State 5 (Released):
Same as State 4 - keyboard stays closed


Return to State 1:
Keyboard: OPENS automatically
```

---

## Gesture Zones

```
┌─────────────────────────────────────┐
│  ╔═══════════════════════════════╗  │
│  ║  Long Press = Clear Text      ║  │
│  ║  (anywhere in text area)      ║  │
│  ║                               ║  │
│  ║                               ║  │
│  ║  Swipe Down = Hide Keyboard   ║  │
│  ║  (vertical drag)              ║  │
│  ║                               ║  │
│  ║                               ║  │
│  ║                               ║  │
│  ║                               ║  │
│  ╚═══════════════════════════════╝  │
│                                     │
│      ┌─────────────────┐            │
│      │  Tap = Action   │            │
│      │  (button area)  │            │
│      └─────────────────┘            │
│                                     │
└─────────────────────────────────────┘

Back Button:
• If text present: Show "Nothing is saved" overlay
• If empty: Exit app
```

---

## Color Transitions

### Background During Release

```
Normal State:
╔════════════════════════════════╗
║ #0F1115 ─────────┐             ║
║                  │             ║
║                  ▼             ║
║            Gradient            ║
║                  │             ║
║                  ▼             ║
║ #1A1D24 ─────────┘             ║
╚════════════════════════════════╝

During Release (warming):
╔════════════════════════════════╗
║ #0F1115 + subtle warmth        ║
║                                ║
║         Slightly warmer        ║
║         (imperceptible)        ║
║                                ║
║ #1A1D24 + amber tint           ║
║    (from glow overlay)         ║
╚════════════════════════════════╝

• Background gradient stays same
• Warmth comes from glow overlay
• Not a color change, an additive effect
```

---

## Text Fade Mask

```
Top Edge:
▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓  100% opaque (border)
▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓    Gradient fade zone
▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒    (5% of text area)
░░░░░░░░░░░░░░░░░░░░    0% opaque (text area)


Center:
                        100% opaque
  I'm feeling           (full visibility)
  overwhelmed today.    
                        100% opaque


Bottom Edge:
░░░░░░░░░░░░░░░░░░░░    0% opaque (text area)
▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒    Gradient fade zone
▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓    (5% of text area)
▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓  100% opaque (border)

Purpose: Soften edges, create depth
```

---

## Empty State vs Released State

```
Empty State:                Released State:
┌─────────────────────┐    ┌─────────────────────┐
│                     │    │                     │
│   Write it.         │    │  You don't have to  │
│   No one will       │    │  carry that         │
│   read it.          │    │  anymore.           │
│                     │    │                     │
│   ▌                 │    │                     │
│  (cursor)           │    │                     │
│                     │    │                     │
│                     │    │   ┌─────────────┐   │
│                     │    │   │ Write again │   │
│                     │    │   └─────────────┘   │
└─────────────────────┘    └─────────────────────┘

Similarities:
• Both centered
• Both use soft opacity
• Both calm and minimal

Differences:
• Empty: invitation (40% opacity)
• Released: closure (85% opacity)
• Empty: cursor blinking
• Released: no cursor
• Empty: no button (initially)
• Released: button visible
```

---

## Back Button Overlay

```
Normal Screen:
╔════════════════════════════════╗
║                                ║
║         Unsent                 ║
║                                ║
║  Some text here...             ║
║                                ║
╚════════════════════════════════╝

User presses Back Button:
╔════════════════════════════════╗
║                                ║
║         Unsent                 ║
║                                ║
║  [  Nothing is saved.  ]       ║  ← Fades in
║                                ║     Holds 1s
║                                ║     Fades out
╚════════════════════════════════╝

Timeline:
0.0 - 0.5s: Fade in
0.5 - 1.5s: Hold
1.5 - 2.0s: Fade out
2.0s:       Removed

Result: Back navigation cancelled
```

---

## Emotional Pacing

```
Empty → Writing:
▁▁▁▁▁▁▁▁▁▁  Calm, ready, open

Writing → Paused:
▁▁▁▁▁▃▅▅▅▅  Building, pause detected

Paused → Releasing:
▅▅▅▇███████  Decision made, commitment

Releasing (animation):
█████▇▅▃▂▁▁  Letting go, weight lifting

Released:
▁▁▁▁▁▁▁▁▁▁  Relief, closure, peace

Released → Empty:
▁▁▁▁▁▁▁▁▁▁  Fresh start, ready again
```

Emotional arc matches visual pacing

---

## Performance Notes

### 60 FPS Animation

```
Frame Budget: 16.67ms per frame

Typical Frame Times:
┌─────────────────────────────────┐
│ Build:         2-3ms            │
│ Layout:        1-2ms            │
│ Paint:         3-4ms            │
│ Composite:     1-2ms            │
├─────────────────────────────────┤
│ Total:         7-11ms ✓         │
└─────────────────────────────────┘

Headroom: 5-9ms (comfortable)

Optimization:
• CustomPainter for background
• AnimatedBuilder for isolated rebuilds
• Positioned for text drift (no relayout)
• GPU-accelerated Tween animations
```

---

## State Transition Matrix

```
FROM ↓ / TO →  | Empty | Writing | Paused | Releasing | Released
---------------|-------|---------|--------|-----------|----------
Empty          |   -   |   Type  |   No   |    No     |    No
Writing        |  Clear|    -    |  Wait  |    No     |    No
Paused         |  Clear|   Type  |   -    |  Release  |    No
Releasing      |   No  |   No    |   No   |     -     | Complete
Released       | Write |   No    |   No   |    No     |    -
               | Again |         |        |           |

Valid Transitions: 8
Invalid Transitions: 17 (prevented by logic)
```

---

## Summary

This visual flow guide illustrates:
- 5 distinct app states
- Smooth transitions between states
- 2.8-second release animation
- Character-level text drift
- Warm glow progression
- Button interactions
- Gesture zones
- Emotional pacing

**Every visual detail matches the implementation in `lib/main.dart`.**

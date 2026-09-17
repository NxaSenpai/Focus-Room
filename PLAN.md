# Focus Room — Product & UI/UX Specification

## 1. Product Vision

Focus Room is a highly customizable, distraction-free productivity
workspace designed around one idea:

> Your workspace should adapt to the way you focus.

Instead of being only a Pomodoro timer, Focus Room combines:

- Focus timer
- Tasks and priorities
- Ambient soundscapes
- Personalized themes
- Daily planning
- Focus statistics
- Quotes
- Notes
- Goals
- Customizable widgets
- Focus rituals
- Responsive workspace layouts

The application should feel calm, personal, premium, and extremely fast.

The user should be able to open Focus Room and start focusing within
5 seconds.

---

# 2. Core UX Principles

## 2.1 Focus First

The timer is always the most important element.

Never make the user navigate through multiple pages just to start focusing.

Ideal flow:

Open Focus Room
        ↓
See current task
        ↓
Press Start
        ↓
Focus

One click should be enough.

---

## 2.2 No Page Scrolling on Desktop

The main workspace should fit inside:

100dvh

Desktop layout should behave like an application, not a website.

Instead of:

Timer
↓
Tasks
↓
Stats
↓
Sounds
↓
Settings

Use:

                 WORKSPACE

 Tasks             TIMER            Widgets
   │                 │                 │
   │               25:00               │
   │                 │                 │
   └─────────────────┴─────────────────┘

Extra information opens through:

- drawers
- floating panels
- modals
- popovers
- tabs

Individual panels may scroll internally.

---

# 3. Main Workspace

Example desktop layout:

┌──────────────────────────────────────────────────────────────┐
│ ◉ Focus Room      Focus   Ambient          21:32     ⚙  ⛶  │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│             "Protect your attention."                        │
│                                                              │
│                   🔥 Finish Portfolio                        │
│                                                              │
│              Focus     Break     Stopwatch                    │
│                                                              │
│                         24:32                                │
│                                                              │
│                     [ PAUSE ]                                │
│                                                              │
│                     ↻        ⛶                               │
│                                                              │
│              🌧 45%   ☕ 20%   🔥 10%                        │
│                                                              │
│                                                              │
│  ✓ Tasks                                         Goal  3/4   │
│                                                              │
│  [ Tasks ] [ Sounds ] [ Stats ] [ Theme ] [ Customize ]     │
└──────────────────────────────────────────────────────────────┘

The center should remain visually calm.

Avoid filling the screen with controls.

Controls appear when needed.

---

# 4. Timer System

## Modes

Support:

### Pomodoro

Focus → Break → Focus → Break

Example:

25 focus
5 break
25 focus
5 break
25 focus
5 break
25 focus
15 long break

### Countdown

User chooses any duration.

Examples:

10 min
30 min
45 min
90 min

### Stopwatch

Starts at:

00:00

and counts upward.

Useful when the user doesn't know how long a task will take.

---

# 5. Custom Timer Presets

Default:

15
25
45
60

But allow custom presets.

Example:

Deep Work
50 min

Study
45 min

Quick Focus
15 min

Coding
90 min

Reading
30 min

Users can create:

+ New Preset

Preset:

Name
[ Deep Coding ]

Focus
[ 90 ] minutes

Break
[ 15 ] minutes

Icon
[ 💻 ]

Color
[ Purple ]

---

# 6. Timer Appearance

Let users customize how the timer looks.

Timer Style:

Digital
25:00

Minimal
25
min

Circular
   ◜──────◝
  │ 25:00 │
   ◟──────◞

Progress Ring
◉ 25:00

Flip Clock
┌────┐ ┌────┐
│ 25 │:│ 00 │
└────┘ └────┘

Users can select:

Timer size

Small
Medium
Large
Huge

Show seconds:

ON / OFF

Show progress ring:

ON / OFF

---

# 7. Active Task

The active task should appear near the timer.

Example:

🔥 Finish portfolio website
2 sessions estimated

Users can click it to change the current focus.

During focus mode:

                🔥 Finish portfolio

                       18:42

The application therefore constantly reminds the user:

"What am I focusing on?"

without showing the entire task list.

---

# 8. Advanced Tasks

Task structure:

Task
├── Title
├── Emoji
├── Priority
├── Estimated sessions
├── Completed sessions
├── Notes
├── Category
├── Due date
└── Completed

Example:

🔥 Finish Portfolio

High Priority
Development

Estimated
🍅 🍅 🍅

Completed
🍅 🍅

Due
Today

---

# 9. Task Priorities

Priority:

🔴 High
🟡 Medium
🟢 Low

Do not cover the interface with bright priority colors.

Use small indicators.

Example:

● Finish portfolio
● Read documentation
● Watch React course

---

# 10. Task Categories

Users can create categories.

Examples:

💻 Development
📚 Study
💼 Work
🎨 Design
🏠 Personal

Filtering:

All | Work | Study | Personal

---

# 11. Quick Task Creation

Task creation should be extremely fast.

Press:

N

or:

Ctrl + K → "Add Task"

Quick input:

┌─────────────────────────────────────┐
│ What are you working on?            │
│                                     │
│ Finish authentication               │
│                                     │
│ Priority   Medium                    │
│ Estimate   2 sessions               │
│                                     │
│                         Add Task ↵   │
└─────────────────────────────────────┘

The title should be the only required field.

Everything else is optional.

---

# 12. Command Palette

Add:

Ctrl + K

or

Cmd + K

Open:

┌─────────────────────────────────────────┐
│ 🔍 What would you like to do?           │
├─────────────────────────────────────────┤
│                                         │
│ ▶ Start focus                           │
│ + Add task                              │
│ 🌧 Play rain                            │
│ 🎨 Change theme                         │
│ ⛶ Enter fullscreen                     │
│ 📊 View statistics                      │
│ 🌙 Switch to dark theme                 │
│                                         │
└─────────────────────────────────────────┘

This makes Focus Room feel like a professional productivity application.

---

# 13. Themes

Themes should be one of the strongest parts of Focus Room.

Theme categories:

Minimal
Nature
City
Cozy
Space
Abstract
Anime-inspired original artwork
Gradient

Examples:

Midnight
Aurora
Mountain
Rainy Tokyo
Coffee Shop
Ocean
Forest
Sunset
Deep Space
Minimal Black
Minimal White
Lavender
Cyber Night

---

# 14. Custom Background

Allow:

Built-in image
Gradient
Solid color
Custom image URL
Uploaded image

Customization:

Background blur

0 ─────────●──── 100

Brightness

0 ──────●─────── 100

Overlay

0 ─────────●──── 100

Saturation

0 ───────●────── 100

This allows the same background to look dramatically different.

---

# 15. Dynamic Background

Optional future feature.

Background can subtly change based on state.

Ready:

Bright environment

Focusing:

Slightly darker
Reduced saturation
Reduced movement

Break:

Warmer
Brighter

This visually tells the brain:

"I'm focusing now."

---

# 16. Accent Colors

Allow:

Emerald
Blue
Purple
Pink
Orange
Red
Cyan
Yellow

And:

Custom Accent

Color picker:

#8B5CF6

Accent should affect:

- buttons
- progress
- active controls
- selected task
- timer ring
- small highlights

It should NOT recolor the entire interface.

---

# 17. Glass Customization

Allow users to customize panels.

Panel style:

Glass
Solid
Transparent
Minimal

Glass intensity:

Low
Medium
High

Example:

background: rgba(...)
backdrop-blur
border opacity

This allows users to create very different workspace styles.

---

# 18. Widget System

Users choose what appears on their dashboard.

Widgets:

Timer
Clock
Tasks
Current Task
Daily Goal
Quote
Weather
Sounds
Focus Stats
Calendar
Notes
Streak
Greeting

Each widget:

Show / Hide

Later:

Drag and reposition widgets.

---

# 19. Focus Mode

Press:

F

or:

Start Focus

The interface transitions into Focus Mode.

Before:

Tasks
Clock
Quote
Weather
Stats
Sounds
Timer

After:

             Finish Portfolio

                  24:52

                  Pause

Everything unnecessary fades away.

This should be one of the best interactions in the app.

---

# 20. Zen Mode

Even more minimal than Focus Mode.

Example:

                  18:23

That's it.

Move the mouse:

                 18:23

             Pause    Exit

After a few seconds, controls fade again.

Perfect for fullscreen focusing.

---

# 21. Fullscreen Mode

Button:

⛶

or keyboard:

F11 / custom shortcut

Fullscreen should remove almost everything.

Useful for:

Studying
Coding
Reading
Writing

---

# 22. Ambient Soundscape

Do NOT use:

Rain OR Cafe OR Forest

Instead allow mixing.

Example:

Rain
████████████░░░ 65%

Cafe
████░░░░░░░░░░░ 20%

Fireplace
██████░░░░░░░░░ 30%

Users create their own environment.

---

# 23. Sound Library

Nature:

🌧 Rain
⛈ Thunder
🌊 Ocean
🌲 Forest
💨 Wind
🐦 Birds
🏞 River

Cozy:

🔥 Fireplace
☕ Cafe
📖 Library
⌨ Keyboard
🕰 Clock

Noise:

White Noise
Brown Noise
Pink Noise

Music:

Lo-fi
Piano
Ambient

Only use audio that you have the rights to distribute.

---

# 24. Sound Presets

Users can save mixes.

Example:

"Rainy Coding"

Rain       65%
Keyboard   20%
Thunder    10%

"Coffee Study"

Cafe       50%
Rain       20%
Piano      15%

"Sleepy Reading"

Fireplace  50%
Rain       30%

Then users can switch environments instantly.

---

# 25. Quick Sound Control

Do not force users to open Settings.

Bottom floating controller:

🌧  ☕  🔥  🌲     🔊 ━━━●━━

Click sound:

ON/OFF

Right click / long press:

Volume

---

# 26. Quotes

Display optional motivational quotes.

Example:

"Protect your attention."

"One focused session at a time."

"Progress doesn't need to be loud."

Allow categories:

Motivation
Calm
Stoicism
Study
Creativity
Minimal

Controls:

Show quotes
Hide quotes
Change every session
Change every day

---

# 27. Personal Greeting

Optional:

Good morning, Nakry.

Ready for another session?

or simply:

Good evening.

Users can choose:

Greeting ON/OFF

Name:
[ Nakry ]

Do not force personalization.

---

# 28. Clock

Clock formats:

12 hour
7:42 PM

24 hour
19:42

Analog

Hidden

Optional date:

Monday, September 7

---

# 29. Daily Goal

Example:

Today's Focus

██████████████░░░░

3 / 4 sessions

or:

1h 15m / 2h

Allow goal type:

Sessions

OR

Minutes

Example:

Goal:
120 minutes

instead of:

4 Pomodoros

This is much more flexible.

---

# 30. Daily Planning

When opening Focus Room for the first time each day:

Good morning.

What matters today?

[ + Add priority ]

Today's focus goal:

[ 2 hours ]

                     Start Day

Keep this optional.

Users should be able to disable it.

---

# 31. Focus Ritual

Optional pre-session ritual.

When Start is pressed:

Ready?

Today's focus:
🔥 Finish Portfolio

Duration:
45 minutes

☑ Phone away
☑ Notifications off
☑ Water ready

          Begin Focus

Users can disable this entirely.

---

# 32. Session Completion

Do NOT simply reset the timer.

Give satisfying feedback.

Example:

               ✓

         Session complete

          45 minutes
      Finish Portfolio

        Great work.

   [ Take Break ] [ Continue ]

Use:

subtle animation
soft sound
small confetti

Never make it loud or annoying.

---

# 33. Break Experience

Break mode should visually change.

Example:

              Break

               04:32

        Stand up. Breathe.

          [ Skip Break ]

Background could become slightly brighter.

Sounds could automatically change.

Example:

Focus:
Brown noise

Break:
Birds + forest

---

# 34. Statistics

Dashboard:

TODAY

Focus
2h 15m

Sessions
4

Tasks
5 / 7

Goal
90%

Streak
🔥 6 days

---

# 35. Weekly Statistics

Example:

Focus Time

3h │
   │          █
2h │    █     █
   │ █  █  █  █
1h │ █  █  █  █  █
   │ █  █  █  █  █  █
   └──────────────────
     M  T  W  T  F  S  S

This week:

11h 35m focused
24 sessions
18 tasks completed

---

# 36. Focus Streak

Example:

🔥 7 day streak

But avoid making the product stressful.

If the user misses one day, do not use language like:

"You lost your streak!"

Use:

Welcome back.

Ready to focus?

Focus Room should encourage users rather than punish them.

---

# 37. Focus Heatmap

Later add:

        SEPTEMBER

Mon  ░ ░ █ ▓ █ ░ █
Tue  █ █ ▓ █ █ █ ░
Wed  ░ █ █ █ ▓ █ █
...

Similar concept to a contribution graph.

More focus:

darker/more intense square.

---

# 38. Notes Widget

Simple scratchpad:

Notes

Remember to:
- Fix navbar
- Update README
- Screenshot homepage

Autosaved.

Do NOT turn this into Notion.

It is only temporary focus notes.

---

# 39. Session Notes

After a session:

What did you accomplish?

[ Finished login UI and validation. ]

Save

This creates useful history:

14:00 – 14:45
Finish Portfolio

"Finished login UI and validation."

---

# 40. Keyboard Shortcuts

Essential for productivity users.

Space
Start / Pause

R
Reset

N
New task

T
Tasks

S
Sounds

G
Stats

F
Focus mode

Z
Zen mode

Ctrl/Cmd + K
Command palette

Esc
Close panel

?

Shortcut help

---

# 41. Responsive Design Strategy

Focus Room should NOT simply shrink the desktop interface.

Each device should get an interface designed for its size.

---

# 42. Large Desktop

1440px+

Layout:

Tasks          Focus Area          Widgets
280px             flexible          300px

Everything can be visible.

Example:

┌──────────┬──────────────────────┬──────────┐
│ Tasks    │                      │ Progress │
│          │        25:00         │          │
│          │                      │ Sounds   │
│          │        Start         │          │
│          │                      │ Goal     │
└──────────┴──────────────────────┴──────────┘

---

# 43. Laptop

1024–1439px

Hide permanent right sidebar.

Layout:

Tasks               Focus
280px                flexible

Stats/sounds/themes become floating panels.

---

# 44. Tablet

768–1023px

Timer owns most of the screen.

Use floating navigation:

[ Tasks ] [ Focus ] [ Sounds ] [ More ]

Panels slide from sides/bottom.

---

# 45. Mobile

Below 768px.

Do NOT copy desktop layout.

Main screen:

┌───────────────────────┐
│ Focus Room        ⚙   │
│                       │
│ Finish Portfolio      │
│                       │
│        24:32          │
│                       │
│     [ Pause ]         │
│                       │
│ 🌧 Rain        3 / 4 │
│                       │
├───────────────────────┤
│ ✓     ◉     ♪     ••• │
│Tasks Focus Sounds More│
└───────────────────────┘

No page scrolling required for the main timer.

---

# 46. Mobile Bottom Sheets

Click Tasks:

┌───────────────────────┐
│                       │
│       TIMER           │
│                       │
├───────────────────────┤
│ ━━━━━                 │
│ Tasks                 │
│                       │
│ ○ Portfolio           │
│ ✓ Documentation      │
│ ○ React               │
│                       │
│ + Add Task            │
└───────────────────────┘

Use bottom sheets rather than tiny desktop modals.

---

# 47. Touch Targets

Every important mobile button:

Minimum approximately 44 × 44px.

Never create tiny:

×
...
⚙

buttons that are difficult to touch.

---

# 48. Responsive Typography

Timer:

Mobile
56–72px

Tablet
80–100px

Desktop
100–140px

Large monitor
140–180px

Use CSS clamp():

font-size: clamp(...)

This makes resizing extremely smooth.

---

# 49. Orientation Support

Phone portrait:

Timer centered vertically.

Phone landscape:

Task | Timer

Tablet landscape:

Tasks | Timer | Quick Stats

The interface should react to available space, not only device names.

---

# 50. Small Laptop Height

Very important.

Many developers only test width.

Test:

1366 × 768

The app must still fit vertically.

Use:

100dvh

and adaptive spacing.

For example:

Large screen:

padding: 48px

Short screen:

padding: 20px

---

# 51. Ultra-Wide Screens

Do not stretch the timer across a 3440px monitor.

Set workspace maximum widths.

Center important content.

Side areas can expand slightly while the timer remains visually focused.

---

# 52. Smooth UI Motion

Animations should normally be:

150–300ms

Examples:

Panel:
slide + fade

Button:
scale 0.98

Timer start:
subtle scale

Task completion:
fade + check

Theme:
crossfade

Do NOT animate everything.

Animation should explain state changes.

---

# 53. Theme Transitions

Changing:

Mountain → Rainy City

should crossfade.

Not:

instant hard switch.

Example:

300–500ms crossfade.

This makes customization feel premium.

---

# 54. Micro-interactions

Examples:

Hover Start:
slight glow

Press:
scale down slightly

Complete task:
circle fills → check appears → text fades

Timer starts:
controls reduce visual prominence

Goal completed:
small glow

Sound enabled:
sound icon gently activates

These tiny details make the product feel finished.

---

# 55. Loading Experience

Because localStorage is fast, avoid a giant loading screen.

Use a subtle initial fade.

If backgrounds take longer:

show dominant background color first

then:

crossfade image in

Avoid white flashes when using dark themes.

---

# 56. Empty States

Bad:

"No data."

Better:

No tasks yet.

What's one thing worth finishing today?

[ Add first task ]

Stats:

Your focus story starts here.

Complete your first session to see progress.

---

# 57. Error UX

Never show technical errors to normal users.

Bad:

localStorage JSON parse error

Better:

We couldn't restore your previous workspace.

[ Reset workspace ]

Technical details remain in console during development.

---

# 58. Undo Actions

Deleting a task should show:

Task deleted                         Undo

for several seconds.

Much better than asking:

"ARE YOU SURE YOU WANT TO DELETE?"

for every small action.

Confirmation dialogs should be reserved for destructive actions such as:

Reset all data

---

# 59. Accessibility

Focus Room should support:

Keyboard navigation
Visible focus states
ARIA labels
Reduced motion
High contrast
Screen readers
Large text
Color-independent states

Priority cannot rely only on:

Red
Yellow
Green

Also use:

High
Medium
Low

---

# 60. Reduced Motion

Respect:

prefers-reduced-motion

Users who disable animations should get:

No background movement
No parallax
Minimal transitions
No decorative animation

---

# 61. Light + Dark Interface

Even if most themes are dark, support both.

Interface:

Dark
Light
Auto

Background theme and interface theme can be separate.

Example:

Ocean background
+
Dark controls

or:

Minimal White
+
Light controls

---

# 62. Workspace Profiles

A powerful customization feature.

Users create:

💻 Coding
📚 Study
✍ Writing
🧘 Deep Focus

Each profile remembers:

Timer preset
Theme
Soundscape
Widget visibility
Goal
Layout

Example:

CODING

90 minute focus
Cyber Night theme
Rain + keyboard
Tasks visible
Stats hidden

STUDY

45 minute focus
Library theme
Cafe + rain
Notes visible
Clock visible

One click completely changes the workspace.

---

# 63. Automatic Workspace Switching

Future enhancement.

Morning:

Study Workspace

Afternoon:

Coding Workspace

Evening:

Reading Workspace

Keep manual switching as the default.

---

# 64. Focus Session History

History:

Today

14:00
45m
🔥 Portfolio

12:30
25m
📚 React Study

10:15
50m
💻 Job Project

Allow users to see where their time actually went.

---

# 65. Smart Resume

If the browser closes during a timer:

Store:

startedAt
duration
pausedAt

When reopened:

You had a focus session running.

18:42 remaining

[ Resume ] [ End Session ]

This is much better than silently resetting the timer.

---

# 66. Browser Title

While focusing:

18:42 • Finish Portfolio

Instead of:

Focus Room

This allows users to see the timer from another browser tab.

Paused:

Paused • Focus Room

Break:

04:21 • Break

---

# 67. Notifications

Optional browser notification:

Focus session complete.

Time for a short break.

And:

Break complete.

Ready for another session?

Notifications should be opt-in.

---

# 68. Sound Notifications

Allow:

Soft Bell
Digital
Wood
Chime
None

Volume:

──────●────

Users should never be surprised by a loud sound.

---

# 69. Privacy

For V1:

Everything stays locally in the browser.

Explain:

Your Focus Room data stays on this device.

No account required.

This can actually become a product advantage.

---

# 70. Backup / Restore

Because everything uses localStorage:

Export Workspace

downloads:

focus-room-backup.json

Import Workspace

restores:

Tasks
Themes
Settings
Stats
Presets
Soundscapes

Very useful without requiring accounts.

---

# 71. First-Time Experience

Do NOT show a 7-screen onboarding tutorial.

First visit:

Welcome to Focus Room.

How long do you usually focus?

[ 25m ] [ 45m ] [ 60m ] [ Custom ]

Choose your atmosphere:

[ Minimal ]
[ Nature ]
[ Cozy ]
[ City ]

                       Continue

Then immediately enter the workspace.

---

# 72. Progressive Disclosure

Do not show advanced customization immediately.

Beginner sees:

Timer
Task
Start
Theme
Sound

Advanced user can discover:

Custom Pomodoro
Workspace profiles
Sound mixing
Widget controls
Keyboard shortcuts
Statistics
Session history

This prevents the interface from becoming overwhelming.

---

# 73. Quick Customize Panel

Instead of opening Settings for everything:

🎨 Quick Customize

Theme
[ Rainy Night ]

Accent
● Purple

Timer
[ Circular ]

Sound
[ Rainy Coding ]

Widgets
[ Customize ]

For deeper settings:

Advanced Settings →

---

# 74. Settings Search

When settings become large:

Search settings...

Examples:

"timer"
"background"
"sound"
"clock"

This prevents a giant confusing settings page.

---

# 75. Settings Categories

Appearance
├── Theme
├── Background
├── Accent
├── Glass
└── Animations

Focus
├── Timer
├── Pomodoro
├── Breaks
└── Completion

Workspace
├── Widgets
├── Layout
├── Clock
├── Quotes
└── Greeting

Sounds
├── Soundscape
├── Alerts
└── Volume

Data
├── Export
├── Import
└── Reset

Accessibility
├── Motion
├── Contrast
└── Text size

---

# 76. Custom Layout

Advanced users can choose:

Centered

Timer dominates center.

Productivity

Tasks | Timer | Stats

Minimal

Only timer.

Ambient

Background + clock + timer.

Study

Tasks + timer + notes.

This is easier than immediately implementing arbitrary drag-and-drop widgets.

---

# 77. Layout Preview

When selecting layouts, show visual thumbnails.

Centered

┌───────────┐
│           │
│   25:00   │
│           │
└───────────┘

Productivity

┌───┬───────┬───┐
│ T │ 25:00 │ S │
└───┴───────┴───┘

Minimal

┌───────────┐
│   25:00   │
└───────────┘

Users understand visual choices much faster than text.

---

# 78. Favorite Themes

Allow:

♡ Rainy City

click:

♥ Rainy City

Then:

Themes
├── Favorites
├── Recent
└── All

Useful once you have many themes.

---

# 79. Recently Used

Remember:

Recent themes
Recent soundscapes
Recent timer presets
Recent tasks

This reduces repeated setup.

---

# 80. Custom Theme Builder

Advanced customization:

Theme name:
[ Purple Rain ]

Background:
[ rainy-city.jpg ]

Accent:
#A78BFA

Overlay:
65%

Blur:
8px

Panel:
Glass

Text:
Light

[ Save Theme ]

Now users aren't simply choosing themes.

They're creating them.

---

# 81. Responsive Settings

Allow some settings to differ by device.

Example:

Desktop:
Tasks visible

Mobile:
Tasks hidden behind tab

Desktop:
Quote visible

Mobile:
Quote hidden

This avoids forcing desktop customization onto tiny screens.

---

# 82. PWA

Eventually make Focus Room installable.

User can:

Install Focus Room

Then launch it like a desktop/mobile application.

This fits the product extremely well.

---

# 83. Offline Support

Core features should work offline:

Timer
Tasks
Themes
Stats
Notes
Settings

Downloaded sounds/backgrounds could also work offline later.

This makes Focus Room feel like a real application.

---

# 84. Performance Requirements

Beautiful must NOT mean slow.

Targets:

Fast initial render
No layout shifting
Lazy-load theme images
Lazy-load audio
Compress images
Avoid huge videos
Avoid unnecessary React re-renders

Timer should remain smooth even when:

backgrounds
sounds
tasks
stats

are active.

---

# 85. Design Language

## Corners

Main panels:

20–24px

Buttons:

10–14px

Small controls:

8–10px

Avoid making absolutely everything extremely rounded.

---

## Borders

Use subtle:

white/10

not bright borders everywhere.

---

## Shadows

Background themes should provide depth.

Do not add giant shadows to every card.

---

## Typography

Use strong hierarchy:

Workspace name
14–16px

Task
14–18px

Timer
80–160px

Secondary information
12–14px

The timer should immediately attract the eye.

---

# 86. Visual Hierarchy

Importance:

1. Timer
2. Current task
3. Start/Pause
4. Session state
5. Sounds
6. Tasks
7. Progress
8. Clock
9. Quote
10. Settings

Settings should NEVER compete visually with the timer.

---

# 87. Focus State

READY

Normal UI.

FOCUSING

Timer becomes stronger.
Background darkens slightly.
Secondary UI fades.
Active task remains visible.

BREAK

Background becomes warmer/brighter.
Task fades.
Break message appears.

COMPLETE

Short success animation.

This gives each state an emotional identity.

---

# 88. Example Final Desktop Experience

┌──────────────────────────────────────────────────────────────┐
│ ◉ Focus Room       Coding Workspace             19:42  ⚙ ⛶ │
│                                                              │
│                "Protect your attention."                     │
│                                                              │
│                  🔥 Finish Portfolio                         │
│                                                              │
│                         42:18                                │
│                                                              │
│                       [ Pause ]                              │
│                                                              │
│                    ↻          ⛶                              │
│                                                              │
│                🌧 65%    🔥 20%                              │
│                                                              │
│                                                              │
│   ✓ 3 Tasks                              ████████░  2h / 3h │
│                                                              │
│      Tasks     Sounds     Stats     Theme     Customize      │
└──────────────────────────────────────────────────────────────┘

Background:

Rainy city at night

UI:

Dark glass

Accent:

Purple

Everything important is visible.

Nothing requires page scrolling.

---

# 89. Example Final Mobile Experience

┌───────────────────────┐
│ Focus Room        ⚙   │
│ Coding                 │
│                       │
│ 🔥 Portfolio           │
│                       │
│        42:18          │
│                       │
│       [ Pause ]       │
│                       │
│    🌧 65%   🔥 20%    │
│                       │
│      ███████░ 67%     │
│                       │
├───────────────────────┤
│ ✓      ◉      ♪    •••│
│Tasks  Focus  Sounds More
└───────────────────────┘

No horizontal overflow.

No tiny desktop controls.

No main-page scrolling.

---

# 90. Recommended V1

Do NOT implement all 89 ideas immediately.

Build:

✓ Pomodoro
✓ Countdown
✓ Stopwatch
✓ Custom timer presets

✓ Tasks
✓ Priority
✓ Active task
✓ Session estimates

✓ 8–12 themes
✓ Custom background
✓ Accent colors
✓ Background controls

✓ Sound mixer
✓ 5–8 ambient sounds
✓ Individual volumes
✓ Sound presets

✓ Quotes
✓ Clock
✓ Daily goal
✓ Notes

✓ Focus Mode
✓ Zen Mode
✓ Fullscreen

✓ Stats
✓ 7-day chart
✓ Session history

✓ 3–4 layouts
✓ Widget visibility
✓ Workspace profiles

✓ Keyboard shortcuts
✓ Command palette

✓ localStorage
✓ Export/import

✓ Desktop
✓ Laptop
✓ Tablet
✓ Mobile

This is already a very strong portfolio application.

---

# 91. V2

After V1 works:

- PWA
- Offline mode
- Browser notifications
- Advanced statistics
- Heatmap
- Custom theme builder
- Custom sound presets
- Drag-and-drop widgets
- Responsive widget preferences
- Smart timer resume
- Session notes

---

# 92. V3 — Only If The Project Becomes Serious

Then consider:

Authentication
Cloud synchronization
Database
Cross-device profiles
Shared focus rooms
Friends
Leaderboards
Team focus
Calendar integrations

Do NOT add these just because they sound impressive.

Focus Room should remain a focus tool.

---

# 93. The Product Rule

Every feature should answer at least one question:

Does this help the user focus?

Does this make the workspace feel personal?

Does this reduce friction?

Does this help the user understand their progress?

If the answer is no:

Do not add it.

---

# 94. Final Product Identity

Focus Room should NOT feel like:

"A Pomodoro timer with lots of settings."

It should feel like:

"MY place to work."

A user might have:

Nakry's Coding Room
Purple rainy city
90-minute timer
Rain + keyboard sounds
Portfolio as current priority
Minimal widgets

Another user might have:

Study Room
Warm coffee shop
45-minute timer
Cafe + fireplace
Study task list
Clock + notes visible

Another might have:

Deep Work
Pure black background
No quote
No clock
No tasks
No sounds

                    47:21

All three are using the same application.

But it feels like a different product for each person.

That is the customization level Focus Room should aim for.
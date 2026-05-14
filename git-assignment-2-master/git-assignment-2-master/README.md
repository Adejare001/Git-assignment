# Simple Calculator

A basic web calculator built with plain HTML, CSS, and JavaScript — no frameworks or libraries required.

---

## Project Structure

```
calculator/
├── index.html   → Page structure (buttons and display)
├── style.css    → All visual styling
└── script.js    → All calculator logic
```

---

## How It Works

### index.html
This file contains only the HTML structure of the calculator. It has two main sections:

- **Display area** — shows the current number and the running expression (e.g. `7 × 8 =`)
- **Button grid** — a 4-column grid of buttons (numbers, operators, and special functions)

It links to the CSS file in the `<head>` and loads the JavaScript file at the bottom of `<body>`:

```html
<link rel="stylesheet" href="style.css"/>
<script src="script.js"></script>
```

---

### style.css
Handles all the visual appearance of the calculator:

- The page background is a plain light grey (`#e9e9e9`)
- The calculator card is white with a subtle border and shadow
- The display area has a slightly darker background to stand out
- Buttons are flat and grouped by type using CSS classes:
  - `.btn-num` — regular number buttons (light grey)
  - `.btn-op` — operator buttons (`÷ × − +`) (slightly darker grey)
  - `.btn-clear` — AC button (light red)
  - `.btn-ce` — CE button (light orange)
  - `.btn-eq` — equals button (dark charcoal)
- The `@keyframes shake` animation triggers on errors (e.g. dividing by zero)

---

### script.js
Contains all the calculator logic. It uses four state variables to track what's happening:

| Variable | Purpose |
|---|---|
| `current` | The number currently being typed |
| `expression` | The full expression shown above the result |
| `operator_` | The active operator (`+`, `-`, `×`, `/`) |
| `prev` | The previous number before the operator was pressed |
| `justCalc` | Tracks if `=` was just pressed, to reset on next input |

#### Key Functions

| Function | What it does |
|---|---|
| `digit(d)` | Appends a digit to the current number |
| `decimal()` | Adds a decimal point (only once per number) |
| `operator(op)` | Stores the current number and sets the active operator |
| `calculate()` | Performs the maths and shows the result |
| `clearAll()` | Resets everything (AC button) |
| `clearEntry()` | Clears only the current number (CE button) |
| `percent()` | Divides the current number by 100 |
| `toggleSign()` | Flips the number between positive and negative |
| `showError(msg)` | Displays an error and shakes the calculator |
| `updateDisplay()` | Refreshes the screen with the latest values |

#### Example — How `7 × 8 =` Works
1. User presses `7` → `digit('7')` sets `current = '7'`
2. User presses `×` → `operator('×')` saves `prev = 7`, sets `operator_ = '×'`, resets `current = '0'`
3. User presses `8` → `digit('8')` sets `current = '8'`
4. User presses `=` → `calculate()` computes `7 × 8 = 56`, displays `56`

#### Keyboard Support
You can also use the keyboard:

| Key | Action |
|---|---|
| `0–9` | Enter digits |
| `.` | Decimal point |
| `+` `-` `*` `/` | Operators |
| `Enter` or `=` | Calculate |
| `Escape` | Clear all (AC) |
| `Backspace` | Clear entry (CE) |
| `%` | Percent |

---

## How to Run

1. Download or clone the repository
2. Open `index.html` in any web browser
3. No installation or internet connection needed (except for the Google Font)

---

## Author
ITZBOBO

// State
let current    = '0';
let expression = '';
let operator_  = null;
let prev       = null;
let justCalc   = false;

const resultEl     = document.getElementById('result');
const expressionEl = document.getElementById('expression');

function updateDisplay() {
  resultEl.textContent = current;
  expressionEl.textContent = expression;
  // Scale font based on length
  const len = current.length;
  resultEl.className = 'result' + (len > 12 ? ' tiny' : len > 9 ? ' small' : '');
}

function digit(d) {
  if (justCalc) { current = d; expression = ''; justCalc = false; }
  else if (current === '0' || current === '-0') {
    current = current.startsWith('-') ? '-' + d : d;
  } else {
    if (current.replace(/[^0-9]/g,'').length >= 15) return; // limit digits
    current += d;
  }
  updateDisplay();
}

function decimal() {
  if (justCalc) { current = '0.'; expression = ''; justCalc = false; }
  else if (!current.includes('.')) current += '.';
  updateDisplay();
}

function operator(op) {
  justCalc = false;
  if (prev !== null && operator_ && !justCalc) {
    calculate(true); // chain calculation
  }
  prev = parseFloat(current);
  operator_ = op;
  expression = current + ' ' + op;
  current = '0';
  updateDisplay();
}

function calculate(chaining = false) {
  if (prev === null || !operator_) return;
  const curr = parseFloat(current);
  let res;
  switch (operator_) {
    case '+': res = prev + curr; break;
    case '-': res = prev - curr; break;
    case '×': res = prev * curr; break;
    case '/':
      if (curr === 0) { showError("Can't ÷ by 0"); return; }
      res = prev / curr;
      break;
  }
  if (!chaining) {
    expression = expression + ' ' + current + ' =';
  }
  // Fix float precision
  res = parseFloat(res.toPrecision(12));
  current = String(res);
  if (!chaining) { prev = null; operator_ = null; justCalc = true; }
  else           { prev = res; }
  updateDisplay();
}

function clearAll() {
  current = '0'; expression = ''; operator_ = null; prev = null; justCalc = false;
  updateDisplay();
}

function clearEntry() {
  current = '0';
  updateDisplay();
}

function percent() {
  current = String(parseFloat(current) / 100);
  updateDisplay();
}

function toggleSign() {
  current = current.startsWith('-') ? current.slice(1) : '-' + current;
  if (current === '-0') current = '0';
  updateDisplay();
}

function showError(msg) {
  const calc = document.getElementById('calculator');
  current = msg;
  operator_ = null; prev = null;
  updateDisplay();
  calc.classList.add('shake');
  setTimeout(() => { calc.classList.remove('shake'); clearAll(); }, 800);
}

// Keyboard support
document.addEventListener('keydown', e => {
  if (e.key >= '0' && e.key <= '9') digit(e.key);
  else if (e.key === '.') decimal();
  else if (e.key === '+') operator('+');
  else if (e.key === '-') operator('-');
  else if (e.key === '*') operator('×');
  else if (e.key === '/') { e.preventDefault(); operator('/'); }
  else if (e.key === 'Enter' || e.key === '=') calculate();
  else if (e.key === 'Escape') clearAll();
  else if (e.key === 'Backspace') clearEntry();
  else if (e.key === '%') percent();
});

updateDisplay();

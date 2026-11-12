// Animated login form: wave labels, validation and password toggle

// Split each label into letters with a staggered transition delay
document.querySelectorAll('.form-control label').forEach((label) => {
  label.innerHTML = label.textContent
    .split('')
    .map((letter, idx) => `<span style="transition-delay:${idx * 50}ms">${letter}</span>`)
    .join('');
});

const form = document.getElementById('login-form');
const email = document.getElementById('email');
const password = document.getElementById('password');
const toggle = document.getElementById('toggle-password');
const success = document.getElementById('success');

// Keep labels raised when a field has a value
[email, password].forEach((input) => {
  input.addEventListener('input', () => {
    input.classList.toggle('filled', input.value !== '');
    validate(input, false);
    success.hidden = true;
  });
  input.addEventListener('blur', () => validate(input, true));
});

function validate(input, showError) {
  const control = input.closest('.form-control');
  const errorEl = control.querySelector('.error');
  let message = '';

  if (input === email) {
    if (!input.value) message = 'Please enter your email.';
    else if (!input.validity.valid) message = 'Please enter a valid email address.';
  } else if (input === password) {
    if (!input.value) message = 'Please enter your password.';
    else if (input.value.length < 8) message = 'Password must be at least 8 characters.';
  }

  if (showError || !message) {
    errorEl.textContent = message;
    control.classList.toggle('invalid', Boolean(message));
  }
  return !message;
}

toggle.addEventListener('click', () => {
  const show = password.type === 'password';
  password.type = show ? 'text' : 'password';
  toggle.textContent = show ? 'Hide' : 'Show';
  toggle.setAttribute('aria-label', show ? 'Hide password' : 'Show password');
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const ok = [email, password].map((input) => validate(input, true)).every(Boolean);
  if (!ok) {
    form.querySelector('.invalid input')?.focus();
    return;
  }
  success.hidden = false;
});

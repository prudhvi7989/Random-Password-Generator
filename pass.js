const passwordDisplay = document.getElementById("passwordDisplay");
const copyBtn = document.getElementById("copyBtn");
const copyMsg = document.getElementById("copyMsg");
const lengthSlider = document.getElementById("lengthSlider");
const lengthBox = document.getElementById("lengthBox");
const uppercase = document.getElementById("uppercase");
const lowercase = document.getElementById("lowercase");
const numbers = document.getElementById("numbers");
const symbols = document.getElementById("symbols");
const bar = document.getElementById("bar");
const generateBtn = document.getElementById("generateBtn");

const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lower = "abcdefghijklmnopqrstuvwxyz";
const nums = "0123456789";
const syms = "!@#$%^&*()_+{}[]<>?/|~";

const MIN_LEN = 4;
const MAX_LEN = 32;

lengthSlider.addEventListener("input", () => {
  lengthBox.value = lengthSlider.value;
});

lengthBox.addEventListener("input", (e) => {
  let raw = e.target.value;
  const filtered = raw.replace(/[^\d]/g, "");
  if (filtered === "") {
    e.target.value = "";
    return;
  }
  let val = parseInt(filtered, 10);
  if (isNaN(val)) {
    val = MIN_LEN;
  }
  if (val < MIN_LEN) val = MIN_LEN;
  if (val > MAX_LEN) val = MAX_LEN;
  lengthSlider.value = val;
  e.target.value = filtered;
});

lengthBox.addEventListener("blur", (e) => {
  let raw = e.target.value.trim();
  if (raw === "" || isNaN(parseInt(raw, 10))) {
    const fallback = Math.max(MIN_LEN, Math.min(MAX_LEN, parseInt(lengthSlider.value, 10) || MIN_LEN));
    e.target.value = fallback;
    lengthSlider.value = fallback;
    return;
  }
  let val = parseInt(raw, 10);
  if (val < MIN_LEN) val = MIN_LEN;
  if (val > MAX_LEN) val = MAX_LEN;
  e.target.value = val;
  lengthSlider.value = val;
});

lengthBox.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    lengthBox.blur();
  }
});

copyBtn.addEventListener("click", () => {
  if (!passwordDisplay.value) return;
  navigator.clipboard.writeText(passwordDisplay.value)
    .then(() => {
      copyMsg.textContent = "Copied!";
      copyMsg.style.opacity = 1;
      setTimeout(() => (copyMsg.style.opacity = 0), 1000);
    })
    .catch(() => {
      copyMsg.textContent = "Copy failed";
      copyMsg.style.opacity = 1;
      setTimeout(() => (copyMsg.style.opacity = 0), 1200);
    });
});

generateBtn.addEventListener("click", generatePassword);

function generatePassword() {
  let len = parseInt(lengthSlider.value, 10) || MIN_LEN;
  if (isNaN(len) || len < MIN_LEN) len = MIN_LEN;
  if (len > MAX_LEN) len = MAX_LEN;
  lengthSlider.value = len;
  lengthBox.value = len;

  let chars = "";
  if (uppercase.checked) chars += upper;
  if (lowercase.checked) chars += lower;
  if (numbers.checked) chars += nums;
  if (symbols.checked) chars += syms;

  if (chars === "") {
    passwordDisplay.value = "⚠️ Select at least one option!";
    updateStrength("");
    return;
  }

  let password = "";
  for (let i = 0; i < len; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  passwordDisplay.value = password;
  updateStrength(password);
}

function updateStrength(password) {
  let strength = 0;
  if (/[a-z]/.test(password)) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/[0-9]/.test(password)) strength++;
  if (/[^a-zA-Z0-9]/.test(password)) strength++;
  if (password.length >= 14) strength++;

  switch (strength) {
    case 0:
      bar.style.width = "0%";
      bar.style.background = "#555";
      break;
    case 1:
      bar.style.width = "20%";
      bar.style.background = "#ff4b5c";
      break;
    case 2:
      bar.style.width = "40%";
      bar.style.background = "#ffaa00";
      break;
    case 3:
      bar.style.width = "60%";
      bar.style.background = "#ffee58";
      break;
    case 4:
      bar.style.width = "80%";
      bar.style.background = "#76ff03";
      break;
    case 5:
      bar.style.width = "100%";
      bar.style.background = "#00e676";
      break;
  }
}

(function init() {
  const start = Math.max(MIN_LEN, Math.min(MAX_LEN, parseInt(lengthSlider.value, 10) || MIN_LEN));
  lengthSlider.value = start;
  lengthBox.value = start;
  updateStrength("");
})();

const root = document.documentElement;
const themeToggle = document.querySelector("#themeToggle");
const copyEmail = document.querySelector("#copyEmail");
const toast = document.querySelector("#toast");
const year = document.querySelector("#year");
const email = "hello@example.com";

year.textContent = new Date().getFullYear();

const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
  root.dataset.theme = savedTheme;
}

themeToggle.addEventListener("click", () => {
  const nextTheme = root.dataset.theme === "dark" ? "" : "dark";
  if (nextTheme) {
    root.dataset.theme = nextTheme;
    localStorage.setItem("theme", nextTheme);
  } else {
    delete root.dataset.theme;
    localStorage.removeItem("theme");
  }
});

copyEmail.addEventListener("click", async () => {
  try {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(email);
    } else {
      fallbackCopy(email);
    }
    showToast("已复制邮箱");
  } catch {
    if (fallbackCopy(email)) {
      showToast("已复制邮箱");
    } else {
      showToast(email);
    }
  }
});

function fallbackCopy(text) {
  const input = document.createElement("textarea");
  input.value = text;
  input.setAttribute("readonly", "");
  input.style.position = "fixed";
  input.style.opacity = "0";
  document.body.appendChild(input);
  input.select();
  const copied = document.execCommand("copy");
  document.body.removeChild(input);
  return copied;
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("is-visible");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => {
    toast.classList.remove("is-visible");
  }, 1800);
}

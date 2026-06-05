const darkModeBtn = document.getElementById("darkModeBtn");

function applyTheme() {
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");

    if (darkModeBtn) {
      darkModeBtn.innerHTML = `<i class="fa-solid fa-sun"></i>`;
    }
  } else {
    document.body.classList.remove("dark");

    if (darkModeBtn) {
      darkModeBtn.innerHTML = `<i class="fa-solid fa-moon"></i>`;
    }
  }
}

if (darkModeBtn) {
  darkModeBtn.addEventListener("click", () => {
    const isDark = document.body.classList.toggle("dark");

    localStorage.setItem("theme", isDark ? "dark" : "light");
    applyTheme();
  });
}

applyTheme();
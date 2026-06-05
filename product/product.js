let cart = JSON.parse(localStorage.getItem("cart")) || [];

const buttons = document.querySelectorAll(".products .btn");
const cartCount = document.getElementById("cartCount");
const toast = document.getElementById("toast");

function updateCartCount() {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCount.textContent = totalItems;
}

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const productCard = button.closest(".products");

    const product = {
      name: productCard.querySelector("h1").textContent,
      price: productCard.querySelector("p").textContent,
      image: productCard.querySelector("img").src,
      quantity: 1,
    };

    const existingProduct = cart.find((item) => item.name === product.name);

    if (existingProduct) {
      existingProduct.quantity++;
    } else {
      cart.push(product);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    showToast();
  });
});

function showToast() {
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 2000);
}

updateCartCount();

/* Search + Filter */

const searchInput = document.getElementById("searchInput");
const productCards = document.querySelectorAll(".products");
const filterButtons = document.querySelectorAll(".filter-btn");

let currentCategory = "all";

function filterProducts() {
  const searchValue = searchInput.value.toLowerCase();

  productCards.forEach((card) => {
    const productName = card.querySelector("h1").textContent.toLowerCase();
    const productCategory = card.dataset.category;

    const matchSearch = productName.includes(searchValue);
    const matchCategory =
      currentCategory === "all" || productCategory === currentCategory;

    card.style.display = matchSearch && matchCategory ? "block" : "none";
  });
}

searchInput.addEventListener("input", filterProducts);

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    currentCategory = button.dataset.category;
    filterProducts();
  });
});

/* Wishlist */

const wishButtons = document.querySelectorAll(".wish-btn");

wishButtons.forEach((button) => {
  button.addEventListener("click", () => {
    button.classList.toggle("active");

    const icon = button.querySelector("i");
    icon.classList.toggle("fa-regular");
    icon.classList.toggle("fa-solid");
  });
});

/* Dark Mode */

const darkModeBtn = document.getElementById("darkModeBtn");

function applyTheme() {
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
    darkModeBtn.innerHTML = `<i class="fa-solid fa-sun"></i>`;
  } else {
    document.body.classList.remove("dark");
    darkModeBtn.innerHTML = `<i class="fa-solid fa-moon"></i>`;
  }
}

darkModeBtn.addEventListener("click", () => {
  const isDark = document.body.classList.toggle("dark");
  localStorage.setItem("theme", isDark ? "dark" : "light");
  applyTheme();
});

applyTheme();
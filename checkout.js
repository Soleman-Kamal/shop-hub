let cart = JSON.parse(localStorage.getItem("cart")) || [];

const checkoutItems = document.getElementById("checkoutItems");
const checkoutTotal = document.getElementById("checkoutTotal");
const checkoutSubtotal = document.getElementById("checkoutSubtotal");
const checkoutForm = document.querySelector(".checkout-form");
const orderToast = document.getElementById("orderToast");
const successOverlay = document.getElementById("successOverlay");

function getPriceNumber(price) {
  return Number(price.replace("$", "").replace(",", ""));
}

function displayCheckout() {
  checkoutItems.innerHTML = "";

  if (cart.length === 0) {
    checkoutItems.innerHTML = `<p class="empty-cart">No products in your cart.</p>`;
    checkoutTotal.textContent = "$0";
    checkoutSubtotal.textContent = "$0";
    return;
  }

  let total = 0;

  cart.forEach((item) => {
    const priceNumber = getPriceNumber(item.price);
    total += priceNumber * item.quantity;

    checkoutItems.innerHTML += `
      <div class="checkout-item">
        <img src="${item.image}" alt="${item.name}" />

        <div>
          <h4>${item.name}</h4>
          <p>${item.price} × ${item.quantity}</p>
        </div>
      </div>
    `;
  });

  checkoutSubtotal.textContent = `$${total.toLocaleString()}`;
  checkoutTotal.textContent = `$${total.toLocaleString()}`;
}

checkoutForm.addEventListener("submit", (e) => {
  e.preventDefault();

  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  orderToast.classList.add("show");
  successOverlay.classList.add("show");

  setTimeout(() => {
    orderToast.classList.remove("show");
    localStorage.removeItem("cart");
    window.location.href = "index.html";
  }, 2600);
});

displayCheckout();
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let discount = 0;

const cartItems = document.getElementById("cartItems");
const totalPrice = document.getElementById("totalPrice");
const finalTotal = document.getElementById("finalTotal");
const discountPrice = document.getElementById("discountPrice");
const clearCart = document.getElementById("clearCart");
const cartToast = document.getElementById("cartToast");
const couponInput = document.getElementById("couponInput");
const applyCoupon = document.getElementById("applyCoupon");
const couponMessage = document.getElementById("couponMessage");
const shippingProgress = document.getElementById("shippingProgress");
const shippingText = document.getElementById("shippingText");

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function showCartToast() {
  cartToast.classList.add("show");
  setTimeout(() => cartToast.classList.remove("show"), 1600);
}

function getPriceNumber(price) {
  return Number(price.replace("$", "").replace(",", ""));
}

function getTotal() {
  return cart.reduce((sum, item) => {
    return sum + getPriceNumber(item.price) * item.quantity;
  }, 0);
}

function updateShipping(total) {
  const target = 3000;
  const progress = Math.min((total / target) * 100, 100);

  shippingProgress.style.width = `${progress}%`;

  if (total >= target) {
    shippingText.textContent = "Congratulations! You unlocked free premium shipping.";
  } else {
    shippingText.textContent = `Add $${(target - total).toLocaleString()} more to unlock free premium shipping.`;
  }
}

function updateTotals() {
  const total = getTotal();
  const discountValue = total * discount;
  const final = total - discountValue;

  totalPrice.textContent = `$${total.toLocaleString()}`;
  discountPrice.textContent = `-$${discountValue.toLocaleString()}`;
  finalTotal.textContent = `$${final.toLocaleString()}`;

  updateShipping(total);
}

function displayCart() {
  cartItems.innerHTML = "";

  if (cart.length === 0) {
    cartItems.innerHTML = `
      <div class="empty-cart">
        Looks like your cart is empty.
        <br />
        <a href="product.html" class="btn" style="margin-top:18px;">Continue Shopping</a>
      </div>
    `;

    updateTotals();
    return;
  }

  cart.forEach((item, index) => {
    cartItems.innerHTML += `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.name}" />

        <div>
          <h3>${item.name}</h3>
          <p>${item.price}</p>
        </div>

        <div class="quantity-box">
          <button onclick="decreaseQuantity(${index})">-</button>
          <span id="qty-${index}">${item.quantity}</span>
          <button onclick="increaseQuantity(${index})">+</button>
        </div>

        <button class="remove-btn" onclick="removeItem(${index})">
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>
    `;
  });

  updateTotals();
}

function animateQty(index) {
  const qty = document.getElementById(`qty-${index}`);
  if (!qty) return;

  qty.classList.add("qty-pop");

  setTimeout(() => {
    qty.classList.remove("qty-pop");
  }, 260);
}

function increaseQuantity(index) {
  cart[index].quantity++;
  saveCart();
  displayCart();
  animateQty(index);
  showCartToast();
}

function decreaseQuantity(index) {
  if (cart[index].quantity > 1) {
    cart[index].quantity--;
  } else {
    cart.splice(index, 1);
  }

  saveCart();
  displayCart();
  showCartToast();
}

function removeItem(index) {
  cart.splice(index, 1);
  saveCart();
  displayCart();
  showCartToast();
}

applyCoupon.addEventListener("click", () => {
  const code = couponInput.value.trim().toUpperCase();

  if (code === "WELCOME20") {
    discount = 0.2;
    couponMessage.textContent = "Coupon applied! 20% discount added.";
    couponMessage.style.color = "#16a34a";
  } else {
    discount = 0;
    couponMessage.textContent = "Invalid coupon code.";
    couponMessage.style.color = "#ef4444";
  }

  updateTotals();
});

clearCart.addEventListener("click", () => {
  cart = [];
  saveCart();
  displayCart();
  showCartToast();
});

displayCart();
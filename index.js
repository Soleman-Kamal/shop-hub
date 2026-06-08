const discountPopup = document.getElementById("discountPopup");
const closePopup = document.getElementById("closePopup");

setTimeout(() => {
  discountPopup.classList.add("show");
}, 1200);

closePopup.addEventListener("click", () => {
  discountPopup.classList.remove("show");
});
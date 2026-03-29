import { getLocalStorage, setLocalStorage } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];

  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
}

function cartItemTemplate(item) {
  return `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img src="${item.Image.replace('../', '/')}" alt="${item.Name}" />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors?.[0]?.ColorName || ""}</p>

  <div class="cart-card__quantity">
    <button class="decrease" data-id="${item.Id}">-</button>
    <span>${item.quantity || 1}</span>
    <button class="increase" data-id="${item.Id}">+</button>
  </div>

  <p class="cart-card__price">$${(item.FinalPrice * (item.quantity || 1)).toFixed(2)}</p>
</li>`;
}

// Event handling
document.addEventListener("click", (e) => {
  const id = e.target.dataset.id;

  if (e.target.classList.contains("increase")) {
    updateQuantity(id, 1);
  }

  if (e.target.classList.contains("decrease")) {
    updateQuantity(id, -1);
  }
});

function updateQuantity(id, change) {
  let cart = getLocalStorage("so-cart") || [];

  cart = cart.map((item) => {
    if (item.Id === id) {
      item.quantity = (item.quantity || 1) + change;
      if (item.quantity < 1) item.quantity = 1;
    }
    return item;
  });

  setLocalStorage("so-cart", cart);
  renderCartContents();
}

renderCartContents();

const checkoutBtn = document.querySelector('#goToCheckout');

if (checkoutBtn) {
  checkoutBtn.addEventListener('click', () => {
    window.location.href = '/checkout/index.html';
  });
}
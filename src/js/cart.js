import { getLocalStorage, setLocalStorage } from "./utils.mjs";

const TAX_RATE = 0.06;

function formatCurrency(amount) {
  return `$${amount.toFixed(2)}`;
}


function updateOrderSummary(cartItems) {
  const subtotalEl = document.getElementById("cart-subtotal");
  const shippingEl = document.getElementById("cart-shipping");
  const taxEl = document.getElementById("cart-tax");
  const totalEl = document.getElementById("cart-total");


  if (!subtotalEl || !shippingEl || !taxEl || !totalEl) return;

  const subtotal = cartItems.reduce((sum, item) => {

    const price = Number(item.FinalPrice) || 0;
    const quantity = Number(item.quantity) || 1;
    return sum + price * quantity;
  }, 0);


  const shipping = 0;
  const tax = subtotal * TAX_RATE;
  const total = subtotal + shipping + tax;

  subtotalEl.textContent = formatCurrency(subtotal);
  shippingEl.textContent = formatCurrency(shipping);
  taxEl.textContent = formatCurrency(tax);
  totalEl.textContent = formatCurrency(total);
}

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];
  const listElement = document.querySelector(".product-list");
  const emptyMessage = document.getElementById("cart-empty");

  if (!listElement) return;

  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  listElement.innerHTML = htmlItems.join("");

  if (emptyMessage) {
    emptyMessage.hidden = cartItems.length > 0;
  }

  updateOrderSummary(cartItems);
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
    if (String(item.Id) === String(id)) {
      item.quantity = (item.quantity || 1) + change;
      if (item.quantity < 1) item.quantity = 1;
    }
    return item;
  });

  setLocalStorage("so-cart", cart);
  renderCartContents();
}

renderCartContents();

const checkoutBtn = document.querySelector('#checkout-btn');

if (checkoutBtn) {
  checkoutBtn.addEventListener('click', () => {
    window.location.href = "/checkout/index.html";
  });
}
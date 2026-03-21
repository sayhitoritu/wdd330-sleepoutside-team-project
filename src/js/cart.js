import { getLocalStorage, setLocalStorage } from "./utils.mjs";

function renderCartItem(item) {
  return `
    <li class="cart-item">
      <img src="${item.Image}" alt="${item.Name}" />
      <h3>${item.Name}</h3>
      <p>$${item.FinalPrice}</p>

      <div class="quantity-controls">
        <button class="decrease">-</button>
        <span class="quantity">${item.quantity || 1}</span>
        <button class="increase">+</button>
      </div>
    </li>
  `;
}

document.addEventListener("click", function (e) {
  if (e.target.classList.contains("increase") || e.target.classList.contains("decrease")) {

    const itemElement = e.target.closest(".cart-item");
    const qtyElement = itemElement.querySelector(".quantity");

    let qty = parseInt(qtyElement.textContent);

    if (e.target.classList.contains("increase")) {
      qty++;
    } else if (e.target.classList.contains("decrease") && qty > 1) {
      qty--;
    }

    qtyElement.textContent = qty;
  }
});
function cartItemTemplate(item) {
  return `<li class="cart-card divider">
function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];
  if (!cartItems.length) {
    document.querySelector(".product-list").innerHTML = "";
    return;
  }

  const htmlItems = cartItems.map((item, index) =>
    cartItemTemplate(item, index),
  );
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
}

function cartItemTemplate(item, index) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img src="${item.Image}" alt="${item.Name}" />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
  <button class="cart-card__remove" data-index="${index}">🗑</button>
</li>`;

  <div class="cart-card__quantity">
    <button class="decrease" data-id="${item.Id}">-</button>
    <span>${item.quantity || 1}</span>
    <button class="increase" data-id="${item.Id}">+</button>
  </div>

  <p class="cart-card__price">$${(item.FinalPrice * (item.quantity || 1)).toFixed(2)}</p>
</li>`;
}

// Handle clicks
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

  cart = cart
    .map((item) => {
      if (item.Id === id) {
        item.quantity = (item.quantity || 1) + change;
      }
      return item;
    })
    .filter((item) => item.quantity > 0); // ✅ remove if 0

  setLocalStorage("so-cart", cart);

  renderCartContents();
}
function removeFromCart(index) {
  const cartItems = getLocalStorage("so-cart") || [];
  cartItems.splice(index, 1);
  setLocalStorage("so-cart", cartItems);
  renderCartContents();
}

document.querySelector(".product-list").addEventListener("click", (e) => {
  const button = e.target.closest(".cart-card__remove");
  if (!button) return;
  removeFromCart(Number(button.dataset.index));
});

renderCartContents();

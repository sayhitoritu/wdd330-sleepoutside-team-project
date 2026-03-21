import { getLocalStorage } from "./utils.mjs";

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
  <a href="#" class="cart-card__image">
    <img src="${item.Image}" alt="${item.Name}" />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>

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
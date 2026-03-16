import { getLocalStorage, setLocalStorage } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];
  if (!cartItems.length) {
    document.querySelector(".product-list").innerHTML = "";
    return;
  }

  const htmlItems = cartItems.map((item, index) => cartItemTemplate(item, index));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
}

function cartItemTemplate(item, index) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
  <button class="cart-card__remove" data-index="${index}">🗑</button>
</li>`;

  return newItem;
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

import { setLocalStorage, getLocalStorage, getParam } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

const dataSource = new ProductData("tents");

function addProductToCart(product) {
  let cartItems = getLocalStorage("so-cart") || [];

  const existing = cartItems.find(item => item.Id === product.Id);

  if (existing) {
    existing.quantity = (existing.quantity || 1) + 1;
  } else {
    product.quantity = 1;
    cartItems.push(product);
  }

  setLocalStorage("so-cart", cartItems);

  alert("Product added to cart ✅");
}

async function addToCartHandler(e) {
  const id = e.currentTarget.dataset.id;

  const product = await dataSource.findProductById(id);

  addProductToCart(product);
}

const btn = document.getElementById("addToCart");

if (btn) {
  btn.addEventListener("click", addToCartHandler);
}
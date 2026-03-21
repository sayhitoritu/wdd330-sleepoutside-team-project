import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

const dataSource = new ProductData("tents");

function addProductToCart(product) {
  let cartItems = getLocalStorage("so-cart") || [];

  // check if product already exists
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
// add to cart button event handler
async function addToCartHandler(e) {
  const id = e.target.dataset.id;
  console.log("Clicked ID:", id); // ✅ check this

  const product = await dataSource.findProductById(id);
  console.log("Product found:", product); // ✅ check this

  addProductToCart(product);
}

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);

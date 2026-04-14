import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";


import { getLocalStorage, setLocalStorage } from "./utils.mjs";
// Always default to 'tents' if no category param or if data file is missing
let category = "tents";
const params = new URLSearchParams(window.location.search);
if (params.has("category")) {
  category = params.get("category");
}

function addToCart(cart, item) {

  // Check if item already exists in cart
  const existingItem = cart.find(cartItem => cartItem.id === item.id);

  if (existingItem) {
    // If found, increment its quantity
  existingItem.quantity += 1;
  } else {
    // Otherwise, add it with quantity = 1
    cart.push({ ...item, quantity: 1 });
  }

  return cart;
}


// Hook into a CART BUTTONS
function handleAddToCart(item) {
  let cart = getLocalStorage("so-cart") || [];
  cart = addToCart(cart, item);
  setLocalStorage("so-cart", cart);

  // Example: update cart count badge
  const cartCount = document.getElementById("cart-Count");
  if (cartCount) {
    cartCount.textContent = cart.reduce((sum, p) => sum + p.quantity, 0);
  }
}

// Expose function globally so ProductList can call it
window.handleAddToCart = handleAddToCart;



const dataSource = new ProductData(category);
const searchInput = document.getElementById("searchInput");
const element = document.querySelector(".product-list");
  
if (element) {
  const productList = new ProductList(category, dataSource, element);
  productList.init();
}

let comparedProducts = [];

function addToCompare(product) {
  if (!comparedProducts.find(p => p.Id === product.Id)) {
    comparedProducts.push(product);
    renderComparisonPanel();
  }
}
window.addToCompare = addToCompare;

function removeFromCompare(productId) {
  comparedProducts = comparedProducts.filter(p => p.Id !== productId);
  renderComparisonPanel();
}

function renderComparisonPanel() {
  const panel = document.getElementById("comparisonPanel");
  const button = document.getElementById("compareButton");
  if (!panel) return;
}

  if (comparedProducts.length === 0) {
    panel.innerHTML = "<p>No products selected for comparison.</p>";
    if (button) button.disabled = true;
    return;
  }

  const table = `<table class="comparison-table">


  <tr>
    <th>Feature</th>
    ${comparedProducts.map((p, i) => `<th>Product ${i + 1}</th>`).join("")}
  </tr>

  <tr>
    <td>Name</td>
    ${comparedProducts.map(p => `<td>${p.Name || ""}</td>`).join("")}
  </tr>

  panel.innerHTML = table;
  if(button) button.disabled = comparedProducts.length < 2;

  panel.querySelectorAll(".remove-comparison").forEach((btn) => {
    btn.addEventListener("click", handleRemoveCompare);})
}

  <td>Brand</td>
  ${comparedProducts.map(p => `<td>${p.Brand?.Name || ""}</td>`).join("")}
  </tr>
  
  <tr>
  <td>Price</td>
  ${comparedProducts.map(p => `<td>$${p.FinalPrice || ""}</td>`).join("")}
  </tr>

  <tr>
  <td>Color</td>
  ${comparedProducts.map(p => `<td>${p.Color}</td>`).join("")}
  </tr>

  <tr>
  <td>Description</td>
  ${comparedProducts.map(p => `<td>${p.Description || ""}</td>`).join("")}
  </tr>

  <tr>
  <td>Action</td>
  ${comparedProducts.map(p =>`<td><button class="remove-comparison" data-id="${p.Id}">Remove</button></td>`).join("")}
  </tr>
  
</table>`;
panel.innerHTML = table;
if(button) button.disabled = comparedProducts.length < 2;

//Event Listeners to Remove

panel.querySelectorAll(".remove-comparison").forEach(btn => {
  btn.addEventListener("click", handleRemoveCompare);
});

// How to handle for Remove button

function handleRemoveCompare(e) {
  const id = e.target.dataset.id;
  removeFromCompare(id);
}

// Product Search Feature
document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("searchInput");
  if (!searchInput) return;

  searchInput.addEventListener("keyup", function () {
    const searchValue = searchInput.value.toLowerCase();
    const products = document.querySelectorAll(".product-list li");

    products.forEach((product) => {
      const text = product.textContent.toLowerCase();

      product.style.display = text.includes(searchValue) ? "" : "none";
    });
  });
});
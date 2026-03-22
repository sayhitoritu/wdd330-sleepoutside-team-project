
import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";

const params = new URLSearchParams(window.location.search);
const category = params.get("category") || "tents";

const dataSource = new ProductData(category);
const element = document.querySelector(".product-list");

const productList = new ProductList(category, dataSource, element);
productList.init();

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
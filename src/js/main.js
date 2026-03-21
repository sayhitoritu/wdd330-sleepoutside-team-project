import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { getParam } from "./utils.mjs"; 

// Select element
const element = document.querySelector(".product-list");
const dataSource = new ProductData("tents");

// Get the search term from the URL 
const searchTerm = getParam("search")?.toLowerCase() || "";

// Function to render products 
async function renderProducts() {
  try {
    const allProducts = await dataSource.getData();

    // Filter products if searchTerm exists 
    const filtered = searchTerm
      ? allProducts.filter(
          (p) =>
            p.Name.toLowerCase().includes(searchTerm) ||
            p.NameWithoutBrand.toLowerCase().includes(searchTerm)
        )
      : allProducts;

    if (!filtered.length) {
      element.innerHTML = "<p>No products found.</p>";
      return;
    }

    // Use ProductList to render filtered products 
    const productList = new ProductList("tents", { getData: async () => filtered }, element);
    productList.init();
  } catch (err) {
    console.error("Error loading products:", err);
    element.innerHTML = "<p>Sorry, something went wrong.</p>";
  }
}

// Use tents category
const dataSource = new ProductData("tents");

// Create product list
const productList = new ProductList("tents", dataSource, element);

// Initialize
productList.init();

if (window.location.pathname.includes("cart")) {
    import("./cart.js");
}
// Run the function
renderProducts();

// Search Form Redirect 
const form = document.getElementById("searchForm");

if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const searchInput = document
      .getElementById("searchInput")
      .value.trim();

    if (searchInput) {
      window.location.href = `/product_pages/index.html?search=${searchInput}`;
    }
  });
}

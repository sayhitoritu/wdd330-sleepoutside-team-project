import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";

// Get category from URL
const productList = new ProductList(category, ".product-list");
productList.init();

console.log("Category:", category);

// Select list container
const listElement = document.querySelector(".product-list");

// Create data source
const dataSource = new ProductData(category);

// Create product list
const myList = new ProductList(category, dataSource, listElement);

// Initialize
myList.init();
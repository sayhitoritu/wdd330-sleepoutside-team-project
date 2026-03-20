import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";

// Select element
const element = document.querySelector(".product-list");

// Use tents category
const dataSource = new ProductData("tents");

// Create product list
const productList = new ProductList("tents", dataSource, element);

// Initialize
productList.init();
import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";

// Get category from URL
const params = new URLSearchParams(window.location.search);
const category = params.get("category") || "tents";

const element = document.querySelector(".product-list");
const dataSource = new ProductData(category);

const productList = new ProductList(category, dataSource, element);
productList.init();
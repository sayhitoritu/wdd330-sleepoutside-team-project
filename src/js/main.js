import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";

// select element
const element = document.querySelector(".product-list");

// create data source
const dataSource = new ProductData("tents");

// create product list
const productList = new ProductList("tents", dataSource, element);

// initialize
productList.init();

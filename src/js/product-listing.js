const params = new URLSearchParams(window.location.search);
const category = params.get("category");

console.log(category);
const dataSource = new ProductData(category);
const listElement = document.querySelector(".product-list");

const myList = new ProductList(category, dataSource, listElement);

myList.init();
console.log("Main JS is working");
import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";

const dataSource = new ProductData("tents");
const element = document.querySelector(".product-list");

const productList = new ProductList("tents", dataSource, element);
productList.init();

// Product Search Feature
document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("searchInput");

    searchInput.addEventListener("keyup", function () {
        const searchValue = searchInput.value.toLowerCase();
        const products = document.querySelectorAll(".product-list li");

        products.forEach((product) => {
            const text = product.textContent.toLowerCase();

            product.style.display = text.includes(searchValue) ? "" : "none";
        });
    });
});
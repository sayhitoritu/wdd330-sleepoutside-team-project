import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";

const element = document.querySelector(".product-list");
const searchInput = document.getElementById("searchInput");

const dataSource = new ProductData("tents");
const productList = new ProductList("tents", dataSource, element);

productList.init();

if (searchInput) {
	searchInput.addEventListener("keyup", () => {
		const searchValue = searchInput.value.toLowerCase();
		const products = document.querySelectorAll(".product-list li");

		products.forEach((product) => {
			const text = product.textContent.toLowerCase();
			product.style.display = text.includes(searchValue) ? "" : "none";
		});
	});
}

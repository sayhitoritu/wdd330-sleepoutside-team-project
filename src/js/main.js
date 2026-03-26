import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
// Global addToCart function for product listing
window.addToCart = async function(id) {
	const dataSource = new ProductData("tents");
	const product = await dataSource.findProductById(id);
	if (!product) {
		alert("Product not found!");
		return;
	}
	let cartItems = getLocalStorage("so-cart") || [];
	const existing = cartItems.find(item => item.Id === product.Id);
	if (existing) {
		existing.quantity = (existing.quantity || 1) + 1;
	} else {
		product.quantity = 1;
		cartItems.push(product);
	}
	setLocalStorage("so-cart", cartItems);
	alert("Product added to cart ✅");
};


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

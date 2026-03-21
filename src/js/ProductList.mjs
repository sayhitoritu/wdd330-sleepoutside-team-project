
function getProductPage(id) {
  const map = {
    "880RR": "marmot-ajax-3.html",
    "985RF": "northface-talus-4.html",
    "344YF": "cedar-ridge-rimrock-2.html",
    "985RH": "northface-alpine-3.html"
  };
  return map[id] || "#";
}

function productCardTemplate(product) {
  return `
  <li class="product-card">
    <a href="/product_pages/${getProductPage(product.Id)}">
      <img src="${product.Image.replace('../', '/')}" alt="${product.NameWithoutBrand}" />
      <h3>${product.NameWithoutBrand}</h3>
      <p class="product-card__brand">${product.Brand.Name}</p>
      <p class="product-card__price">$${product.FinalPrice}</p>
    </a>
  </li>
  `;
}

export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  async init() {
    const list = await this.dataSource.getData();
    const limitedList = list.slice(0, 4);
    this.renderList(limitedList);
  }

  renderList(list) {
    const htmlStrings = list.map(productCardTemplate);
    this.listElement.innerHTML = htmlStrings.join("");
  }
}
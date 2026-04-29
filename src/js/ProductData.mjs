function convertToJson(res) {
  if (res.ok) {
    return res.json();
  }
  throw new Error(`servicesError: ${res.status} ${res.statusText}`);
}

export default class ProductData {
  constructor(category) {
    this.category = category;
    this.path = `/json/${this.category}.json`;
    this.apiPath = `http://localhost:3000/products`;
  }

  normalizeApiProduct(product) {
    const imageMap = {
      1: "/images/tents/marmot-ajax-tent-3-person-3-season-in-pale-pumpkin-terracotta~p~880rr_01~320.jpg",
      2: "/images/tents/the-north-face-talus-tent-4-person-3-season-in-golden-oak-saffron-yellow~p~985rf_01~320.jpg",
      3: "/images/tents/cedar-ridge-rimrock-tent-2-person-3-season-in-rust-clay~p~344yj_01~320.jpg",
      4: "/images/tents/the-north-face-alpine-guide-tent-3-person-4-season-in-canary-yellow-high-rise-grey~p~985pr_01~320.jpg",
      5: "/images/tents/smith-sleeping-tent-8-person-3-season-in-grey~p~12345_01~320.jpg",
    };

    return {
      Id: String(product.id),
      NameWithoutBrand: product.name,
      Name: `${product.brand} ${product.name}`,
      Image: imageMap[product.id] || imageMap[1],
      Brand: {
        Name: product.brand,
      },
      FinalPrice: Number(product.price),
      ListPrice: Number(product.price),
      DescriptionHtmlSimple: "Product from local API",
    };
  }

  async getData() {
    try {
      if (this.category === "tents") {
        const apiResponse = await fetch(`${this.apiPath}?limit=20`);
        const apiData = await convertToJson(apiResponse);
        return apiData.map((item) => this.normalizeApiProduct(item));
      }

      const response = await fetch(this.path);
      const data = await convertToJson(response);

      return data;
    } catch (err) {
      console.warn("Falling back to static product JSON:", err.message);
      const response = await fetch(this.path);
      const data = await convertToJson(response);
      return data;
    }
  }

  async findProductById(id) {
    const products = await this.getData();
    return products.find((item) => item.Id === String(id));
  }

  async searchProducts(query) {
    const products = await this.getData();

    return products.filter((product) =>
      product.Name.toLowerCase().includes(query.toLowerCase())
    );
  }
}
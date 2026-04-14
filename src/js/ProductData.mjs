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
  }

  async getData() {
    try {
      const response = await fetch(this.path);
      const data = await convertToJson(response);

      return data;

    } catch (err) {
      console.error("Error fetching products:", err);

      throw err;
    }
  }

  async findProductById(id) {
    const products = await this.getData();
    return products.find((item) => item.Id === id);
  }

  async searchProducts(query) {
    const products = await this.getData();

    return products.filter((product) =>
      product.Name.toLowerCase().includes(query.toLowerCase())
    );
  }
}
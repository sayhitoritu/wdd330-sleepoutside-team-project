function convertToJson(res) {
  if (res.ok) {
    return jsonResponse;
  } else {
    throw {
      name: 'servicesError',
      message: jsonResponse
    };
  }
}

export default class ProductData {
  constructor(category) {
    this.category = category;
    this.path = `/json/${this.category}.json`;
    this.path = `/json/${this.category}.json`;
  }

  async getData() {
    try {
      const response = await fetch(this.path);
      const data = await convertToJson(response);

      return data;

    } catch (err) {
      console.error("Error fetching products:", err);

      throw err; // important so calling code knows error happened
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
const itemUrl = (item) => `https://api.mercadolibre.com/sites/MLB/search?q=${item}`;

const fetchProducts = async (item) => {
    const url = itemUrl(item);
    try {
    const request = await fetch(url);
    const js = await request.json();
    return js;
    } catch (error) {
      return error;
    }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}

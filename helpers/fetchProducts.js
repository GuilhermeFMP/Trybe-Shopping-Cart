const fetchProducts = async (item) => {
    const url = `https://api.mercadolibre.com/sites/MLB/search?q=${item}`;
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

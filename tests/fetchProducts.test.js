require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fetchProducts', () => {
  it('Verifica se é uma função', () => {
    expect(typeof fetchProducts).toBe('function');
  })
  it('Ve se Fetch foi chamado', () => {
    fetchProducts('computador');
    expect(fetch).toHaveBeenCalledTimes(1);
  })
  it('Ve se Fetch utiliza o Endpoint', () => {
    fetchProducts('computador');
    const url = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';
    expect(fetch).toHaveBeenCalledWith(url);
  })
  it('Ve se o retorno da função fetchProducts é um objeto igual', async () => {
    const response = await fetchProducts('computador');
    expect(response).toEqual(computadorSearch);
  })
  it('Verifica se chamar a função sem parâmetro retorna um erro', async () => {
    const response = await fetchProducts();
    expect(response).toEqual(new Error('You must provide an url'));
  })
});

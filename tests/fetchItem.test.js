require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fetchItem', () => {
  it('Verifica se é uma função', () => {
    expect(typeof fetchItem).toBe('function');
  })
  it('Ve se Fetch foi chamado', () => {
    fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalledTimes(1);
  })
  it('Ve se Fetch utiliza o Endpoint', () => {
    fetchItem('MLB1615760527');
    const url = 'https://api.mercadolibre.com/items/MLB1615760527';
    expect(fetch).toHaveBeenCalledWith(url);
  })
  it('Ve se o retorno da função fetchItem é um objeto igual', async () => {
    const response = await fetchItem('MLB1615760527');
    expect(response).toEqual(item);
  })
  it('Verifica se chamar a função sem parâmetro retorna um erro', async () => {
    const response = await fetchItem();
    expect(response).toEqual(new Error('You must provide an url'));
  })
});

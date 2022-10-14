const localStorageSimulator = require('../mocks/localStorageSimulator');
const saveCartItems = require('../helpers/saveCartItems');

localStorageSimulator('setItem');

describe('3 - Teste a função saveCartItems', () => {
  it('Testa se chamar a função saveCartItems o método localStorage.setItem é executado', () => {
    saveCartItems('aaaaa');
    expect(localStorage.setItem).toHaveBeenCalled()
  })
  it('Testa se chamar a função saveCartItems o método localStorage.setItem é executado com dois parametros', () => {
    const cart = 'aaaaaaa'
    saveCartItems(cart)
    expect(localStorage.setItem).toHaveBeenCalledWith('cartItems', cart);
  })
});

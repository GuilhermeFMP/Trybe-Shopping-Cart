// Esse tipo de comentário que estão antes de todas as funções são chamados de JSdoc,
// experimente passar o mouse sobre o nome das funções e verá que elas possuem descrições! 

// Fique a vontade para modificar o código já escrito e criar suas próprias funções!
/**
 * Função responsável por criar e retornar o elemento de imagem do produto.
 * @param {string} imageSource - URL da imagem.
 * @returns {Element} Elemento de imagem do produto.
 */
const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

/**
 * Função responsável por criar e retornar qualquer elemento.
 * @param {string} element - Nome do elemento a ser criado.
 * @param {string} className - Classe do elemento.
 * @param {string} innerText - Texto do elemento.
 * @returns {Element} Elemento criado.
 */
const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

const cartItemClickListener = (event) => {
  event.target.remove();
};

/**
 * Função responsável por criar e retornar um item do carrinho.
 * @param {Object} product - Objeto do produto.
 * @param {string} product.id - ID do produto.
 * @param {string} product.title - Título do produto.
 * @param {string} product.price - Preço do produto.
 * @returns {Element} Elemento de um item do carrinho.
 */
 const createCartItemElement = ({ id, title, price }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `ID: ${id} | TITLE: ${title} | PRICE: $${price}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
};

/**
 * Função responsável por criar e retornar o elemento do produto.
 * @param {Object} product - Objeto do produto. 
 * @param {string} product.id - ID do produto.
 * @param {string} product.title - Título do produto.
 * @param {string} product.thumbnail - URL da imagem do produto.
 * @returns {Element} Elemento de produto.
 */

 const items = async (item) => {
  const api = await fetchItem(item);
  const cartContainer = document.getElementsByClassName('cart__items')[0];
  const { id, title, price } = api;
  cartContainer.appendChild(createCartItemElement({ id, title, price }));
};

const sumPrices = async (item) => {
  const api = await fetchItem(item);
  const { price } = api;
  let soma = Number(document.getElementsByClassName('total-price')[0].innerText);
  const total = document.getElementsByClassName('total-price')[0];
  soma += Number(price);
  total.innerText = soma.toFixed(2);
};

/**
 * Função que recupera o ID do produto passado como parâmetro.
 * @param {Element} product - Elemento do produto.
 * @returns {string} ID do produto.
 */
 const getIdFromProductItem = (product) => product.querySelector('span.item_id').innerText;

const createProductItemElement = ({ id, title, thumbnail }) => {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item_id', id));
  section.appendChild(createCustomElement('span', 'item__title', title));
  section.appendChild(createProductImageElement(thumbnail));
  const button = createCustomElement('button', 'item__add', 'Adicionar ao carrinho!');
  button.addEventListener('click', async (event) => {
    items(getIdFromProductItem(event.target.parentElement));
    sumPrices(getIdFromProductItem(event.target.parentElement));
  });
  section.appendChild(button);

  return section;
};

const products = async (produto) => {
  const api = await fetchProducts(produto);
  const item = document.querySelector('.items');
  await api.results.forEach(({ id, title, thumbnail }) => {
    item.appendChild(createProductItemElement({
      id, title, thumbnail }));
  });
  document.getElementsByClassName('loading')[0].remove();
};

const buttonEventListener = () => {
  const ul = document.getElementsByClassName('cart__items')[0];
  let child = ul.lastElementChild; 
        while (child) {
            ul.removeChild(child);
            child = ul.lastElementChild;
        }
};

const loading = () => {
  const item = document.getElementsByClassName('cart__items')[0];
  const elemento = document.createElement('p');
  elemento.className = 'loading';
  elemento.textContent = 'carregando...';
  item.appendChild(elemento);
};

window.onload = async () => {
  loading();
  await products('computador');

  const button = document.getElementsByClassName('empty-cart')[0];
  button.addEventListener('click', buttonEventListener);
};

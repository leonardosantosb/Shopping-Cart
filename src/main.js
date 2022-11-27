import { getSavedCartIDs, saveCartID } from './helpers/cartFunctions';
import { searchCep } from './helpers/cepFunctions';
import { fetchProduct, fetchProductsList } from './helpers/fetchFunctions';
import { createCartProductElement, createProductElement } from './helpers/shopFunctions';
import './style.css';

document.querySelector('.cep-button').addEventListener('click', searchCep);

const productsLista = document.querySelector('.products');
const load = document.querySelector('#textoLoad');
const seErro = document.querySelector('#erroLoad');
const carrinhoLista = document.querySelector('.cart__products');

const listaCarro = async (lista) => {
  const listaID = lista.target.parentNode.firstChild.innerHTML;
  saveCartID(listaID);
  const listaFetch = await fetchProduct(listaID);
  carrinhoLista.appendChild(createCartProductElement(listaFetch));
};

const buttonAddCart = () => {
  const buttons = document.querySelectorAll('.product__add');
  buttons.forEach((button) => {
    button.addEventListener('click', listaCarro);
  });
};

const addLista = (listaProdutos) => {
  listaProdutos.forEach((product) => {
    carrinhoLista.appendChild(createCartProductElement(product));
  });
};

const salvaProdutos = async () => {
  const produtosID = getSavedCartIDs();
  const list = await produtosID.map((id) => {
    const prd = fetchProduct(id);
    return prd;
  });
  Promise.all(list)
    .then((resolve) => addLista(resolve));
};

const carregando = () => {
  load.className = 'loading';
  load.innerHTML = 'carregando...';
};
const removeCarregando = () => {
  load.remove();
};
const casoErro = () => {
  seErro.className = 'error';
  seErro.innerHTML = 'Algum erro ocorreu, recarregue a página e tente novamente';
};

const addProdutos = async () => {
  carregando();
  try {
    const produtos = await fetchProductsList('computador');
    removeCarregando();
    produtos.forEach((produto) => {
      const { id, title, thumbnail, price } = produto;
      const lista = createProductElement({ id, title, thumbnail, price });
      productsLista.appendChild(lista);
    });
    buttonAddCart();
  } catch {
    casoErro();
  }
};

window.onload = () => {
  addProdutos();
  salvaProdutos();
};

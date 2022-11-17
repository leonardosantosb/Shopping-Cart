import { searchCep } from './helpers/cepFunctions';
import { fetchProductsList } from './helpers/fetchFunctions';
import { createProductElement } from './helpers/shopFunctions';
import './style.css';

document.querySelector('.cep-button').addEventListener('click', searchCep);

const productsLista = document.querySelector('.products');

const addProdutos = async () => {
  const produtos = await fetchProductsList('computador');
  produtos.forEach((produto) => {
    const { id, title, thumbnail, price } = produto;
    const lista = createProductElement({ id, title, thumbnail, price });
    productsLista.appendChild(lista);
  });
};

window.onload = () => {
  addProdutos();
};

import { searchCep } from './helpers/cepFunctions';
import { fetchProductsList } from './helpers/fetchFunctions';
import { createProductElement } from './helpers/shopFunctions';
import './style.css';

document.querySelector('.cep-button').addEventListener('click', searchCep);

const productsLista = document.querySelector('.products');
const load = document.querySelector('#textoLoad');
const seErro = document.querySelector('#erroLoad');

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
  } catch {
    casoErro();
  }
};

window.onload = () => {
  addProdutos();
};

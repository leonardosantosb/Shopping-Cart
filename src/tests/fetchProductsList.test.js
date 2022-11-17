import './mocks/fetchSimulator';
import { fetchProductsList } from '../helpers/fetchFunctions';
import computadorSearch from './mocks/search';

// implemente seus testes aqui
describe('Teste a função fetchProductsList', () => {
  it('Teste se é uma função', () => {
    expect(fetchProductsList).toBeInstanceOf(Function);
  });
  it('Execute a função fetchProductsList com o argumento computador e teste se fetch foi chamada;', async () => {
    await fetchProductsList('computador');
    expect(fetch).toHaveBeenCalled();
  });
  it('Teste se, ao chamar a função fetchProductsList com o argumento computador, a função fetch utiliza o endpoint ', async () => {
    await fetchProductsList('computador');
    expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/sites/MLB/search?q=computador')
  });
  it('Teste se o retorno da função fetchProductsList com o argumento computador é uma estrutura de dados igual ao objeto computadorSearch, que já está importado no arquivo.', async () => {
    await fetchProductsList('computador').then((data) => {
      expect(data).toEqual(computadorSearch);
    })
  });
  it('Teste se, ao chamar a função fetchProductsList sem argumento, retorna um erro com a mensagem: Termo de busca não informado.', () => {
    expect(fetchProductsList()).rejects.toThrow(error('Termo de busca não informado'));

  });
});

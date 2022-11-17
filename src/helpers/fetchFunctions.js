export const fetchProduct = () => {
};
export const fetchProductsList = async (termo) => {
  if (!termo) throw new Error('Termo de busca não informado');

  const url = `https://api.mercadolibre.com/sites/MLB/search?q=${termo}`;
  const response = await fetch(url);
  const data = await response.json();
  return data.results;
};

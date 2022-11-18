export const fetchProduct = async (ProductID) => {
  if (!ProductID) throw new Error('ID não informado');

  const urlID = `https://api.mercadolibre.com/items/${ProductID}`;
  const responseID = await fetch(urlID);
  const dataID = await responseID.json();
  return dataID
};
export const fetchProductsList = async (termo) => {
  if (!termo) throw new Error('Termo de busca não informado');

  const url = `https://api.mercadolibre.com/sites/MLB/search?q=${termo}`;
  const response = await fetch(url);
  const data = await response.json();
  return data.results;
};

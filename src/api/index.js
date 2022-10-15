import axios from "axios";

const BASE_URL = "https://fakestoreapi.com";

async function getAll() {
  const response = await axios.get(`${BASE_URL}/products`);
  return response.data;
}

async function get(productId) {
  const response = await axios.get(`${BASE_URL}/products/${productId}`);
  return response.data;
}

export { getAll, get };

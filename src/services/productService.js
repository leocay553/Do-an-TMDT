import axios from "axios";

const API_URL = "https://68de685fd7b591b4b78f71b2.mockapi.io/product";


export const fetchProducts = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};


export const fetchProductById = async (id) => {
  const res = await axios.get(`${API_URL}/${id}`);
  return res.data;
};


export const updateProductQuantity = async (id, quantity) => {
  const res = await axios.put(`${API_URL}/${id}`, { quantity });
  return res.data;
};


export const clearCart = async (userId) => {
  const res = await axios.get(API_URL);
  const items = res.data.filter((item) => item.userId === userId);

  await Promise.all(items.map((item) => axios.delete(`${API_URL}/${item.id}`)));
  return true;
};


export const addProduct = async (product) => {
  const res = await axios.post(API_URL, product);
  return res.data;
};

import axios from "axios";

const CART_API = "https://68de685fd7b591b4b78f71b2.mockapi.io/cart";


export const fetchCartItems = async (userId) => {
  const res = await axios.get(CART_API);
  console.log(" Toàn bộ cart:", res.data);
  const userCart = res.data.filter(
    (item) => item.userId === userId || item.userid === userId
  );
  console.log(" Giỏ hàng của user:", userCart);
  return userCart;
};


export const addToCart = async (userId, product) => {
  try {
    console.log(" Gọi addToCart:", userId, product);
    const currentCart = await fetchCartItems(userId);
    const existing = currentCart.find((item) => item.productId === product.id);

    if (existing) {
      console.log(" Đã có trong giỏ, tăng quantity");
      const res = await axios.put(`${CART_API}/${existing.id}`, {
        ...existing,
        quantity: existing.quantity + 1,
      });
      return res.data;
    } else {
      console.log("Chưa có, tạo mới");
      const res = await axios.post(CART_API, {
        userId,
        productId: product.id,
        name: product.name || product.description,
        price: product.price,
        image_url: product.image_url,
        quantity: 1,
      });
      return res.data;
    }
  } catch (err) {
    console.error(" addToCart error:", err);
    throw err;
  }
};


export const updateCartItemQty = async (id, quantity) => {
  const res = await axios.put(`${CART_API}/${id}`, { quantity });
  return res.data;
};


export const removeCartItem = async (id) => {
  const res = await axios.delete(`${CART_API}/${id}`);
  return res.data;
};


export const clearCartByUser = async (userId) => {
  const items = await fetchCartItems(userId);
  await Promise.all(items.map((i) => axios.delete(`${CART_API}/${i.id}`)));
  return true;
};

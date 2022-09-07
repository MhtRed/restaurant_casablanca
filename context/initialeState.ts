import { fetchCart, fetchUser } from "../utils/fetchLocalStorageData";

const userInfo = fetchUser();
const cartInfo = fetchCart();

export const initialeState = {
  user: userInfo,
  meals: null,
  cartShow: false,
  cartItems: cartInfo,
};

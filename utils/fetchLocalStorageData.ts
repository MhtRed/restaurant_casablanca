// Fetch User from LocalStorage
export const fetchUser = () => {
  if (typeof window !== "undefined") {
    const userInfo =
      localStorage.getItem("user") !== "undefined"
        ? JSON.parse(localStorage.getItem("user"))
        : localStorage.clear();
    return userInfo;
  }
  return [];
};

// Fetch CartItems from LocalStorage
export const fetchCart = () => {
  if (typeof window !== "undefined") {
    const cartInfo =
      localStorage.getItem("cartItems") !== "undefined"
        ? JSON.parse(localStorage.getItem("cartItems"))
        : localStorage.clear();
    return cartInfo ? cartInfo : [];
  }
  return [];
};

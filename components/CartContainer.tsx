import React, { useEffect, useState } from "react";
import { MdOutlineKeyboardBackspace, MdRefresh } from "react-icons/md";
import { motion } from "framer-motion";
import { CartItem } from "./";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";
import EmptyCart from "/public/imgs/emptyCart.svg";
import Image from "next/image";

function CartContainer() {
  const [{ user, cartItems }, dispatch] = useStateValue();
  const [tot, setTot] = useState(0);
  const [flag, setFlag] = useState(1);
  useEffect(() => {
    let totalPrice = cartItems.reduce(
      (accumulator, item) => accumulator + item.qty * item.price,
      0
    );
    setTot(totalPrice);
  }, [flag]);

  const clearCart = () => {
    dispatch({
      type: actionType.SET_CART_ITEMS,
      cartItems: [],
    });
    localStorage.setItem("cartItems", JSON.stringify([]));
  };

  // Returning the JSX
  return (
    <motion.div
      initial={{ opacity: 0, x: 200 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 200 }}
      className=" fixed z-[9999] top-0 right-0 w-full md:w-375 h-screen bg-white drop-shadow-md flex flex-col"
    >
      {/*Cart Header */}
      <div className="w-full flex items-center justify-between p-4">
        <motion.div
          whileTap={{ scale: 0.75 }}
          onClick={() => {
            dispatch({
              type: actionType.SET_CART_SHOW,
              cartShow: false,
            });
          }}
        >
          <MdOutlineKeyboardBackspace className="text-textColor text-3xl cursor-pointer" />
        </motion.div>
        <p className="text-lg text-textColor font-semibold">Cart</p>
        <motion.p
          onClick={clearCart}
          whileTap={{ scale: 0.75 }}
          className="flex items-center justify-center gap-2 px-2 py-1 my-2 bg-gray-100 text-textColor text-base rounded-md hover:shadow-md cursor-pointer"
        >
          Clear <MdRefresh className="" />
        </motion.p>
      </div>
      {/*Cart body */}
      {cartItems && cartItems.length > 0 && (
        <div className="w-full h-full bg-cartBg flex flex-col rounded-3xl">
          {/*Cart Items block */}
          <div className="w-full h-340 md:h-42 px-6 py-10 flex flex-col gap-3 overflow-y-scroll scrollbar-none">
            {cartItems.length > 0 &&
              cartItems.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  setFlag={setFlag}
                  flag={flag}
                />
              ))}
          </div>
          {/*Cart Total */}
          <div className="w-full flex-1  bg-cartTotal rounded-t-[2rem] flex flex-col items-center justify-evenly px-8 py-2 ">
            <div className="w-full flex items-center justify-between ">
              <p className="text-gray-400 text-lg">Sub total</p>
              <p className="text-gray-400 text-lg"> {tot} Dhs</p>
            </div>
            <div className="w-full flex items-center justify-between ">
              <p className="text-gray-400 text-lg">Delivery</p>
              <p className="text-gray-400 text-lg"> 15 Dhs</p>
            </div>
            <div className="w-full border-b border-gray-600 my-2"></div>
            <div className="w-full flex items-center justify-between ">
              <p className="text-gray-200 text-xl font-semibold">Total</p>
              <p className="text-gray-200 text-xl font-semibold">
                 {tot + 15} Dhs
              </p>
            </div>
            {user ? (
              <motion.button
                whileTap={{ scale: 0.75 }}
                className=" w-full p-2 rounded-full bg-gradient-to-tl from-orange-400 to-orange-600 text-gray-50 text-lg my-2 hover:shadow-lg font-semibold tracking-wide "
              >
                Check-out
              </motion.button>
            ) : (
              <motion.button
                whileTap={{ scale: 0.75 }}
                className=" w-full p-2 rounded-full bg-gradient-to-tl from-orange-400 to-orange-600 text-gray-50 text-lg my-2 hover:shadow-lg font-semibold tracking-wide "
              >
                Login to checkout
              </motion.button>
            )}
          </div>
        </div>
      )}
      {cartItems.length === 0 && (
        <div className="w-full h-full flex flex-col items-center justify-center gap-10">
          <div className="w-300 h-3/6 relative">
            <Image layout="fill" src={EmptyCart} alt="empty cart" />
          </div>
          <p className="text-xl text-textColor font-semibold">
            Add some items to your cart
          </p>
        </div>
      )}
    </motion.div>
  );
}

export default CartContainer;

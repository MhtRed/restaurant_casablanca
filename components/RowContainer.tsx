import React, { useEffect, useRef } from "react";
import { MdShoppingBasket } from "react-icons/md";
import { motion } from "framer-motion";
import NotFound from "/public/imgs/NotFound.svg";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";
import Image from "next/image";

function RowContainer({ flag, data, scrollValue }) {
  const [{ cartItems }, dispatch] = useStateValue();
  const cart = cartItems;
  // The addToCart function
  const addToCart = (item) => {
    if (!cart.includes(item)) {
      cart.push(item);
    }
    dispatch({
      type: actionType.SET_CART_ITEMS,
      cartItems: cart,
    });
    localStorage.setItem("cartItems", JSON.stringify(cart));
  };
  const rowContainerRef = useRef(null);
  useEffect(() => {
    rowContainerRef.current.scrollLeft = scrollValue;
  }, [scrollValue]);

  // Returning the JSX
  return (
    <div
      ref={rowContainerRef}
      className={`w-full flex items-center gap-3 scroll-smooth  ${
        flag
          ? "overflow-x-auto scrollbar-none"
          : "overflow-x-hidden flex-wrap justify-center"
      }`}
    >
      {data &&
        data.map((item) => (
          <div
            key={item.id}
            className=" w-275 h-auto min-w-[275px] md:w-300 md:min-w-[300px]  bg-cardOverlay rounded-lg p-2 my-12 backdrop-blur-lg hover:drop-shadow-lg flex flex-col items-center justify-between"
          >
            <div className="w-full flex items-center justify-between ">
              <motion.img
                whileHover={{ scale: 1.2 }}
                src={item.imageURL}
                alt={item.titles}
                className="w-40 h-40 object-contain -mt-8 drop-shadow-2xl"
              />
              <motion.div
                onClick={() => addToCart(item)}
                whileTap={{ scale: 0.75 }}
                className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center cursor-pointer hover:shadow-lg hover:bg-red-600"
              >
                <MdShoppingBasket className="text-white" />
              </motion.div>
            </div>
            <div className="w-full flex flex-col  items-end justify-end">
              <p className="text-textColor text-base md:text-lg text font-semibold">
                {item.title}
              </p>
              <p className="mt2 text-sm text-gray-500">
                {item.calories} Calories
              </p>
              <div className="flex items-center gap-8">
                <p className="text-lg text-headingColor font-semibold">
                  {item.price} <span className="text-sm text-red-600">£</span> 
                </p>
              </div>
            </div>
          </div>
        ))}
      {data && data.length === 0 && (
        <div className="w-full flex flex-col items-center justify-center">
          <div className="w-full h-340 relative">
            <Image layout="fill" src={NotFound} alt="not found" />
          </div>
          <p className=" text-xl text-headingColor font-semibold my-2">
            There is no items available in this category
          </p>
        </div>
      )}
    </div>
  );
}

export default RowContainer;

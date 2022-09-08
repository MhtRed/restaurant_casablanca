import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { BiMinus, BiPlus } from "react-icons/bi";
import { actionType } from "../context/reducer";
import { useStateValue } from "../context/StateProvider";
import Image from "next/image";
let items = [];

function CartItem({ item, setFlag, flag }) {
  const [{ cartItems }, dispatch] = useStateValue();
  const [qty, setQty] = useState(item.qty);

  const cartDispatch = () => {
    localStorage.setItem("cartItems", JSON.stringify(items));
    dispatch({
      type: actionType.SET_CART_ITEMS,
      cartItems: items,
    });
  };
  // Update Quantity function
  const updateQty = (action, id) => {
    if (action === "add") {
      setQty(qty + 1);
      cartItems.map((item) => {
        if (item.id === id) {
          item.qty += 1;
          setFlag(flag + 1);
        }
      });
      cartDispatch();
    }
    if (action === "remove") {
      if (qty === 1) {
        items = items.filter((item) => item.id !== id);
        setFlag(flag + 1);
        cartDispatch();
      } else {
        setQty(qty - 1);
        cartItems.map((item) => {
          if (item.id === id) {
            item.qty -= 1;
            setFlag(flag + 1);
          }
        });
        cartDispatch();
      }
    }
  };

  useEffect(() => {
    items = cartItems;
  }, []);

  // Returning the JSX
  return (
    <div className="w-full p-1 px-2 rounded-lg bg-cartItem flex items-center">
      <div className="w-20 h-20 max-w-[60px] rounded-full relative">
        <Image
          src={item.imageURL}
          alt={item.title}
          layout="fill"
          className="object-contain"
        />
      </div>
      <div className="flex flex-col gap-2 ml-4">
        <p className=" text-base text-gray-50">{item.title}</p>
        <p className=" text-xs block text-gray-300 font-semibold">
          {qty} x {item.price} Dhs ={" "}
          <span className="text-sm">{(qty * item.price).toFixed(2)} Dhs</span>
        </p>
      </div>
      <div className="group flex items-center gap-2 ml-auto  ">
        <motion.div
          onClick={() => updateQty("remove", item.id)}
          whileTap={{ scale: 0.75 }}
        >
          <BiMinus className="text-gray-50 cursor-pointer" />
        </motion.div>
        <p className="w-5 h-5 rounded-sm bg-cartBg text-gray-50 flex items-center justify-center ">
          {item.qty}
        </p>
        <motion.div
          onClick={() => updateQty("add", item.id)}
          whileTap={{ scale: 0.75 }}
        >
          <BiPlus className="text-gray-50 cursor-pointer" />
        </motion.div>
      </div>
    </div>
  );
}

export default CartItem;

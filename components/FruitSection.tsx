import React, { useState } from "react";
import { motion } from "framer-motion";
import { RowContainer } from "./";
import { MdChevronRight, MdChevronLeft } from "react-icons/md";
import { useStateValue } from "../context/StateProvider";

export default function FruitSection() {
  const [{ meals }] = useStateValue();
  const [scrollValue, setScrollValue] = useState(0);
  return (
    //Returning the JSX
    <section className="w-full my-6">
      <div className="w-full flex items-center justify-between">
        {/*Title section */}
        <p className="text-2xl font-semibold capitalize text-headingColor relative before:absolute before:rounded-lg before:content before:w-20 before:h-1 before:left-0 before:-bottom-2 before:bg-gradient-to-tr from-orange-400 to-orange-600 transition-all duration-100 ease-in-out">
          Our fresh & healthy fruits
        </p>
        {/*scroll buttons section */}
        <div className="hidden md:flex gap-3 items-center ">
          <motion.div
            whileTap={{ scale: 0.75 }}
            className="w-8 h-8 rounded-lg bg-orange-300 hover:bg-orange-500  flex items-center justify-center cursor-pointer hover:shadow-lg"
            onClick={() => {
              setScrollValue(scrollValue - 300);
            }}
          >
            <MdChevronLeft className="text-lg text-orange-900" />
          </motion.div>
          <motion.div
            whileTap={{ scale: 0.75 }}
            className="w-8 h-8 rounded-lg bg-orange-300 hover:bg-orange-500  flex items-center justify-center cursor-pointer hover:shadow-lg"
            onClick={() => {
              setScrollValue(scrollValue + 300);
            }}
          >
            <MdChevronRight className="text-lg text-orange-900" />
          </motion.div>
        </div>
      </div>
      <RowContainer
        scrollValue={scrollValue}
        flag={true}
        data={meals?.filter((item) => item.category === "fruits")}
      />
    </section>
  );
}
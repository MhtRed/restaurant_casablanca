import React from "react";
import Delivery from "../public/imgs/delivery.png";
import HeroBg from "../public/imgs/heroBg.png";
import { bestData } from "../data/data";
import Image from "next/image";
import Link from "next/link";

export default function HomeContainer({ title, content }) {
  return (
    <section id="home" className="grid gap-2 grid-cols-1 md:grid-cols-2 w-full">
      {/*The left side */}
      <div className=" py-2 flex-1 flex flex-col items-start justify-center gap-6">
        {/*Bike delivery Box */}
        <div className="flex items-center justify-center gap-2 bg-orange-100 px-4 py-1 rounded-full">
          <p className="text-base text-orange-500 font-semibold">
            Bike Delivery
          </p>
          <div className="w-8 h-8 bg-white rounded-full overflow-hidden drop-shadow-xl">
            <Image
              width="32"
              height="32"
              src={Delivery}
              alt="delivey"
              className="object-contain"
            />
          </div>
        </div>
        {/*The title paragraph */}
        <p className="text-[2.5rem]  lg:text-[3rem] font-bold tracking-wide text-headingColor">
          {title}{" "}
          <span className="text-orange-600 text-[3rem]  lg:text-[3.5rem]">
            Your City
          </span>
        </p>
        {/*The text paragraph */}
        <p className="text-base text-textColor text-center md:text-left md:w-[80%]">
          {content}
        </p>
        {/*The Order button */}
        <Link href="/menu">
          <button
            type="button"
            className="bg-gradient-to-br from-orange-400 to-orange-500 w-full md:w-auto px-4 py-2 rounded-lg hover:shadow-lg transition-all ease-in-out duration-100"
          >
            Order Now
          </button>
        </Link>
      </div>
      {/*The right side */}
      <div className=" py-2 flex-1 flex items-center relative">
        <div className="ml-auto h-420 w-full lg:h-510 relative" >
          <Image src={HeroBg} alt="hero-bg" layout="fill" priority />
        </div>
        <div className="w-full h-full absolute top-5 left-0 flex items-center justify-center lg:px-16 py-4 gap-4 flex-wrap">
          {bestData.map((item) => (
            <div
              key={item.id}
              className="w-[140px] min-w-[140px]  p-4 bg-cardOverlay backdrop-blur-md rounded-3xl flex flex-col items-center justify-center drop-shadow-lg"
            >
              <div className="w-20 h-20 lg:w-[108px] lg:h-[108px] -mt-10 lg:-mt-10 relative flex justify-center ">
                <Image src={item.imageSrc} alt={item.name} layout="fill" />
              </div>
              <p className="text-base lg:text-xl text-textColor font-semibold mt-2 lg:mt-4">
                {item.name}
              </p>
              <p className="text[12px] lg:text-sm text-lightTextGray font-semibold my-1 lg:my-3">
                {item.description}
              </p>
              <p className="text-sm  font-semibold text-headingColor">
                {item.price} <span className="text-xs text-red-600">£</span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

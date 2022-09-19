import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import CheckoutItem from "../components/CheckoutItem";
import { useStateValue } from "../context/StateProvider";
import { getAllOrders, saveOrder } from "../utils/firebaseFunctions";

export default function Checkout() {
  // useStateValue Provider
  const [{ cartItems }] = useStateValue();
  // The different states
  const [tot, setTot] = useState(0);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [fields, setFields] = useState(false);
  const [alertStatus, setAlertStatus] = useState("danger");
  const [msg, setMsg] = useState(null);
  const deliveryCharge = 35;

  // SaveOrder function
  const submitOrder = () => {
    setIsLoading(true);
    try {
      if (!firstName || !lastName || !address || !city || !phone) {
        setFields(true);
        setMsg("Required fields can't be empty");
        setAlertStatus("danger");
        setTimeout(() => {
          setFields(false);
          setIsLoading(false);
        }, 4000);
      } else {
        const order = {
          id: `${Date.now()}`,
          status: "pending",
          clientInfos: {
            firstName: firstName,
            lastName: lastName,
            address: address,
            city: city,
            phone: phone,
          },
          meals: cartItems.map((item) => ({
            MealId: item.id,
            mealTitle: item.title,
            mealQty: item.qty,
          })),
          Amount: tot + deliveryCharge,
        };
        saveOrder(order);
        setIsLoading(false);
        setFields(true);
        setAlertStatus("success");
        clearData();
        // fetchData();
        setMsg("Thank you for your order! It will be fullfilled in the next hour.");
        setTimeout(() => {
          setFields(false);
        }, 4000);
      }
    } catch (error) {
      console.log(error);
      setFields(true);
      setMsg("Error while submiting... Try Again!");
      setAlertStatus("danger");
      setTimeout(() => {
        setFields(false);
        setIsLoading(false);
      }, 4000);
    }
  };
  // The clear Data function
  const clearData = () => {
    setFirstName("");
    setLastName("");
    setAddress("");
    setCity("");
    setPhone("");
  };
  //Side Effects
  useEffect(() => {
    let totalPrice = cartItems.reduce(
      (accumulator, item) => accumulator + item.qty * item.price,
      0
    );
    setTot(totalPrice);
  }, []);
  //Returning the JSX
  return (
    <div className=" w-full h-fit grid grid-cols-1 md:grid-cols-2">
      <div className="mx-auto w-full space-y-3 md:order-2">
        <div className="w-full bg-gray-200 flex flex-col rounded-3xl px-8 py-4">
          <div>
            <h2 className="text-3xl font-semibold text-headingColor ">
              Order Summary
            </h2>
            <p className="text-gray-500 text-sm mb-2">
              Please verify your order
            </p>
          </div>
          {/*Checkout Items block */}
          <div className="w-full h-340 md:h-42 py-4 flex flex-col gap-3 overflow-y-scroll scrollbar-none">
            {cartItems.map((item) => (
              <CheckoutItem key={item.id} item={item} />
            ))}
          </div>
          {/*Checkout Total */}
          <div className="w-full h-340 flex-1  bg-gray-300 rounded-b-3xl flex flex-col items-center justify-evenly px-8 py-2 ">
            <div className="w-full flex items-center justify-between ">
              <p className="text-orange-500 text-lg">Sub total</p>
              <p className="text-orange-600 text-lg"> {tot.toFixed(2)} £</p>
            </div>
            <div className="w-full flex items-center justify-between ">
              <p className="text-orange-500 text-lg">Delivery</p>
              <p className="text-orange-600 text-lg"> {deliveryCharge} £</p>
            </div>
            <div className="w-full border-b border-gray-600 my-2"></div>
            <div className="w-full flex items-center justify-between ">
              <p className="text-orange-500 text-xl font-semibold">Total</p>
              <p className="text-orange-600 text-lg font-semibold">
                {(tot + deliveryCharge).toFixed(2)} £
              </p>
            </div>
          </div>
        </div>
      </div>
      <form className=" p-4 mx-auto w-full space-y-3 md:order-1">
        <div>
          <h2 className="text-3xl font-semibold text-headingColor ">
            Shipping Informations
          </h2>
          <p className="text-gray-500 text-sm">
            Please enter your real informations
          </p>
        </div>
        {/* firstname and lastname Inputs */}
        <div className="flex space-x-4">
          <div className="w-1/2">
            <label htmlFor="firstname">First name</label>
            <input
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="border border-gray-200 block py-2 px-4 w-full rounded outline-none focus:border-gray-400 text-textColor"
              type="text"
              name="firtname"
              id="firstname"
            />
          </div>
          <div className="w-1/2">
            <label htmlFor="lastname">Last name</label>
            <input
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="border border-gray-200 block py-2 px-4 w-full rounded outline-none focus:border-gray-400 text-textColor"
              type="text"
              name="lastname"
              id="lastname"
            />
          </div>
        </div>
        {/* address Input */}
        <div className="">
          <label htmlFor="address">Address</label>
          <input
            required
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="border border-gray-200 block py-2 px-4 w-full rounded outline-none focus:border-gray-400 text-textColor"
            type="text"
            name="address"
            id="address"
          />
          <p className="text-gray-500 text-sm">
            We will ship your order to this address
          </p>
        </div>
        {/* city and phone Inputs */}
        <div className="flex space-x-4">
          <div className="w-1/3">
            <label htmlFor="city">City</label>
            <input
              required
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="border border-gray-200 block py-2 px-4 w-full rounded outline-none focus:border-gray-400 text-textColor"
              type="text"
              name="city"
              id="city"
            />
          </div>
          <div className="w-2/3">
            <label htmlFor="phone">Phone</label>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="border border-gray-200 block py-2 px-4 w-full rounded outline-none focus:border-gray-400 text-textColor"
              type="phone"
              name="phone"
              id="phone"
            />
          </div>
        </div>
        <button
          type="button"
          className="bg-gradient-to-br from-orange-400 to-orange-500 w-full md:w-auto px-4 py-2 rounded-lg hover:shadow-lg transition-all ease-in-out duration-100 "
          onClick={submitOrder}
        >
          Confirm Order
        </button>
        {/*The Msg field section */}
        {fields && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`w-full p-2 rounded-lg text-center text-lg font-semibold ${
              alertStatus === "danger"
                ? "bg-red-400 text-red-800"
                : "bg-emerald-400 text-emerald-800"
            }`}
          >
            {msg}
          </motion.p>
        )}
      </form>
    </div>
  );
}

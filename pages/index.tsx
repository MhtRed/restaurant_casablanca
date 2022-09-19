import React, { useEffect } from "react";
import {
  HomeContainer,
  MenuContainer,
  CartContainer,
  FruitSection,
} from "../components";
import { actionType } from "../context/reducer";
import { useStateValue } from "../context/StateProvider";
import { getAllMeals } from "../utils/firebaseFunctions";
export default function Home() {
  const [{ cartShow }, dispatch] = useStateValue();
  //Fetch All Meals
  const fetchData = async () => {
    await getAllMeals().then((data) =>
      dispatch({
        type: actionType.SET_MEALS,
        meals: data,
      })
    );
  };
  useEffect(() => {
    fetchData();
  }, []);

  // Returning the JSX
  return (
    <div className="w-full h-auto flex flex-col items-center justify-center">
      <HomeContainer
        title="The fastest delivery in"
        content="All of our menu items are inspired by Italian cuisine and have been
          created by our head chef, after studying authentic cuisine in
          Lausanne. Not only do we have fresh flown-in seafood from the
          The North sea, but we also have a variety of handcrafted cocktails, and
          drinks to choose from. Order for delivery or Come dine with us &
          experience an authentic tasty meal in an intimate dining space. We
          look forward to serving you!"
      />
      <FruitSection />
      <MenuContainer text="Hot Dishes" />
      {cartShow && <CartContainer />}
    </div>
  );
}

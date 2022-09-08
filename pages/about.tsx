import { CartContainer, HomeContainer } from "../components";
import { useStateValue } from "../context/StateProvider";

export default function About() {
  const [{ cartShow }, dispatch] = useStateValue();
  return (
    <>
      <HomeContainer
        title="About"
        content="All of our menu items are inspired by Moroccan cuisine and have been
      created by our head chef, after studying authentic cuisine in
          Lausanne. Not only do we have fresh flown-in seafood from the
          Atlantic, but we also have a variety of handcrafted cocktails, and
          drinks to choose from. Order for delivery or Come dine with us &
          experience an authentic tasty meal in an intimate dining space. We
          look forward to serving you!"
      />
      {cartShow && <CartContainer />}
    </>
  );
}

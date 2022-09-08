import { CartContainer, HomeContainer } from "../components";
import { useStateValue } from "../context/StateProvider";

export default function Services() {
  const [{ cartShow }, dispatch] = useStateValue();
  return (
    <>
      <HomeContainer
        title="Our Values in"
        content="Our mission is to exceed customers's expectations in every sence by
      providing ambiance for every sensory perception. The atmosphere and
      the the food will please the customer's hearing, taste, smell touch,
    and sight, and provide an excelent creative enviroment. The employees
    are trained with excelllent customer service and empowerd to make
    decision based on our restaurant philosophy and values."
      />
      {cartShow && <CartContainer />}
    </>
  );
}

import { CartContainer, MenuContainer } from "../components";
import { useStateValue } from "../context/StateProvider";

export default function Menu() {
  const [{ cartShow }, dispatch] = useStateValue();
  return (
    <>
      <MenuContainer text="Menu" />
      {cartShow && <CartContainer />}
    </>
  );
}

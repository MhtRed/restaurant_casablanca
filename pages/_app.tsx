import "../styles/globals.css";
import { AnimatePresence } from "framer-motion";
import reducer from "../context/reducer";
import { initialeState } from "../context/initialeState";
import { StateProvider } from "../context/StateProvider";

import dynamic from "next/dynamic";

const Header = dynamic(() => import("../components/Header"), { ssr: false });
const Footer = dynamic(() => import("../components/Footer"), { ssr: false });

function MyApp({ Component, pageProps }) {
  return (
    <AnimatePresence exitBeforeEnter>
      <StateProvider initialeState={initialeState} reducer={reducer}>
        <div className=" min-h-screen flex flex-col bg-primary over ">
          <Header />
          <main className="mt-[56px] md:mt-[88px] px-4 md:px-16 py-4 w-full flex flex-grow">
            <Component {...pageProps} />
          </main>
          <Footer />
        </div>
      </StateProvider>
    </AnimatePresence>
  );
}

export default MyApp;

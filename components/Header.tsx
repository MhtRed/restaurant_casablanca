import { motion } from "framer-motion";
import Link from "next/link";
import {
  MdShoppingBasket,
  MdAdd,
  MdLogout,
  MdDesignServices,
  MdHome,
  MdMenu,
  MdOutlinePeople,
} from "react-icons/md";

import Image from "next/image";
import { useState } from "react";
import { useStateValue } from "../context/StateProvider";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from "../firebase.config";

import { actionType } from "../context/reducer";

export default function Header() {
  //Local States
  const [isDropMenu, setIsDropMenu] = useState(false);
  const [{ user, cartItems, cartShow }, dispatch] = useStateValue();
  const Avatar = user?.photoURL;

  // Login using firebase
  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const login = async () => {
    const { user } = await signInWithPopup(firebaseAuth, provider);
    const { refreshToken, providerData } = user;
    dispatch({
      type: actionType.SET_USER,
      user: providerData[0],
    });
    localStorage.setItem("user", JSON.stringify(providerData[0]));
  };

  // dropMenu function
  const dropMenu = () => {
    setIsDropMenu(!isDropMenu);
  };
  // logout function
  const logout = () => {
    setIsDropMenu(!isDropMenu);
    localStorage.clear();
    dispatch({
      type: actionType.SET_USER,
      user: null,
    });
  };

  return (
    <header className="fixed z-50 w-screen p-3 px-4 md:p-6 md:px-16 bg-primary">
      {/*desktop & tablet */}
      <div className="hidden md:flex w-full h-full items-center justify-between">
        <Link href="/">
          <a className="flex items-center gap-2">
            <Image
              width="32"
              height="40.14"
              src="/imgs/logo.png"
              alt="logo"
              className="object-cover"
            />
            <p className="text-headingColor text-xl font-bold">City</p>
          </a>
        </Link>
        <div className="flex items-center gap-8">
          <motion.ul
            initial={{ opacity: 0, x: 200 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 200 }}
            className="flex items-center gap-8"
          >
            <Link href="/">
              <li className="text-base text-textColor hover:text-headingColor cursor-pointer duration-100 transition-all ease-in-out ">
                Home
              </li>
            </Link>
            <Link href="/menu">
              <li className="text-base text-textColor hover:text-headingColor cursor-pointer duration-100 transition-all ease-in-out ">
                Menu
              </li>
            </Link>
            <Link href="/about">
              <li className="text-base text-textColor hover:text-headingColor cursor-pointer duration-100 transition-all ease-in-out ">
                About
              </li>
            </Link>
            <Link href="/services">
              <li className="text-base text-textColor hover:text-headingColor cursor-pointer duration-100 transition-all ease-in-out ">
                Services
              </li>
            </Link>
          </motion.ul>
          {/*Cart information */}
          <div
            onClick={() => {
              dispatch({ type: actionType.SET_CART_SHOW, cartShow: !cartShow });
            }}
            className="relative flex items-center justify-center cursor-pointer"
          >
            <MdShoppingBasket className="text-textColor text-2xl " />
            {cartItems && cartItems.length > 0 && (
              <div className="absolute -top-1 -right-2 w-5 h-5 rounded-full bg-cartNumBg flex justify-center items-center">
                <p className="text-sm text-white font-semibold ">
                  {cartItems.length}
                </p>
              </div>
            )}
          </div>
          <div className="relative rounded-full">
            <motion.div
              whileTap={{ scale: 0.6 }}
              className="w-10 min-w-[40px] h-10 min-h-[40px] rounded-full drop-shadow-xl"
            >
              <Image
                src={user ? Avatar : "/imgs/avatar.png"}
                alt="userProfile"
                width="40"
                height="40"
                className="  cursor-pointer rounded-full"
                onClick={!user ? login : dropMenu}
              />
            </motion.div>
            {isDropMenu && (
              <motion.div
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                className="w-40 bg-gray-50 shadow-xl rounded-lg absolute right-0 top-12 flex flex-col overflow-hidden "
              >
                {user.email === "mou.redouan@gmail.com" && (
                  <Link href="/createitem">
                    <p
                      onClick={() => setIsDropMenu(!isDropMenu)}
                      className="px-4 py-2 flex items-center justify-between cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base "
                    >
                      New Item <MdAdd />
                    </p>
                  </Link>
                )}
                <p
                  onClick={logout}
                  className="px-4 py-2 flex items-center justify-between cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base "
                >
                  Logout <MdLogout />
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>
      {/*mobile */}
      <div className="flex md:hidden w-full h-full items-center justify-between">
        {/*Cart information */}
        <div
          onClick={() => {
            dispatch({ type: actionType.SET_CART_SHOW, cartShow: !cartShow });
          }}
          className="relative flex items-center justify-center cursor-pointer"
        >
          <MdShoppingBasket className="text-textColor text-2xl  " />
          {cartItems && cartItems.length > 0 && (
            <div className="absolute -top-1 -right-2 w-5 h-5 rounded-full bg-cartNumBg flex justify-center items-center">
              <p className="text-sm text-white font-semibold ">
                {cartItems.length}
              </p>
            </div>
          )}
        </div>
        <Link href="/">
          <a className="flex items-center gap-2">
            <Image
              src="/imgs/logo.png"
              alt="logo"
              width="32"
              height="40.14"
              className="w-8 object-cover"
            />
            <p className="text-headingColor text-xl font-bold">City</p>
          </a>
        </Link>
        <div className="relative">
          <motion.div
            whileTap={{ scale: 0.6 }}
            className="w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-xl "
          >
            <Image
              src={user ? Avatar : "/imgs/avatar.png"}
              alt="userProfile"
              width="40"
              height="40"
              className=" cursor-pointer rounded-full"
              onClick={!user ? login : dropMenu}
            />
          </motion.div>
          {isDropMenu && (
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              className="w-40 bg-gray-50 shadow-xl rounded-lg absolute right-0 top-12 flex flex-col "
            >
              {user.email === "mou.redouan@gmail.com" && (
                <Link href="/createitem">
                  <p
                    onClick={() => setIsDropMenu(!isDropMenu)}
                    className="px-4 py-2 flex items-center justify-between cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base"
                  >
                    New Item <MdAdd />
                  </p>
                </Link>
              )}
              <Link href="/">
                <p
                  onClick={() => setIsDropMenu(!isDropMenu)}
                  className="px-4 py-2 flex items-center justify-between cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base"
                >
                  Home <MdHome />
                </p>
              </Link>
              <Link href="/menu">
                <p
                  onClick={() => setIsDropMenu(!isDropMenu)}
                  className="px-4 py-2 flex items-center justify-between cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base"
                >
                  Menu <MdMenu />
                </p>
              </Link>
              <Link href="/about">
                <p
                  onClick={() => setIsDropMenu(!isDropMenu)}
                  className="px-4 py-2 flex items-center justify-between cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base"
                >
                  About <MdOutlinePeople />
                </p>
              </Link>
              <Link href="/services">
                <p
                  onClick={() => setIsDropMenu(!isDropMenu)}
                  className="px-4 py-2 flex items-center justify-between cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base"
                >
                  Services <MdDesignServices />
                </p>
              </Link>
              <p
                onClick={logout}
                className="m-2 p-2 rounded-md shadow-md flex items-center justify-center gap-3 cursor-pointer bg-slate-200 hover:bg-slate-300 transition-all duration-100 ease-in-out text-textColor text-base"
              >
                Logout <MdLogout />
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </header>
  );
}

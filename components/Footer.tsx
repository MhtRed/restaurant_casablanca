import React from "react";
import { BsFacebook, BsInstagram, BsTwitter } from "react-icons/bs";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import styles from "../styles/Footer.module.css";

export default function Footer() {
  return (
    <footer className="w-full h-fit grid grid-cols-1 md:grid-cols-2 gap-8 lg:grid-cols-4 bg-cardOverlay p-10 ">
      <div className="flex flex-col justify-start items-center">
        <h5 className="text-xl text-headingColor font-semibold mb-3">
          Our Hours
        </h5>
        <p className="text-textColor text-base md:text-lg text font-semibold">
          Monday - Thursday
        </p>
        <p className="mt2 text-sm text-gray-500">8am — 11pm</p>
        <p className="text-textColor text-base md:text-lg text font-semibold">
          Friday - Sunday
        </p>
        <p className="mt2 text-sm text-gray-500">11am — 11pm</p>
      </div>
      <div className="flex flex-col justify-start items-center">
        <h5 className="text-xl text-headingColor font-semibold mb-3">
          Socials
        </h5>
        <div className="flex items-center justify-around space-x-3">
          <a
            className="text-xl text-blue-800"
            href="https://facebook.com/"
            target="_blank"
            rel="noreferrer"
          >
            <BsFacebook />
          </a>
          <a
            className="text-xl text-rose-500"
            href="https://www.instagram.com/"
            target="_blank"
            rel="noreferrer"
          >
            <BsInstagram />
          </a>
          <a
            className="text-xl text-blue-400"
            href="https://twitter.com/"
            target="_blank"
            rel="noreferrer"
          >
            <BsTwitter />
          </a>
        </div>
      </div>
      <div className="flex flex-col justify-start items-center">
        <h5 className="text-xl text-headingColor font-semibold mb-3">
          Address
        </h5>
        <p className="text-textColor text-base md:text-lg text font-semibold text-center">
          5 Av. Marie-Thérèse <br />
          Ex Albert Samain Ang <br />
          Rue de la Semois <br />
          2132 Luxembourg
        </p>
      </div>
      <div className="  min-h-[200px] ">
        <MapContainer
          className={styles.leaflet}
          center={[49.607472145417375, 6.122540350772001]}
          zoom={10}
          scrollWheelZoom={true}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={[49.607472145417375, 6.122540350772001]}>
            <Popup>
              This is our location
              <br /> City Restaurant
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </footer>
  );
}

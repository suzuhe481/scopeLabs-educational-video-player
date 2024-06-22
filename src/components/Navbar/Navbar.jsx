import { useState, useEffect } from "react";

import Logo from "../../assets/images/FULL_LOGO_DARK.png";
import LogoMobile from "../../assets/images/LOGO_ICON.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

import styles from "./Navbar.module.scss";

import Logo from "../../assets/images/LOGO_ICON.png";

const Navbar = () => {
  return (
    <div className={`${styles.navbar} ${styles["no-highlight"]}`}>
      <a href="/">
        <img src={Logo}></img>
      </a>
      <div className={`${styles["button-container"]}`}>
        <a href="/upload">
          <button className={`${styles["button"]}`}>Upload</button>
        </a>
      </div>
    </div>
  );
};

export default Navbar;

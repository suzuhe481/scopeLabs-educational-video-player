import { useState, useEffect } from "react";

import Logo from "../../assets/images/FULL_LOGO_DARK.png";
import LogoMobile from "../../assets/images/LOGO_ICON.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faX } from "@fortawesome/free-solid-svg-icons";

import styles from "./Navbar.module.scss";

const Navbar = () => {
  // State variable to determine which logo to display.
  // Logo - Desktop
  // LogoMobile - For mobile/smaller screens
  const [onMobile, setOnMobile] = useState(() => {
    if (window.innerWidth < 600) {
      return true;
    } else {
      return false;
    }
  });

  // Sets state to determine if user is on a small screen (mobile).
  const handleScreenSizeChange = () => {
    if (window.innerWidth < 600) {
      setOnMobile(true);
    } else {
      setOnMobile(false);
    }
  };

  // Adds eventListener for changing screen size.
  useEffect(() => {
    window.addEventListener("resize", handleScreenSizeChange);
  });

  return (
    <div className={`${styles.navbar} ${styles["no-highlight"]}`}>
      <div className={`${styles["search-container"]}`}>
        <FontAwesomeIcon icon={faMagnifyingGlass} className={styles.icon} />
        <input type="text" placeholder="Search Videos..." />
      </div>

      <div className={`${styles["logo-container"]}`}>
        <a href="/">
          <img src={`${onMobile ? LogoMobile : Logo}`}></img>
        </a>
      </div>

      <div className={`${styles["button-container"]}`}>
        <a
          href="/upload"
          className={`${styles["button"]} ${styles["remove-link-style"]}`}
        >
          Upload
        </a>
      </div>
    </div>
  );
};

export default Navbar;

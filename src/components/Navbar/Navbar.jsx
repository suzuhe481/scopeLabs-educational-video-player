import styles from "./Navbar.module.scss";

import Logo from "../../assets/images/LOGO_ICON.png";

const Navbar = () => {
  return (
    <div className={`${styles.navbar} ${styles["no-highlight"]}`}>
      <a href="/">
        <img src={Logo}></img>
      </a>
      <div className={`${styles["button-container"]}`}>
        <button className={`${styles["button"]}`}>Upload</button>
      </div>
    </div>
  );
};

export default Navbar;

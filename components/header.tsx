import Image from "next/image";

import styles from "@/components/header.module.scss";
import LogoImg from "../public/hexagon-dice.svg";
import useWindowSize from "./useWindowSize";

const Header = () => {
  const screenWidth = useWindowSize().width;
  function isMobile() {
    if (screenWidth) {
      return screenWidth < 780;
    }
    return false;
  }

  return (
    <header className={styles.header}>
      <Image className={styles.headerLogo} src={LogoImg} alt="" />
      <div className={styles.headerTextContainer}>
        <p
          className={!isMobile() ? styles.headerText : styles.headerTextMobile}
        >
          Count me in!
        </p>
      </div>
    </header>
  );
};

export default Header;

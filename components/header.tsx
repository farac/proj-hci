import Image from "next/image";

import styles from "@/components/header.module.scss";
import LogoImg from "../public/hexagon-dice.svg";

const Header = () => {
  return (
    <header className={styles.header}>
      <Image className={styles.headerLogo} src={LogoImg} alt="" />
      <div className={styles.headerTextContainer}>
        <p className={styles.headerText}>Count me in!</p>
      </div>
    </header>
  );
};

export default Header;

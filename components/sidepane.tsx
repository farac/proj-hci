import Image from "next/image";

import styles from "@/components/sidepane.module.scss";
import TurnButtonImg from "../public/next-turn-button.svg";

const Sidepane = () => {
  return (
    <div className={styles.sidepaneBox}>
      <ul className={styles.menuList}>
        <li>MANAGE SESSION</li>
        <li>JOIN SESSION</li>
        <li>SHARE LINK</li>
      </ul>
      <Image className={styles.turnButton} src={TurnButtonImg} alt="" />
    </div>
  );
};

export default Sidepane;

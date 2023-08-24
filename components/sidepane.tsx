import Image from "next/image";
import * as Switch from "@radix-ui/react-switch";

import styles from "@/components/sidepane.module.scss";
import TurnButtonImg from "../public/next-turn-button.svg";
import { MouseEventHandler } from "react";

export default function Sidepane({
  deleteModeActive,
  handleDeleteSwitch,
  handleSort,
}: {
  deleteModeActive: boolean;
  handleDeleteSwitch: Function;
  handleSort: Function;
}) {
  return (
    <div className={styles.sidepaneBox}>
      <ul className={styles.menuList}>
        <li>
          {" "}
          <form>
            <div style={{ display: "flex", alignItems: "center" }}>
              <label
                className={
                  deleteModeActive ? styles.LabelDeleteMode : styles.Label
                }
                htmlFor="delete-mode"
                style={{ paddingRight: 15 }}
              >
                DELETE MODE
              </label>
              <Switch.Root
                className={styles.SwitchRoot}
                id="delete-mode"
                checked={deleteModeActive}
                onCheckedChange={(e) => handleDeleteSwitch(e)}
              >
                <Switch.Thumb className={styles.SwitchThumb} />
              </Switch.Root>
            </div>
          </form>
        </li>
        <li>
          <button className={styles.sortButton} onClick={(e) => handleSort(e)}>
            SORT ENTRIES
          </button>
        </li>
        <li>SHARE LINK</li>
      </ul>
      <Image className={styles.turnButton} src={TurnButtonImg} alt="" />
    </div>
  );
}

//export default Sidepane;

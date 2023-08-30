import * as Switch from "@radix-ui/react-switch";

import styles from "@/components/sidepane.module.scss";
import TurnButtonImg from "../public/next-turn-button.svg";

export default function Sidepane({
  deleteModeActive,
  handleDeleteSwitch,
  handleChangeTurn,
}: {
  deleteModeActive: boolean;
  handleDeleteSwitch: Function;
  handleChangeTurn: Function;
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
          <button className={styles.placeholderButton}>PLACEHOLDER</button>
        </li>
        <button className={styles.placeholderButton}>SHARE LINK</button>
      </ul>
      <div className={styles.turnButton} onClick={(e) => handleChangeTurn(e)}>
        <svg
          width="144"
          height="144"
          viewBox="0 0 144 144"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            className={styles.turnBbuttonIcon}
            d="M72 132C105.137 132 132 105.137 132 72C132 38.8629 105.137 12 72 12C38.8629 12 12 38.8629 12 72C12 105.137 38.8629 132 72 132Z"
            fill="#719CAC"
          />
          <path
            d="M66 51L87 72L66 93"
            stroke="#121A21"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
}

//export default Sidepane;

import * as Switch from "@radix-ui/react-switch";

import styles from "@/components/sidepane.module.scss";
import useWindowSize from "./useWindowSize";

export default function Sidepane({
  deleteModeActive,
  handleDeleteSwitch,
  handleChangeTurn,
}: {
  deleteModeActive: boolean;
  handleDeleteSwitch: Function;
  handleChangeTurn: Function;
}) {
  const screenWidth = useWindowSize().width;
  function isMobile() {
    if (screenWidth) {
      return screenWidth < 780;
    }
    return false;
  }

  return (
    <div className={isMobile() ? styles.sidepaneBoxMobile : styles.sidepaneBox}>
      <ul className={isMobile() ? styles.menuListMobile : styles.menuList}>
        <li>
          {" "}
          <form>
            <div className={styles.SwitchDiv}>
              {isMobile() ? (
                <svg
                  className={styles.trashIcon}
                  width="67"
                  height="67"
                  viewBox="0 0 67 67"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M55.5834 25.0125L50.0389 56.5458C49.5717 59.2035 47.2631 61.1417 44.5648 61.1417H22.1354C19.4369 61.1417 17.1283 59.2035 16.661 56.5458L11.1167 25.0125"
                    stroke={deleteModeActive ? "#E25549" : "#719CAC"}
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M58.3624 16.675H42.7296M8.3374 16.675H23.9702M23.9702 16.675V11.1167C23.9702 8.0469 26.4588 5.55835 29.5285 5.55835H37.1713C40.2411 5.55835 42.7296 8.0469 42.7296 11.1167V16.675M23.9702 16.675H42.7296"
                    stroke={deleteModeActive ? "#E25549" : "#719CAC"}
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              ) : (
                <label
                  className={
                    deleteModeActive ? styles.LabelDeleteMode : styles.Label
                  }
                  htmlFor="delete-mode"
                  style={{ paddingRight: 15 }}
                >
                  DELETE MODE
                </label>
              )}
              <Switch.Root
                className={
                  isMobile() ? styles.SwitchRootMobile : styles.SwitchRoot
                }
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
          {!isMobile() && (
            <button className={styles.placeholderButton}>PLACEHOLDER</button>
          )}
        </li>
        <li>
          {!isMobile() && (
            <button className={styles.placeholderButton}>SHARE LINK</button>
          )}
        </li>
      </ul>
      {!isMobile() ? (
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
      ) : (
        <div className={styles.turnButton} onClick={(e) => handleChangeTurn(e)}>
          <svg
            width="80"
            height="80"
            viewBox="0 0 80 80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              className={styles.turnBbuttonIcon}
              d="M39.9998 73.3333C58.4092 73.3333 73.3332 58.4093 73.3332 40C73.3332 21.5905 58.4092 6.66666 39.9998 6.66666C21.5903 6.66666 6.6665 21.5905 6.6665 40C6.6665 58.4093 21.5903 73.3333 39.9998 73.3333Z"
              fill="#719CAC"
            />
            <path
              d="M36.6665 28.3333L48.3332 40L36.6665 51.6667"
              stroke="#121A21"
              stroke-width="5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
      )}
    </div>
  );
}

//export default Sidepane;

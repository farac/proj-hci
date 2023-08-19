import Image from "next/image";
import { useEffect, useState } from "react";
import { ref, onValue, update } from "firebase/database";
import { database } from "@/firebaseConfig";
import * as Popover from "@radix-ui/react-popover";

import * as ExitIcon from "@/public/cancel.svg";
import styles from "@/components/initiative_entry_components/healthHolder.module.scss";

export default function HealthHolder({
  sessionId,
  entryId,
}: {
  sessionId: number;
  entryId: number;
}) {
  const [currentHp, setCurrentHp] = useState<number>(0);
  const [maxHp, setMaxHp] = useState<number>(1);

  const [currentHpEditing, setCurrentHpEditing] = useState<string>("");
  const [maxHpEditing, setMaxHpEditing] = useState<string>("");

  useEffect(() => {
    const currentHpRef = ref(
      database,
      "sessions/" + sessionId + "/entries/" + entryId + "/current_hp"
    );
    const maxHpRef = ref(
      database,
      "sessions/" + sessionId + "/entries/" + entryId + "/max_hp"
    );
    onValue(currentHpRef, (snapshot) => {
      const val = snapshot.val();
      setCurrentHp(val);
    });
    onValue(maxHpRef, (snapshot) => {
      const val = snapshot.val();
      setMaxHp(val);
    });
  }, []);

  function onEditHp(newCurrentHp: string, newMaxHp: string) {
    if (isNaN(Number(newCurrentHp)) || isNaN(Number(newMaxHp))) {
      // todo
      console.log("check inputs");
      return;
    }
    const entryRef = ref(
      database,
      "sessions/" + sessionId + "/entries/" + entryId
    );

    if (newCurrentHp && currentHp != Number(newCurrentHp)) {
      update(entryRef, { current_hp: newCurrentHp });
      setCurrentHpEditing("");
    }

    if (newMaxHp && maxHp != Number(newMaxHp)) {
      update(entryRef, { max_hp: newMaxHp });
      setMaxHpEditing("");
    }
  }

  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <div className={styles.healthHolder}>
          <p
            className={
              currentHp / maxHp > 1
                ? styles.hpCurrentTempHp
                : currentHp / maxHp < 0.5
                ? styles.hpCurrentBloodied
                : styles.hpCurrentDefault
            }
          >
            {currentHp}
          </p>
          <p className={styles.hpMax}>/{maxHp}</p>
        </div>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          className={styles.PopoverContent}
          sideOffset={0}
          onCloseAutoFocus={() => onEditHp(currentHpEditing, maxHpEditing)}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <p className={styles.Text} style={{ marginBottom: 10 }}>
              Change health:
            </p>
            <div style={{ display: "flex", flexDirection: "row", gap: 10 }}>
              <input
                className={styles.Input}
                id="currentHp"
                defaultValue={currentHp}
                onChange={(e) => setCurrentHpEditing(e.target.value)}
              />
              <p className={styles.TextSlash} style={{ marginBottom: 10 }}>
                /
              </p>
              <input
                className={styles.Input}
                id="maxHp"
                defaultValue={maxHp}
                onChange={(e) => setMaxHpEditing(e.target.value)}
              />
            </div>
          </div>
          <Popover.Close className={styles.PopoverClose} aria-label="Close">
            <Image className={styles.IconButton} src={ExitIcon} alt=""></Image>
          </Popover.Close>
          <Popover.Arrow className={styles.PopoverArrow} />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}

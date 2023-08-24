import Image from "next/image";
import { useEffect, useState } from "react";
import { ref, onValue, update } from "firebase/database";
import { database } from "@/firebaseConfig";
import * as Popover from "@radix-ui/react-popover";

import * as ExitIcon from "@/public/cancel.svg";
import styles from "@/components/initiative_entry_components/initiativeBlock.module.scss";

export default function InitiativeBlock({
  sessionId,
  entryId,
  onInitiativeChanged,
}: {
  sessionId: number;
  entryId: number;
  onInitiativeChanged: Function;
}) {
  const [initiativeRoll, setInitiativeRoll] = useState<number>(20);
  const [initiativeRollEditing, setInitiativeRollEditing] =
    useState<string>("");

  useEffect(() => {
    const initiativeRollRef = ref(
      database,
      "sessions/" + sessionId + "/entries/" + entryId + "/initiative_roll"
    );
    onValue(initiativeRollRef, (snapshot) => {
      const val = snapshot.val();
      onInitiativeChanged(entryId, val);
      setInitiativeRoll(val);
    });
  }, []);

  function onEditInitiativeRoll(newRoll: string) {
    if (isNaN(Number(newRoll))) {
      // todo
      console.log("check inputs");
      return;
    }

    if (newRoll && initiativeRoll != Number(newRoll)) {
      const entryRef = ref(
        database,
        "sessions/" + sessionId + "/entries/" + entryId
      );
      update(entryRef, { initiative_roll: newRoll });
      onInitiativeChanged(entryId, newRoll);
      setInitiativeRollEditing("");
    }
  }

  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <p className={styles.initiativeBlock}>{initiativeRoll}</p>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          className={styles.PopoverContent}
          sideOffset={0}
          onCloseAutoFocus={() => onEditInitiativeRoll(initiativeRollEditing)}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 10,
            }}
          >
            <p className={styles.Text} style={{ marginBottom: 10 }}>
              Change initiative:
            </p>
            <input
              type="number"
              className={styles.Input}
              id="initiativeRoll"
              defaultValue={initiativeRoll}
              onChange={(e) => setInitiativeRollEditing(e.target.value)}
            />
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

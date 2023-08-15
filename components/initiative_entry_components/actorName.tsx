import Image from "next/image";
import { useEffect, useState } from "react";
import { ref, onValue, update } from "firebase/database";
import { database } from "@/firebaseConfig";
import * as Popover from "@radix-ui/react-popover";

import * as ExitIcon from "@/public/cancel.svg";
import styles from "@/components/initiative_entry_components/actorName.module.scss";

export default function ActorName({
  sessionId,
  entryId,
}: {
  sessionId: number;
  entryId: number;
}) {
  const [name, setName] = useState<string>("");
  const [nameEditing, setNameEdited] = useState<string>("");

  useEffect(() => {
    const nameRef = ref(
      database,
      "sessions/" + sessionId + "/entries/" + entryId + "/name"
    );
    onValue(nameRef, (snapshot) => {
      const val = snapshot.val();
      setName(val);
    });
  });

  function onEditName(newName: string) {
    if (newName && name != newName) {
      console.log(newName);
      const entryRef = ref(
        database,
        "sessions/" + sessionId + "/entries/" + entryId
      );
      update(entryRef, { name: newName });
      setNameEdited("");
    }
  }

  return (
    <div className={styles.holder}>
      <Popover.Root>
        <Popover.Trigger asChild>
          <p className={styles.nameText}>{name}</p>
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Content
            className={styles.PopoverContent}
            sideOffset={0}
            onCloseAutoFocus={() => onEditName(nameEditing)}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <p className={styles.Text} style={{ marginBottom: 10 }}>
                Change entry name:
              </p>
              <input
                className={styles.Input}
                id="width"
                defaultValue={name}
                onChange={(e) => setNameEdited(e.target.value)}
              />
            </div>
            <Popover.Close className={styles.PopoverClose} aria-label="Close">
              <Image
                className={styles.IconButton}
                src={ExitIcon}
                alt=""
              ></Image>
            </Popover.Close>
            <Popover.Arrow className={styles.PopoverArrow} />
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    </div>
  );
}

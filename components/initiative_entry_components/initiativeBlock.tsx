import { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { database } from "@/firebaseConfig";

import styles from "@/components/initiative_entry_components/initiativeBlock.module.scss";

export default function InitiativeBlock({
  sessionId,
  entryId,
}: {
  sessionId: number;
  entryId: number;
}) {
  const [initiativeRoll, setInitiativeRoll] = useState<number>(20);

  useEffect(() => {
    const initiativeRollRef = ref(
      database,
      "sessions/" + sessionId + "/entries/" + entryId + "/initiative_roll"
    );
    onValue(initiativeRollRef, (snapshot) => {
      const val = snapshot.val();
      setInitiativeRoll(val);
    });
  });

  return <p className={styles.initiativeBlock}>{initiativeRoll}</p>;
}

"use client";
import { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";

import styles from "@/components/initiative_entry_components/healthHolder.module.scss";
import { database } from "@/firebaseConfig";

export default function HealthHolder({
  sessionId,
  entryId,
}: {
  sessionId: number;
  entryId: number;
}) {
  const [currentHp, setCurrentHp] = useState(0);
  const [maxHp, setMaxHp] = useState(1);

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
  });

  return (
    <div className={styles.healthHolder}>
      <p
        className={
          currentHp / maxHp > 0.5
            ? styles.hpCurrentDefault
            : styles.hpCurrentBloodied
        }
      >
        {currentHp}
      </p>
      <p className={styles.hpMax}>/{maxHp}</p>
    </div>
  );
}

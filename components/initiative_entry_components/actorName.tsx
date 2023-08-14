import { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { database } from "@/firebaseConfig";

import styles from "@/components/initiative_entry_components/actorName.module.scss";

export default function ActorName({
  sessionId,
  entryId,
}: {
  sessionId: number;
  entryId: number;
}) {
  const [name, setName] = useState<string>("");

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

  return <p className={styles.nameText}>{name}</p>;
}

import { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";

import styles from "@/components/initiativeEntry.module.scss";
import { database } from "@/firebaseConfig";

import IconBelt from "./initiative_entry_components/iconBelt";
import HealthHolder from "./initiative_entry_components/healthHolder";
import InitiativeBlock from "./initiative_entry_components/initiativeBlock";
import ActorName from "./initiative_entry_components/actorName";

export default function InitiativeEntry({
  sessionId,
  entryId,
}: {
  sessionId: number;
  entryId: number;
}) {
  const [isCurrentTurn, setCurrentTurn] = useState<boolean>(false);

  useEffect(() => {
    const currentTurnRef = ref(
      database,
      "sessions/" + sessionId + "/entries/" + entryId + "/is_current_turn"
    );
    onValue(currentTurnRef, (snapshot) => {
      const val = snapshot.val();
      setCurrentTurn(val);
    });
  });

  return (
    <li
      key={entryId}
      className={isCurrentTurn ? styles.instanceCurrent : styles.instance}
    >
      <InitiativeBlock sessionId={0} entryId={entryId}></InitiativeBlock>
      <div className={styles.rightsideHolder}>
        <ActorName sessionId={0} entryId={entryId}></ActorName>
        <div className={styles.bottomRowHolder}>
          {/* todo: change me */}
          <HealthHolder sessionId={0} entryId={entryId}></HealthHolder>
          <IconBelt sessionId={0} entryId={entryId}></IconBelt>
        </div>
      </div>
    </li>
  );
}

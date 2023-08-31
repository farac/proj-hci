import { useEffect, useState } from "react";
import { ref, onValue, remove } from "firebase/database";

import styles from "@/components/initiativeEntry.module.scss";
import { database } from "@/firebaseConfig";

import IconBelt from "./initiative_entry_components/iconBelt";
import HealthHolder from "./initiative_entry_components/healthHolder";
import InitiativeBlock from "./initiative_entry_components/initiativeBlock";
import ActorName from "./initiative_entry_components/actorName";
import useWindowSize from "./useWindowSize";

export default function InitiativeEntry({
  sessionId,
  entryId,
  deleteModeActive,
  onInitiativeChanged,
  reportCurrentTurn,
}: {
  sessionId: number;
  entryId: number;
  deleteModeActive: boolean;
  onInitiativeChanged: Function;
  reportCurrentTurn: Function;
}) {
  const [isCurrentTurn, setCurrentTurn] = useState<boolean>(false);
  const screenWidth = useWindowSize().width;
  function isMobile() {
    if (screenWidth) {
      return screenWidth < 780;
    }
    return false;
  }

  useEffect(() => {
    const currentTurnRef = ref(
      database,
      "sessions/" + sessionId + "/entries/" + entryId + "/is_current_turn"
    );
    onValue(currentTurnRef, (snapshot) => {
      const val: boolean = snapshot.val();
      setCurrentTurn(val);
      if (val) {
        reportCurrentTurn(entryId);
      }
    });
  }, []);

  function getStyleForEntry(isCurrentTurn: boolean, isMobile: boolean) {
    if (isMobile && isCurrentTurn) return styles.instanceCurrentMobile;
    if (isMobile && !isCurrentTurn) return styles.instanceMobile;
    if (!isMobile && isCurrentTurn) return styles.instanceCurrent;
    else return styles.instance;
  }

  async function handleEntryDelete() {
    const entryRef = ref(
      database,
      "sessions/" + sessionId + "/entries/" + entryId
    );
    const usedIndexRef = ref(
      database,
      "sessions/" + sessionId + "/used_indexes/" + entryId
    );

    //if (isCurrentTurn) reportCurrentTurn(-1);

    await remove(entryRef);
    await remove(usedIndexRef);
  }

  return (
    <div className={styles.wrapper}>
      {deleteModeActive && (
        <div
          className={
            isMobile() ? styles.deleteOverlayMobile : styles.deleteOverlay
          }
          onClick={handleEntryDelete}
        />
      )}
      <li
        key={entryId}
        className={
          /* isCurrentTurn ? styles.instanceCurrent : styles.instance */ getStyleForEntry(
            isCurrentTurn,
            isMobile()
          )
        }
      >
        <InitiativeBlock
          sessionId={0}
          entryId={entryId}
          onInitiativeChanged={onInitiativeChanged}
        ></InitiativeBlock>
        <div className={styles.rightsideHolder}>
          <ActorName sessionId={0} entryId={entryId}></ActorName>
          <div className={styles.bottomRowHolder}>
            <HealthHolder sessionId={0} entryId={entryId}></HealthHolder>
            <IconBelt sessionId={0} entryId={entryId}></IconBelt>
          </div>
        </div>
      </li>
    </div>
  );
}

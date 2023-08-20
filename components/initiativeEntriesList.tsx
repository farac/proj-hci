import { useEffect, useState, ReactNode } from "react";
import { ref, onValue, update, DatabaseReference } from "firebase/database";
import { database } from "@/firebaseConfig";

import styles from "@/components/initiativeEntriesList.module.scss";

import InitiativeEntry from "./initiativeEntry";

const pConditions: number[] = [];
const pCurrentHp: string = "10";
//id
const pInitRoll: number = 10;
const pIsCurrentTurn: boolean = false;
const pMaxHp: string = "10";
const pName: string = "Edit me!";

const defaultEntry = {
  conditions: [],
  current_hp: "10",
  id: 9999,
  initiative_roll: "10",
  is_current_turn: false,
  max_hp: "10",
  name: "Edit me!",
};

export default function IntiativeEntriesList({
  sessionId,
}: {
  sessionId: number;
}) {
  const [usedIndexes, setUsedIndexes] = useState<number[]>([]);
  const usedIndexesRef = ref(
    database,
    "sessions/" + sessionId + "/used_indexes"
  );
  useEffect(() => {
    onValue(usedIndexesRef, (snapshot) => {
      const val = snapshot.val();
      setUsedIndexes(val);
    });
  }, []);

  function getFirstAvailIndex() {
    const rval = usedIndexes.findIndex((num, index) => {
      if (num !== index) {
        return true;
      }
    });
    if (rval === -1) {
      return usedIndexes.length;
    } else return rval;
  }

  function handleAddEntryClick() {
    const index = getFirstAvailIndex();
    const entryData = {
      conditions: pConditions,
      current_hp: pCurrentHp,
      id: index,
      initiative_roll: pInitRoll,
      is_current_turn: pIsCurrentTurn,
      max_hp: pMaxHp,
      name: pName,
    };
    console.log(entryData);

    const updates: Partial<Record<string, object | number>> = {};
    updates["sessions/" + sessionId + "/entries/" + index] = entryData;
    updates["sessions/" + sessionId + "/used_indexes/" + index] = index;
    update(ref(database), updates);
  }

  console.log(usedIndexes);
  const listEntries: ReactNode[] = [];

  //todo: fix me, build local array of properties with all firebase "listeners"
  usedIndexes.forEach((index) => {
    listEntries.push(
      <InitiativeEntry
        key={index}
        sessionId={0}
        entryId={index}
      ></InitiativeEntry>
    );
  });

  return (
    <div>
      <ol className={styles.list}>{listEntries}</ol>
      <div className={styles.addEntry} onClick={handleAddEntryClick}>
        <svg
          width="70"
          height="70"
          viewBox="0 0 70 70"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            className={styles.addEntryIcon}
            d="M49.5835 29.1667H58.3335M67.0835 29.1667H58.3335M58.3335 29.1667V20.4167M58.3335 29.1667V37.9167"
            stroke="#FFF5F6"
            stroke-opacity="0.5"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            className={styles.addEntryIcon}
            d="M2.9165 58.3333V42C2.9165 38.134 6.0505 35 9.9165 35H36.7498C40.6158 35 43.7498 38.134 43.7498 42V58.3333"
            stroke="#FFF5F6"
            stroke-opacity="0.5"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            className={styles.addEntryIcon}
            d="M23.3332 35C29.7765 35 34.9998 29.7767 34.9998 23.3334C34.9998 16.89 29.7765 11.6667 23.3332 11.6667C16.8898 11.6667 11.6665 16.89 11.6665 23.3334C11.6665 29.7767 16.8898 35 23.3332 35Z"
            stroke="#FFF5F6"
            stroke-opacity="0.5"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
    </div>
  );
}

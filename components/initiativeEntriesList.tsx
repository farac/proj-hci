import { useEffect, useState, ReactNode, useRef } from "react";
import { ref, onValue, update } from "firebase/database";
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

const NO_CURRENT_TURN_INDEX = -1;

export default function IntiativeEntriesList({
  sessionId,
  deleteModeActive,
  shouldAdvanceTurn,
  turnChangeDone,
}: // setIndexCurrentTurn,
// currentTurnIndex,
{
  sessionId: number;
  deleteModeActive: boolean;
  shouldAdvanceTurn: boolean;
  turnChangeDone: Function;
  // setIndexCurrentTurn: Function;
  // currentTurnIndex: number;
}) {
  const [usedIndexes, setUsedIndexes] = useState<number[]>([]);
  const [indexInitMap, setIndexInitMap] = useState(new Map<number, number>());
  let indexCurrentTurn = useRef<number>(NO_CURRENT_TURN_INDEX);
  const usedIndexesRef = ref(
    database,
    "sessions/" + sessionId + "/used_indexes"
  );
  useEffect(() => {
    onValue(usedIndexesRef, (snapshot) => {
      const val: number[] = snapshot.val();

      const newMap = indexInitMap;

      indexInitMap.forEach((v, k) => {
        if (!val.includes(k)) {
          newMap.delete(k);
        }
      });

      val.forEach((v) => {
        if (!indexInitMap.has(v)) {
          newMap.set(v, 0);
        }
        setIndexInitMap(newMap);
      });

      setUsedIndexes(val);
      console.log(val);
    });
  }, []);

  useEffect(() => {
    if (shouldAdvanceTurn) {
      let newCurrentIndex: number | undefined;
      const revInitMap = new Map([...indexInitMap].reverse());

      let prev: number;
      revInitMap.forEach((val, key) => {
        if (indexCurrentTurn.current == key) {
          newCurrentIndex = prev;
        }
        prev = key;
      });

      if (newCurrentIndex === undefined)
        newCurrentIndex = indexInitMap.keys().next().value;

      console.log(
        "epic turn change logic new current to set:" + newCurrentIndex
      );
      const entriesRef = ref(database, "sessions/" + sessionId + "/entries/");

      const updates: Partial<Record<string, object | number>> = {};
      updates[indexCurrentTurn.current + "/is_current_turn"] = false;
      updates[newCurrentIndex + "/is_current_turn"] = true;
      update(entriesRef, updates);

      turnChangeDone();
    }
  }, [shouldAdvanceTurn, turnChangeDone]);

  function getFirstAvailIndex() {
    const rval = usedIndexes.findIndex((num) => {
      if (num === undefined) {
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

    const updates: Partial<Record<string, object | number>> = {};
    updates["sessions/" + sessionId + "/entries/" + index] = entryData;
    updates["sessions/" + sessionId + "/used_indexes/" + index] = index;
    update(ref(database), updates);
  }

  function onInitiativeChanged(index: number, init_roll: number) {
    if (init_roll != null) {
      console.log(index + " je rolla " + init_roll);
      const newMap = indexInitMap;
      newMap.set(index, init_roll);
      setIndexInitMap(newMap);
      sortMapByInit();
    }
  }

  function sortMapByInit() {
    const sorted = new Map<number, number>(
      [...indexInitMap.entries()].sort((a, b) => b[1] - a[1])
    );

    const mapsAreEqual = (m1: Map<number, number>, m2: Map<number, number>) =>
      m1.size === m2.size &&
      Array.from(m1.keys()).every((key) => m1.get(key) === m2.get(key));

    if (!mapsAreEqual(indexInitMap, sorted)) {
      setIndexInitMap(sorted);
    }
  }

  function handleTurnReport(entryId: number) {
    indexCurrentTurn.current = entryId;
    console.log("aaa" + indexCurrentTurn);
  }
  // indexCurrentTurn = currentTurnIndex;
  // if (indexCurrentTurn != -1) {
  //   console.log("aaa" + indexCurrentTurn);
  // }

  const listEntries: ReactNode[] = [];
  //console.log("entries sorted ulazin u sort");
  //console.log("current prije sorta map" + [...indexInitMap.entries()]);
  // const sorted = new Map<number, number>(
  //   [...indexInitMap.entries()].sort((a, b) => b[1] - a[1])
  // );
  // console.log([...indexInitMap.entries()]);
  sortMapByInit();
  console.log("nakon sorta map" + [...indexInitMap.entries()]);
  indexInitMap.forEach((val, key) => {
    listEntries.push(
      <InitiativeEntry
        key={key}
        sessionId={0}
        entryId={key}
        deleteModeActive={deleteModeActive}
        onInitiativeChanged={onInitiativeChanged}
        reportCurrentTurn={handleTurnReport}
      ></InitiativeEntry>
    );
  });

  return (
    <div>
      <ol className={styles.list}>{listEntries}</ol>
      {!deleteModeActive && (
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
              strokeOpacity="0.5"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              className={styles.addEntryIcon}
              d="M2.9165 58.3333V42C2.9165 38.134 6.0505 35 9.9165 35H36.7498C40.6158 35 43.7498 38.134 43.7498 42V58.3333"
              stroke="#FFF5F6"
              strokeOpacity="0.5"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              className={styles.addEntryIcon}
              d="M23.3332 35C29.7765 35 34.9998 29.7767 34.9998 23.3334C34.9998 16.89 29.7765 11.6667 23.3332 11.6667C16.8898 11.6667 11.6665 16.89 11.6665 23.3334C11.6665 29.7767 16.8898 35 23.3332 35Z"
              stroke="#FFF5F6"
              strokeOpacity="0.5"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      )}
    </div>
  );
}

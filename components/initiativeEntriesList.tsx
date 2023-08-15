import Image from "next/image";

import { useEffect, useState, ReactNode } from "react";
import { ref, onValue } from "firebase/database";
import { database } from "@/firebaseConfig";

import styles from "@/components/initiativeEntriesList.module.scss";
import Icons from "../public/conditions/importCondIcons";

import InitiativeEntry from "./initiativeEntry";

export default function IntiativeEntriesList({
  sessionId,
}: {
  sessionId: number;
}) {
  const [numberOfEntries, setNumberOfEntries] = useState<number>(0);

  useEffect(() => {
    const numberOfEntriesRef = ref(
      database,
      "sessions/" + sessionId + "/number_of_entries"
    );
    onValue(numberOfEntriesRef, (snapshot) => {
      const val = snapshot.val();
      setNumberOfEntries(val);
    });
  });

  const listEntries: ReactNode[] = [];

  //todo: fix me, build local array of properties with all firebase "listeners"
  for (let i = 0; i < numberOfEntries; i++) {
    listEntries.push(
      <InitiativeEntry key={i} sessionId={0} entryId={i}></InitiativeEntry>
    );
  }
  return (
    <div>
      <ol className={styles.list}>{listEntries}</ol>
      <div className={styles.addEntry}>
        <Image src={Icons.AddEntry} alt=""></Image>
      </div>
    </div>
  );
}

import Image from "next/image";
import e from "../constants/entries.json";
import Icons from "../public/conditions/importCondIcons";

import styles from "@/components/initiativeEntries.module.scss";

import IconBelt from "./initiative_entry_components/iconBelt";
import HealthHolder from "./initiative_entry_components/healthHolder";

export default function IntiativeEntries() {
  const listEntries = e.map((entry) => (
    <li
      key={entry.id}
      className={
        entry.is_current_turn ? styles.instanceCurrent : styles.instance
      }
    >
      <p className={styles.initiativeBlock}>{entry.initiative_roll}</p>
      <div className={styles.rightsideHolder}>
        <p className={styles.nameText}>{entry.name}</p>
        <div className={styles.bottomRowHolder}>
          <HealthHolder
            currentHp={entry.current_hp}
            maxHp={entry.max_hp}
          ></HealthHolder>
          <IconBelt conditions={entry.conditions}></IconBelt>
        </div>
      </div>
    </li>
  ));
  return (
    <div>
      <ol className={styles.list}>{listEntries}</ol>
      <div className={styles.addEntry}>
        <Image src={Icons.AddEntry} alt=""></Image>
      </div>
    </div>
  );
}

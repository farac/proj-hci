import Image from "next/image";
import e from "../constants/entries.json";
import Icons from "../public/conditions/importCondIcons";

import styles from "@/components/initiativeEntries.module.scss";

import IconBelt from "./initiative_entry_components/iconBelt";
import HealthHolder from "./initiative_entry_components/healthHolder";
import InitiativeBlock from "./initiative_entry_components/initiativeBlock";
import ActorName from "./initiative_entry_components/actorName";

export default function IntiativeEntries() {
  const listEntries = e.map((entry) => (
    <li
      key={entry.id}
      className={
        entry.is_current_turn ? styles.instanceCurrent : styles.instance
      }
    >
      <InitiativeBlock sessionId={0} entryId={entry.id}></InitiativeBlock>
      <div className={styles.rightsideHolder}>
        <ActorName sessionId={0} entryId={entry.id}></ActorName>
        <div className={styles.bottomRowHolder}>
          {/* todo: change me */}
          <HealthHolder sessionId={0} entryId={entry.id}></HealthHolder>
          <IconBelt sessionId={0} entryId={entry.id}></IconBelt>
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

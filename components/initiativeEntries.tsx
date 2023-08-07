import Image from "next/image";
import e from "../constants/entries.json";
import Icons from "../public/conditions/importCondIcons";
import { ReactNode } from "react";

import styles from "@/components/initiativeEntries.module.scss";

const statuses: string[] = ["prone", "deaf", "blind"];

interface ConditionStrings {
  conditions: string[];
}

const ConditionToIconMap = {
  prone: Icons.Prone,
  deaf: Icons.Deaf,
  blind: Icons.Blind,
};

function IconBelt({ conditions }: ConditionStrings) {
  const conditionsList: ReactNode[] = [];
  conditions.forEach((condition, index) => {
    if (statuses.includes(condition))
      conditionsList.push(
        <Image
          key={index}
          src={ConditionToIconMap[condition as keyof typeof ConditionToIconMap]}
          alt=""
        ></Image>
      );
  });

  return <div className={styles.iconBelt}>{conditionsList}</div>;
}

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
          <div className={styles.healthHolder}>
            <p
              className={
                entry.current_hp / entry.max_hp > 0.5
                  ? styles.hpCurrentDefault
                  : styles.hpCurrentBloodied
              }
            >
              {entry.current_hp}
            </p>
            <p className={styles.hpMax}>/{entry.max_hp}</p>
          </div>
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

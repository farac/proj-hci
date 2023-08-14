import Image from "next/image";
import { ReactNode, useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { database } from "@/firebaseConfig";

import * as Tooltip from "@radix-ui/react-tooltip";

import Icons from "../../public/conditions/importCondIcons";
import styles from "@/components/initiative_entry_components/iconBelt.module.scss";

const statuses: string[] = ["Prone", "Deaf", "Blind"];

const ConditionToIconMap = {
  Prone: Icons.Prone,
  Deaf: Icons.Deaf,
  Blind: Icons.Blind,
};

export default function IconBelt({
  sessionId,
  entryId,
}: {
  sessionId: number;
  entryId: number;
}) {
  const [conditions, setConditions] = useState<string[]>([]);

  useEffect(() => {
    const conditionsRef = ref(
      database,
      "sessions/" + sessionId + "/entries/" + entryId + "/conditions"
    );
    onValue(conditionsRef, (snapshot) => {
      const val = snapshot.val();
      setConditions(val);
    });
  });

  const conditionsList: ReactNode[] = [];

  if (conditions != null) {
    conditions.forEach((condition, index) => {
      if (statuses.includes(condition))
        conditionsList.push(
          <Tooltip.Provider key={index}>
            <Tooltip.Root>
              <Tooltip.Trigger asChild>
                <Image
                  key={index}
                  src={
                    ConditionToIconMap[
                      condition as keyof typeof ConditionToIconMap
                    ]
                  }
                  alt=""
                ></Image>
              </Tooltip.Trigger>
              <Tooltip.Portal>
                <Tooltip.Content
                  className={styles.tooltipContent}
                  sideOffset={5}
                >
                  {condition}
                  <Tooltip.Arrow className={styles.tooltipArrow} />
                </Tooltip.Content>
              </Tooltip.Portal>
            </Tooltip.Root>
          </Tooltip.Provider>
        );
    });
  }

  return <div className={styles.iconBelt}>{conditionsList}</div>;
}

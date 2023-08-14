import Image from "next/image";
import { ReactNode, useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import * as Tooltip from "@radix-ui/react-tooltip";

import Icons from "../../public/conditions/importCondIcons";
import styles from "@/components/initiative_entry_components/iconBelt.module.scss";
import { database } from "@/firebaseConfig";

const statuses: string[] = ["Prone", "Deaf", "Blind"];

interface ConditionStrings {
  conditions: string[];
}

const ConditionToIconMap = {
  Prone: Icons.Prone,
  Deaf: Icons.Deaf,
  Blind: Icons.Blind,
};

export default function IconBelt({ conditions }: ConditionStrings) {
  const conditionsList: ReactNode[] = [];

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
              <Tooltip.Content className={styles.tooltipContent} sideOffset={5}>
                {condition}
                <Tooltip.Arrow className={styles.tooltipArrow} />
              </Tooltip.Content>
            </Tooltip.Portal>
          </Tooltip.Root>
        </Tooltip.Provider>
      );
  });

  return <div className={styles.iconBelt}>{conditionsList}</div>;
}

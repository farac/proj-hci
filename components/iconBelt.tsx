import Image from "next/image";
import Icons from "../public/conditions/importCondIcons";
import * as Tooltip from "@radix-ui/react-tooltip";
import { ReactNode } from "react";

import styles from "@/components/iconBelt.module.scss";

const statuses: string[] = ["prone", "deaf", "blind"];

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
        <Tooltip.Provider>
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
                Add to library
                <Tooltip.Arrow className={styles.tooltipArrow} />
              </Tooltip.Content>
            </Tooltip.Portal>
          </Tooltip.Root>
        </Tooltip.Provider>
      );
  });

  return <div className={styles.iconBelt}>{conditionsList}</div>;
}

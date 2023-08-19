import Image from "next/image";
import { ReactNode, useEffect, useState } from "react";
import { ref, onValue, set } from "firebase/database";
import { database } from "@/firebaseConfig";

import * as Tooltip from "@radix-ui/react-tooltip";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

import * as CheckIcon from "@/public/check.svg";
import Icons from "../../public/conditions/importCondIcons";
import styles from "@/components/initiative_entry_components/iconBelt.module.scss";

const prone: string = "Prone";
const deaf: string = "Deaf";
const blind: string = "Blind";

const statuses: string[] = [prone, deaf, blind];

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
  const [conditionsEditing, setConditionsEditing] = useState<string[]>([]);

  function appendToConditionsE(condition: string) {
    setConditionsEditing((prev) => [...prev, condition]);
  }

  function removeFromConditionsE(condition: string) {
    setConditionsEditing((prev) => prev.filter((c) => c !== condition));
  }

  function isInConditionsArray(condition: string) {
    return conditionsEditing.some((c) => c === condition);
  }

  function editConditionsEArray(condition: string) {
    if (isInConditionsArray(condition)) {
      removeFromConditionsE(condition);
    } else appendToConditionsE(condition);
  }

  useEffect(() => {
    const conditionsRef = ref(
      database,
      "sessions/" + sessionId + "/entries/" + entryId + "/conditions"
    );
    onValue(conditionsRef, (snapshot) => {
      const val: string[] = snapshot.val();
      val.sort().reverse();
      setConditions(val);
      setConditionsEditing(val);
      console.log(val);
    });
  }, []);

  function onEditConditions(newConditions: string[]) {
    if (true) {
      const toPush = newConditions.reduce(
        (acc: Record<number, string>, condition, index) => {
          acc[index] = condition;
          return acc;
        },
        {}
      );
      console.log(toPush);
      const conditionsRef = ref(
        database,
        "sessions/" + sessionId + "/entries/" + entryId + "/conditions"
      );
      set(conditionsRef, toPush);
      // setConditionsEditing(newConditions); /* ne triba jer listener */
    }
  }

  const conditionsList: ReactNode[] = [];

  if (conditions != null) {
    conditions.forEach((condition, index) => {
      if (statuses.includes(condition)) {
        conditionsList.push(
          <Tooltip.Provider key={condition}>
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
      }
    });
  }

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <div className={styles.iconBelt}>{conditionsList}</div>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className={styles.DropdownMenuContent}
          sideOffset={5}
          onCloseAutoFocus={() => onEditConditions(conditionsEditing)}
        >
          <DropdownMenu.Label className={styles.DropdownMenuLabel}>
            Change conditions:
          </DropdownMenu.Label>
          <DropdownMenu.Separator className={styles.DropdownMenuSeparator} />
          <DropdownMenu.CheckboxItem
            className={styles.DropdownMenuCheckboxItem}
            onSelect={(e) => e.preventDefault()}
            checked={isInConditionsArray(blind)}
            onCheckedChange={() => editConditionsEArray(blind)}
          >
            <DropdownMenu.ItemIndicator
              className={styles.DropdownMenuItemIndicator}
            >
              <Image
                className={styles.CheckIcon}
                src={CheckIcon}
                alt=""
              ></Image>
            </DropdownMenu.ItemIndicator>
            {blind}
          </DropdownMenu.CheckboxItem>
          <DropdownMenu.CheckboxItem
            className={styles.DropdownMenuCheckboxItem}
            onSelect={(e) => e.preventDefault()}
            checked={isInConditionsArray(deaf)}
            onCheckedChange={() => editConditionsEArray(deaf)}
          >
            <DropdownMenu.ItemIndicator
              className={styles.DropdownMenuItemIndicator}
            >
              <Image
                className={styles.CheckIcon}
                src={CheckIcon}
                alt=""
              ></Image>
            </DropdownMenu.ItemIndicator>
            {deaf}
          </DropdownMenu.CheckboxItem>
          <DropdownMenu.CheckboxItem
            className={styles.DropdownMenuCheckboxItem}
            onSelect={(e) => e.preventDefault()}
            checked={isInConditionsArray(prone)}
            onCheckedChange={() => editConditionsEArray(prone)}
          >
            <DropdownMenu.ItemIndicator
              className={styles.DropdownMenuItemIndicator}
            >
              <Image
                className={styles.CheckIcon}
                src={CheckIcon}
                alt=""
              ></Image>
            </DropdownMenu.ItemIndicator>
            {prone}
          </DropdownMenu.CheckboxItem>
          <DropdownMenu.Arrow className={styles.DropdownMenuArrow} />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}

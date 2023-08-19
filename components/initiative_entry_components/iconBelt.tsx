import Image from "next/image";
import { ReactNode, useEffect, useState } from "react";
import { ref, onValue, update } from "firebase/database";
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
  // const [conditions, setConditions] = useState<string[]>([]);
  // const [conditionsEditing, setConditionsEditing] = useState<string[]>([]);

  const [conditions, setConditions] = useState(new Set<string>());
  const [conditionsEditing, setConditionsEditing] = useState(new Set<string>());

  // function appendToConditionsE(condition: string) {
  //   setConditionsEditing((prev) => [...prev, condition]);
  // }
  function appendToConditionsE(condition: string) {
    console.log("append  " + condition);
    const newConditions = conditionsEditing;
    newConditions.add(condition);
    setConditionsEditing(newConditions);
  }

  // function removeFromConditionsE(condition: string) {
  //   setConditionsEditing((prev) => prev.filter((c) => c !== condition));
  // }
  function removeFromConditionsE(condition: string) {
    console.log("remove " + condition);
    const newConditions = conditionsEditing;
    if (newConditions.delete(condition)) {
      setConditionsEditing(newConditions);
    }
  }

  // function isInConditionsArray(condition: string) {
  //   return conditionsEditing.some((c) => c === condition);
  // }
  function isInConditionsSet(condition: string) {
    console.log();
    return conditionsEditing.has(condition);
  }

  function editConditionsEArray(condition: string) {
    if (conditionsEditing.has(condition)) {
      removeFromConditionsE(condition);
    } else appendToConditionsE(condition);
  }

  useEffect(() => {
    const conditionsRef = ref(
      database,
      "sessions/" + sessionId + "/entries/" + entryId + "/conditions"
    );
    onValue(conditionsRef, (snapshot) => {
      const val = snapshot.val();
      setConditions(new Set<string>(val));
      setConditionsEditing(new Set<string>(val));
    });
  }, []);

  function onEditConditions(newConditions: Set<string>) {
    if (true) {
      const conditionsRef = ref(
        database,
        "sessions/" + sessionId + "/entries/" + entryId + "/conditions"
      );
      console.log(newConditions);
      // update(conditionsRef, newConditions);
      setConditionsEditing(
        new Set<string>(newConditions)
      ); /* ne triba jer listener */
    }
  }

  const conditionsList: ReactNode[] = [];

  if (conditions != null) {
    conditions.forEach((condition) => {
      if (statuses.includes(condition)) {
        conditionsList.push(
          <Tooltip.Provider key={condition}>
            <Tooltip.Root>
              <Tooltip.Trigger asChild>
                <Image
                  key={condition}
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
            checked={isInConditionsSet(prone)}
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
          <DropdownMenu.CheckboxItem
            className={styles.DropdownMenuCheckboxItem}
            onSelect={(e) => e.preventDefault()}
            checked={isInConditionsSet(deaf)}
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
            checked={isInConditionsSet(blind)}
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
          <DropdownMenu.Arrow className={styles.DropdownMenuArrow} />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}

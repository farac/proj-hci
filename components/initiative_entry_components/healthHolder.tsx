import styles from "@/components/initiative_entry_components/healthHolder.module.scss";

export default function HealthHolder({
  currentHp,
  maxHp,
}: {
  currentHp: number;
  maxHp: number;
}) {
  return (
    <div className={styles.healthHolder}>
      <p
        className={
          currentHp / maxHp > 0.5
            ? styles.hpCurrentDefault
            : styles.hpCurrentBloodied
        }
      >
        {currentHp}
      </p>
      <p className={styles.hpMax}>/{maxHp}</p>
    </div>
  );
}

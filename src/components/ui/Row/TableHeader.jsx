import { Bin } from "../../../assets/icons";
import styles from "../../SubjectCard.module.css";
export const TableHeader = ({ podgroups, deleteNewGroup, createNewGroup }) => {
  return (
    <tr className={styles.columnsHead}>
      <th className={styles.columnLectures}>Занятие</th>
      <th className={styles.columnHours}>Часы</th>

      {podgroups.length > 1 ? (
        podgroups.map((_, index) => (
          <th key={index} className={styles.deleteColumn}>
            Подгруппа {index + 1}
            {index === podgroups.length - 1 && (
              <Bin className={styles.deleteButton} onClick={deleteNewGroup} />
            )}
          </th>
        ))
      ) : (
        <th>
          <span className={styles.button} onClick={createNewGroup}>
            Преподаватель +
          </span>
        </th>
      )}
    </tr>
  );
};

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SubjectCard } from "../../components/SubjectCard";
import {
  fetchSubjects,
  saveSubjects,
} from "../../features/subjects/subjectsActions";
import styles from "./SubjectsList.module.css";

export const SubjectsList = () => {
  const subjects = useSelector((state) => state.subjects.subject);
  const teachers = useSelector((state) => state.teachers.teachers);
  const dispatch = useDispatch();

  // Локальная копия массива предметов для правок
  const [editableSubjects, setEditableSubjects] = useState([]);

  useEffect(() => {
    dispatch(fetchSubjects());
  }, [dispatch]);

  // Синхронизируем локальный массив, когда приходят subjects из стора
  useEffect(() => {
    if (Array.isArray(subjects)) {
      // делаем поверхностную копию, чтобы не мутировать стор-объекты
      setEditableSubjects(subjects.map((s) => ({ ...s })));
    }
  }, [subjects]);

  const getOptions = teachers.map((t) => t.name);

  // Обработчик, который будет передан в SubjectCard
  // index — индекс карточки в списке, updatedSubject — обновлённый объект предмета
  const handleUpdate = (index, updatedSubject) => {
    setEditableSubjects((prev) => {
      const copy = [...prev];
      copy[index] = updatedSubject;
      return copy;
    });
  };

  const handleSave = () => {
    dispatch(saveSubjects({ data: editableSubjects, teachers: teachers }));
    console.log("saveSubjects dispatched", editableSubjects);
  };

  return (
    <>
      <div className={styles.cardWrapper}>
        {editableSubjects &&
          editableSubjects.map((subject, index) => (
            <SubjectCard
              key={subject.id ?? index}
              subject={subject}
              teachers={teachers}
              initialOption={getOptions}
              onUpdate={(updatedSubject) => handleUpdate(index, updatedSubject)}
            />
          ))}
      </div>

      <button onClick={handleSave}>Сохранить</button>
    </>
  );
};

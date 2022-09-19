import React, { FormEvent } from "react";
import { INote, IEventTarget } from "../../interfaces";
import styles from "./styles.module.css";
import { Palette } from "./Palette";
import { ReactComponent as CloseIcon } from "../../image/close.svg";

interface IProps {
  data?: INote | null;
  onSubmit?: (data: INote) => void;
  closeButtonClick?: () => void;
}

/**
 * Возвращает данные для редактирования
 * @param data
 * @returns
 */
const getData = (data?: INote | null): INote => {
  if (data) {
    return data;
  }

  return {
    id: Date.now(),
    title: "",
    text: "",
    color: "yellow",
  } as INote;
};

const NoteEditor = ({ data, onSubmit, closeButtonClick }: IProps) => {
  const [currentData, setCurrentData] = React.useState(getData(data));
  const [validationError, setValidationError] = React.useState("");

  const updateData = (value: any, field: string) => {
    const updatedData = { ...currentData, [field]: value } as INote;
    setCurrentData(updatedData);
  };

  const titleChanged = (event: FormEvent): void => {
    const { value } = event.target as IEventTarget;
    updateData(value, "title");
  };

  const textChanged = (event: FormEvent): void => {
    const { value } = event.target as IEventTarget;
    updateData(value, "text");

    if (value) {
      setValidationError("");
    }
  };

  const validateData = (data: INote): boolean => {
    let errorText;
    if (!data.text || !data.text.length) {
      errorText = "Введите текст заметки";
    }

    setValidationError(errorText || "");

    return !errorText;
  };

  const onSubmitHandler = (event: FormEvent) => {
    event.preventDefault();
    const validationSuccess = validateData(currentData);

    if (!validationSuccess) {
      return;
    }

    onSubmit && onSubmit(currentData);
  };

  return (
    <div
      className={styles.container}
      style={{ backgroundColor: currentData.color }}
    >
      <div className={styles.header}>
        <input
          value={currentData.title}
          onInput={(event: FormEvent) => titleChanged(event)}
          maxLength={50}
          className={styles.titleInput}
          placeholder="Заголовок"
        />
        <div className="display-flex flex-shrink-0 items-center">
          <button
            onClick={onSubmitHandler}
            type="submit"
            className={styles.saveButton}
          >
            Сохранить
          </button>
          <CloseIcon onClick={closeButtonClick} className={styles.closeIcon} />
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.textValidationError}>{validationError}</div>
        <textarea
          value={currentData.text}
          onInput={(event: FormEvent) => textChanged(event)}
          autoFocus={true}
          className={styles.textArea}
          maxLength={500}
          placeholder="Текст..."
        />
        <Palette
          value={currentData.color}
          onChange={(value) => updateData(value, "color")}
          className={styles.palette}
        />
      </div>
    </div>
  );
};

export { NoteEditor };

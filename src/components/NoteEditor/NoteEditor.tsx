import { FormEvent, useReducer } from "react";
import { INote, IEventTarget } from "../../interfaces";
import styles from "./styles.module.css";
import { Palette } from "./Palette";
import { Button } from "../Button";
import { ReactComponent as CloseIcon } from "../../image/close.svg";

interface IProps {
  data?: INote | null;
  onSubmit?: (data: INote) => void;
  closeButtonClick?: () => void;
}

interface IState {
  data: INote;
  errorText?: string;
}

interface IAction {
  type: Actions;
  payload: IUpdateDataAction | IUpdateErrorTextAction;
}

interface IUpdateDataAction {
  field: string;
  value: any;
}

interface IUpdateErrorTextAction {
  errorText: string;
}

enum Actions {
  updateData = "updateData",
  updateErrorText = "updateErrorText",
}

/**
 * Возвращает данные для редактирования
 * @param data
 * @returns
 */
const getNewData = (): INote => {
  return {
    id: Date.now(),
    title: "",
    text: "",
    color: "#FFFF00",
  } as INote;
};

const reducer = (state: IState, { type, payload }: IAction): IState => {
  let updatedState;
  switch (type) {
    case Actions.updateData: {
      const actionData = payload as IUpdateDataAction;
      const updatedData = {
        ...state.data,
        [actionData.field]: actionData.value,
      } as INote;

      updatedState = { data: updatedData } as IState;

      // если в новых данных заполнено поле text - сбросим текст ошибки
      if (updatedState.data.text) {
        updatedState.errorText = "";
      }

      break;
    }
    case Actions.updateErrorText: {
      updatedState = { ...payload } as IState;
      break;
    }
  }

  return updatedState ? { ...state, ...updatedState } : state;
};

/**
 * Компонент редактирования заметки
 * @param props
 * @returns
 */
const NoteEditor = ({ data, onSubmit, closeButtonClick }: IProps): React.ReactElement => {
  const [state, dispatch] = useReducer(reducer, {
    data: data || getNewData(),
  });

  const dataValueChanged = (field: string, value: any): void => {
    dispatch({
      type: Actions.updateData,
      payload: {
        field,
        value,
      },
    });
  };

  const valueChangedHandler = (event: FormEvent): void => {
    const { value, name } = event.target as IEventTarget;
    dataValueChanged(name, value);
  };

  const onSubmitHandler = (event?: FormEvent<Element> | undefined) => {
    event && event.preventDefault();
    const { data } = state;

    const errorText = !data.text || !data.text.length ? "Введите текст заметки" : "";
    dispatch({ type: Actions.updateErrorText, payload: { errorText } });

    if (errorText) {
      return;
    }

    onSubmit && onSubmit(data);
  };

  return (
    <div
      className={styles.container}
      style={{ backgroundColor: state.data.color }}
    >
      <div className={styles.header}>
        <input
          name="title"
          value={state.data.title}
          onInput={valueChangedHandler}
          maxLength={50}
          className={styles.titleInput}
          placeholder="Заголовок"
        />
        <div className="display-flex flex-shrink-0 items-center">
          <Button
            onClick={onSubmitHandler}
            buttonStyle="unnacented"
            className={styles.saveButton}
          >
            Сохранить
          </Button>
          <CloseIcon onClick={closeButtonClick} className={styles.closeIcon} />
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.textValidationError}>{state.errorText}</div>
        <textarea
          name="text"
          value={state.data.text}
          onInput={valueChangedHandler}
          autoFocus={true}
          className={`flex-grow ${styles.textArea}`}
          maxLength={500}
          placeholder="Текст..."
        />
        <Palette
          value={state.data.color}
          onChange={(value) => dataValueChanged("color", value)}
          className={styles.palette}
        />
      </div>
    </div>
  );
};

export { NoteEditor };

import {useReducer, useCallback} from "react";
import { Dialog } from "../Dialog";
import { NoteEditor } from "../NoteEditor";
import { NotesList } from "../NotesList";
import { Header } from "../Header";
import { Scroll } from "../Scroll";
import { Button } from "../Button";
import { INote } from "../../interfaces";
import { DEFAULT_ITEMS, ABOUT_NOTES_ITEMS } from "../../constants";
import { ReactComponent as PlusIcon } from "../../image/plus.svg";
import RestartImg from "../../image/restart.png";
import ListImg from "../../image/list.png";
import ClearListImg from "../../image/delete-list.png";
import styles from "./styles.module.css";

interface IState {
  items?: INote[];
  addDialogOpen?: boolean;
  editingItem?: INote | null;
}

interface IAction {
  type: ActionType;
  payload?: {
    item?: INote;
  };
}

const INITIAL_STATE: IState = {
  items: DEFAULT_ITEMS,
  addDialogOpen: false,
  editingItem: null,
};

enum ActionType {
  add = "add",
  edit = "edit",
  save = "save",
  delete = "delete",
  reset = "reset",
  resetEdit = "resetEdit",
  clear = "clear",
  fill = "fill",
}

function reducer(state: IState, { type, payload }: IAction): IState {
  let updatedState;
  switch (type) {
    case ActionType.add: {
      updatedState = { addDialogOpen: true };
      break;
    }
    case ActionType.save: {
      if (payload && payload.item) {
        const newItems = [...(state.items || [])];
        const itemKey = payload.item.id;
        const oldItem = newItems.find((item) => item.id === itemKey);

        if (oldItem) {
          const index = newItems.indexOf(oldItem);
          newItems[index] = { ...payload.item };
        } else {
          newItems.push({ ...payload.item });
        }

        updatedState = {
          items: newItems,
          editingItem: null,
          addDialogOpen: false,
        };
      }
      break;
    }
    case ActionType.edit: {
      if (payload && payload.item) {
        updatedState = {
          editingItem: { ...payload.item },
          addDialogOpen: true,
        };
      }
      break;
    }
    case ActionType.resetEdit: {
      updatedState = {
        editingItem: null,
        addDialogOpen: false,
      };
      break;
    }
    case ActionType.delete: {
      if (payload && payload.item) {
        const { item } = payload;
        const { items } = state;

        const newItems =
          items && items.length
            ? items.filter((note: INote) => note.id !== item.id)
            : [];

        updatedState = {
          items: newItems,
        };
      }
      break;
    }
    case ActionType.reset: {
      updatedState = {
        items: DEFAULT_ITEMS,
      };
      break;
    }
    case ActionType.clear: {
      updatedState = {
        items: [],
      };
      break;
    }
    case ActionType.fill: {
      updatedState = {
        items: ABOUT_NOTES_ITEMS,
      };
      break;
    }
  }

  return updatedState ? { ...state, ...updatedState } : state;
}

/**
 * Компонент страницы
 * @returns 
 */
const Page = (): React.ReactElement => {
  const [{ items, editingItem, addDialogOpen }, dispatch] = useReducer(
    reducer,
    INITIAL_STATE
  );

  // Т.к. React гарантирует неизменяемость dispatch при ререндерах, не будем указывать его в зависимостях.
  // В итоге получим неизменяемые обработчики событий, что позволит избежать лишних вычислений в NotesList
  const deleteItemHandler = useCallback(
    (item: INote) => dispatch({ type: ActionType.delete, payload: { item } }),
    []
  );

  const clickItemHandler = useCallback(
    (item: INote) => dispatch({ type: ActionType.edit, payload: { item } }),
    []
  );

  const addButtonClickHandler = useCallback(
    () => dispatch({ type: ActionType.add }),
    []
  );

  return (
    <div className="w-full h-full h-min w-min display-flex flex-direction-column">
      <Header className="flex-shrink-0 flex-grow-0" title="Simple ToDo">
        <>
          <Button
            className="mr-12"
            title="Добавить"
            onClick={() => dispatch({ type: ActionType.add })}
          >
            <PlusIcon />
          </Button>
          <Button
            className="mr-12"
            title="Заполнить"
            onClick={() => dispatch({ type: ActionType.fill })}
          >
            <img src={ListImg} className={styles.buttonImg} alt="Заполнить" />
          </Button>
          <Button
            className="mr-12"
            title="Очистить"
            onClick={() => dispatch({ type: ActionType.clear })}
          >
            <img
              src={ClearListImg}
              className={styles.buttonImg}
              alt="Очистить"
            />
          </Button>
          <Button
            className="mr-12"
            title="По умолчанию"
            onClick={() => dispatch({ type: ActionType.reset })}
          >
            <img
              src={RestartImg}
              className={styles.buttonImg}
              alt="По умолчанию"
            />
          </Button>
        </>
      </Header>
      <Scroll>
        <div className={styles.content}>
          <div className="display-flex flex-direction-column items-center ml-12 mr-12 mb-12 mt-24">
            <NotesList
              items={items}
              onDeleteClick={deleteItemHandler}
              onItemClick={clickItemHandler}
              onAddButtonClick={addButtonClickHandler}
            />
          </div>
        </div>
      </Scroll>
      <Dialog
        open={addDialogOpen}
        onOverlayClick={() => dispatch({ type: ActionType.resetEdit })}
      >
        <NoteEditor
          data={editingItem}
          closeButtonClick={() => dispatch({ type: ActionType.resetEdit })}
          onSubmit={(item: INote) =>
            dispatch({ type: ActionType.save, payload: { item } })
          }
        />
      </Dialog>
    </div>
  );
};

export { Page };

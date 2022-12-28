import styles from "./styles.module.css";
import { ReactComponent as PlusIcon } from "../../image/plus.svg";

interface IProps {
  onClick?: () => void;
}

/**
 * Элемент списка, служащий для добавления новых записей
 * @param props 
 * @returns 
 */
const NewNoteItem = ({onClick}: IProps): React.ReactElement => {
  return (
    <div className={styles.newItem} title="Добавить заметку" onClick={onClick}>
      <PlusIcon className={styles.addIcon}/>
    </div>
  );
};

export { NewNoteItem };

import styles from "./styles.module.css";
import { ReactComponent as PlusIcon } from "../../image/plus.svg";

interface IProps {
  onClick?: () => void;
}

const NewNoteItem = ({onClick}: IProps) => {
  return (
    <div className={styles.newItem} title="Добавить заметку" onClick={onClick}>
      <PlusIcon/>
    </div>
  );
};

export { NewNoteItem };

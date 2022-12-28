import { useMemo } from "react";
import styles from "./styles.module.css";
import { NoteItem, NewNoteItem } from "../NoteItem";
import { INote } from "../../interfaces";

interface IProps {
  className?: string;
  items?: INote[];
  onAddButtonClick?: () => void;
  onItemClick?: (item: INote) => void;
  onDeleteClick?: (item: INote) => void;
}

/**
 * Список заметок
 * @param props
 * @returns 
 */
const NotesList = ({
  items,
  onAddButtonClick,
  onItemClick,
  onDeleteClick,
}: IProps): React.ReactElement => {
  const content = useMemo(() => {
    const isEmptyView = !(items && items.length);
    return (
      <>
        {!isEmptyView &&
          items.map((item: INote) => (
            <NoteItem
              onClick={onItemClick}
              onDeleteClick={onDeleteClick}
              key={item.id}
              data={item}
            />
          ))}
        <NewNoteItem onClick={onAddButtonClick} />
      </>
    );
  }, [items, onItemClick, onDeleteClick, onAddButtonClick]);

  return <div className={styles.root}>{content}</div>;
};

export { NotesList };

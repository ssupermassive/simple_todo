import styles from "./styles.module.css";
import { NoteItem, NewNoteItem } from "../NoteItem";
import { INote } from "../../interfaces";

interface IProps {
  className?: string;
  items?: INote[];
  addButtonClick?: () => void
  onItemClick?: (item: INote) => void;
  onDeleteClick?: (item: INote) => void;
}

const NotesList = ({ items, addButtonClick, onItemClick, onDeleteClick }: IProps) => {
  const isEmptyView = !(items && items.length);
  const content = isEmptyView ? (
    <NewNoteItem />
  ) : (
    <>
      {items.map((item: INote) => (
        <NoteItem onClick={onItemClick} onDeleteClick={onDeleteClick} key={item.id} data={item} />
      ))}
      <NewNoteItem onClick={addButtonClick}/>
    </>
  );
  return <div className={styles.root}>{content}</div>;
};

export { NotesList };

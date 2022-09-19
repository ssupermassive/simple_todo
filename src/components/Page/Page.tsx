import React from "react";
import { Overlay } from "../Overlay";
import { NoteEditor } from "../NoteEditor";
import { NotesList } from "../NotesList";
import { Header } from "../Header";
import { Scroll } from "../Scroll";
import { INote } from "../../interfaces";
import { DEFAULT_ITEMS, ABOUT_NOTES_ITEMS } from "../../constants";

const Page = () => {
  const [items, setItems] = React.useState(DEFAULT_ITEMS);
  const [showAddDialog, setShowAddDialog] = React.useState(false);
  const [editingItem, setEditingItem] = React.useState<INote | null>();

  const onSubmit = (data: INote) => {
    const newItems = [...items];
    const oldItem = newItems.find((item) => item.id === data.id);

    if (oldItem) {
      const index = newItems.indexOf(oldItem);
      newItems[index] = { ...data };
    } else {
      newItems.push({ ...data });
    }

    setItems(newItems);
    resetState();
  };

  const onItemClick = (item: INote) => {
    const cloneItem = { ...item };
    setEditingItem(cloneItem);
    setShowAddDialog(true);
  };

  const onDeleteClick = (itemData: INote) => {
    const newItems = items.filter((item) => itemData.id !== item.id);
    setItems(newItems);
  }

  const resetState = () => {
    setShowAddDialog(false);
    setEditingItem(null);
  };

  return (
    <div className="w-full h-full h-min w-min display-flex flex-direction-column">
      <Header className="flex-shrink-0 flex-grow-0" title="Simple ToDo">
        <div className="display-flex">
          <button onClick={() => setItems(ABOUT_NOTES_ITEMS)}>Заполнить</button>
          <button onClick={() => setItems([])} className="ml-12">
            Очистить
          </button>
          <button onClick={() => setItems(DEFAULT_ITEMS)} className="ml-12">
            По умолчанию
          </button>
        </div>
      </Header>
      <Scroll>
        <div className="display-flex flex-direction-column items-center ml-12 mr-12 mb-12 mt-24">
          <NotesList
            items={items}
            onDeleteClick={onDeleteClick}
            onItemClick={onItemClick}
            addButtonClick={() => setShowAddDialog(true)}
          />
        </div>
      </Scroll>
      {showAddDialog && (
        <Overlay onClick={resetState}>
          <NoteEditor
            data={editingItem}
            closeButtonClick={resetState}
            onSubmit={onSubmit}
          />
        </Overlay>
      )}
    </div>
  );
};

export { Page };

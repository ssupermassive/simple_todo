import { useState, MouseEventHandler, SyntheticEvent } from "react";
import styles from "./styles.module.css";
import { INote } from "../../interfaces";
import { ReactComponent as DeleteIcon } from "../../image/delete.svg";
import RedPinImg from "../../image/pin_red.png";
import BluePinImg from "../../image/pin_blue.png";
import GreenPinImg from "../../image/pin_green.png";
import YellowPinImg from "../../image/pin_yellow.png";
import PinkPinImg from "../../image/pin_pink.png";

interface IProps {
  data: INote;
  onClick?: (data: INote) => void;
  onDeleteClick?: (data: INote) => void;
}

/**
 * Массив иконок канцелярский кнопок.
 * В массиве специально присутствуют повторяющиеся значения, что бы был более высокий шанс выпадения разных иконок
 * при работе рандомайзера
 */
const PIN_IMAGES = [
  RedPinImg, BluePinImg, GreenPinImg, YellowPinImg, PinkPinImg,
  RedPinImg, BluePinImg, GreenPinImg, YellowPinImg, PinkPinImg,
  RedPinImg, BluePinImg, GreenPinImg, YellowPinImg, PinkPinImg
];

const IMAGE_INDEXES = {
  start: 0,
  end: 14
}

/**
 * Вовзращает рандомную иконку канцелярской кнопки
 * @returns 
 */
function getPinImage(): string {
  const index = Math.round(IMAGE_INDEXES.start + Math.random() * (IMAGE_INDEXES.end - IMAGE_INDEXES.start));
  return PIN_IMAGES[index];
}

/**
 * Компонент заметки в списке
 * @param props 
 * @returns 
 */
const NoteItem = ({ data, onClick, onDeleteClick }: IProps): React.ReactElement => {
  
  // useState нужен, что бы при перерисовках иконка не генерилась каждый раз заного
  const [pinImage] = useState(getPinImage());

  const deleteButtonClick: MouseEventHandler<SVGSVGElement> = (
    event: SyntheticEvent
  ) => {
    event.stopPropagation();
    onDeleteClick && onDeleteClick(data);
  };

  return (
    <div className={`${styles.root} display-flex flex-direction_column`}>
      <div className={`${styles.imgContainer} display-flex justify-center`}>
        <img
          alt="pin"
          className={styles.pinImg}
          width={32}
          height={32}
          src={pinImage}
        />
      </div>
      <div
        onClick={() => onClick && onClick(data)}
        className={styles.item}
        style={{ backgroundColor: data.color }}
      >
        <div className={styles.content}>
          {data.title && (
            <div title={data.title} className={styles.title}>
              {data.title}
            </div>
          )}
          <div title={data.text} className={styles.text}>
            {data.text}
          </div>
          {onDeleteClick && (
            <DeleteIcon
              title="Удалить"
              className={styles.deleteButton}
              onClick={deleteButtonClick}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export { NoteItem };

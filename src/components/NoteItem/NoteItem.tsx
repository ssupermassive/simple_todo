import { useState, MouseEventHandler, SyntheticEvent } from "react";
import styles from "./styles.module.css";
import { INote } from "../../interfaces";
import { ReactComponent as DeleteIcon } from "../../image/delete.svg";
import RedPinImg from "../../image/pin_red.png";
import BlueRedImgSrc from "../../image/pin_blue.png";
import GreenRedImgSrc from "../../image/pin_green.png";

interface IProps {
  data: INote;
  onClick?: (data: INote) => void;
  onDeleteClick?: (data: INote) => void;
}

/**
 * Массив иконок канцелярский кнопок.
 * В массиве специально присутствуют повторяющиеся значения, что бы бал более высокий шанс выпадения разных иконок
 * при работе рандомайзера
 */
const PIN_IMAGES = [
  RedPinImg, BlueRedImgSrc, GreenRedImgSrc, 
  RedPinImg, BlueRedImgSrc, GreenRedImgSrc, 
  RedPinImg, BlueRedImgSrc, GreenRedImgSrc
];

const IMAGE_INDEXES = {
  start: 0,
  end: 8
}

/**
 * Вовзращает рандомную иконку канцелярской кнопки
 * @returns 
 */
function getPinImage(): string {
  const index = Math.round(IMAGE_INDEXES.start + Math.random() * (IMAGE_INDEXES.end - IMAGE_INDEXES.start));
  return PIN_IMAGES[index];
}

const NoteItem = ({ data, onClick, onDeleteClick }: IProps) => {
  
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

import {useState} from "react";
import styles from "./Palette/styles.module.css";

interface IProps {
  className?: string;
  onChange?: (value: string) => void;
  value?: string;
}

// Набор доступных цветов
const COLORS = [
  "#FFFF00",
  "#FFA500",
  "#008000",
  "#0000CD",
  "#800080",
  "#808080",
  "#FFFFFF",
  "#FFC0CB"
];

/**
 * Компонент палитры для выбора цвета заметки
 * @param props 
 * @returns 
 */
const Palette = ({ className, onChange, value }: IProps): React.ReactElement => {
  const [colors, setColors] = useState<string[]>(COLORS);

  const clickHandler = (newValue: string) => {
    if (onChange) {

      // что бы не было хаотичного перемешивания цветов, 
      // в палитре поменяем местами старый и новый цвет местами
      const valueIndex = colors.indexOf(value as string);
      const newValueIndex = colors.indexOf(newValue);
      const newColors = [...colors];
      newColors[newValueIndex] = value as string;
      newColors[valueIndex] = newValue;
      setColors(newColors);
      onChange(newValue);
    }
  };

  const colorItems = colors
    .filter((color) => color !== value)
    .map((color) => {
      const elementStyle = { backgroundColor: color };
      return (
        <div
          key={color}
          className={styles.item}
          onClick={() => clickHandler(color)}
          style={elementStyle}
        ></div>
      );
    });

  return <div className={`${className} ${styles.root}`}>{colorItems}</div>;
};

export { Palette };

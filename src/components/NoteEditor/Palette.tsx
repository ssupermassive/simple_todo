import styles from "./Palette/styles.module.css";

interface IProps {
  className?: string;
  onChange?: (value: string) => void;
  value?: string;
}

const COLORS = ["yellow", "green", "blue", "white", "cyan", "orange", "pink", "purple"];

const Palette = ({className, onChange, value}: IProps) => {
  const clickHandler = (value: string) => {
    onChange && onChange(value);
  }

  const colorItems = COLORS.filter((color) => color !== value).map((color) => {
    const elementStyle = { backgroundColor: color };
    return <div key={color} className={styles.item} onClick={() => clickHandler(color)} style={elementStyle}></div>;
  });

  return (
    <div className={`${className} ${styles.root}`}>{colorItems}</div>
  );
};

export { Palette };

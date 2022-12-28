import { FormEvent, HTMLAttributes } from "react";
import styles from "./styles.module.css";

interface IProps extends HTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  buttonStyle?: string;
  onClick: (event?: FormEvent<Element> | undefined) => void;
}

/**
 * Компонент кнопки
 * @param props
 * @returns 
 */
const Button = ({className, children, buttonStyle, onClick, ...buttonAttributes}: IProps): React.ReactElement => {
  const buttonStyleClass = styles[`button-style-${buttonStyle}`];
  return (
    <button
      {...buttonAttributes}
      onClick={onClick}
      className={`${styles.button} ${buttonStyleClass} ${className}`}
    >
      {children}
    </button>
  );
};

Button.defaultProps = {
  buttonStyle: "primary",
};

export default Button;

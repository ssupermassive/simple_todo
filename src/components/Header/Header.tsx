import { ReactElement } from "react";
import styles from './styles.module.css';

interface IProps {
  className?: string;
  title?: string;
  children?: ReactElement;
}

const Header = ({ children, title, className }: IProps) => {
  return (
    <header className={`${styles.root} ${className} display-flex justify-between items-center pl-12 pr-12`}>
      <h1>{title}</h1>
      <div>{children}</div>
    </header>
  );
};

export { Header };

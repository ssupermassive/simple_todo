import styles from './styles.module.css';

interface IProps {
  className?: string;
  title?: string;
  children?: React.ReactNode;
}

/**
 * Компонент шапки страницы
 * @param props 
 * @returns 
 */
const Header = ({ children, title, className }: IProps): React.ReactElement => {
  return (
    <header className={`${styles.root} ${className} display-flex justify-between items-center pl-12 pr-12`}>
      <h1 className={styles.title}>{title}</h1>
      <div className={`display-flex flex-wrap ${styles.content}`}>{children}</div>
    </header>
  );
};

export { Header };

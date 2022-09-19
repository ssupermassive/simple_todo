import { useState, ReactElement, UIEventHandler, SyntheticEvent } from "react";
import styles from './styles.module.css';

const SHOW_SHADOW_SCROLL_TOP = 12;

interface IProps {
  children: ReactElement;
}

const Scroll = ({ children }: IProps) => {
  const [showShadow, setShowShadow] = useState(false);

  const scrollHandler: UIEventHandler<HTMLDivElement> = (event: SyntheticEvent) => {
    setShowShadow((event.target as HTMLElement).scrollTop >= SHOW_SHADOW_SCROLL_TOP);
  };

  return (
    <div className={`${styles.container} display-flex flex-direction-column items-center h-full w-full h-min w-min`}>
      {showShadow && <div className={styles.shadow}></div>}
      <div onScroll={scrollHandler}  className={`${styles.childrenContainer} display-flex flex-direction-column h-full w-full h-min w-min`}>
      {children}
      </div>
    </div>
  );
};

export { Scroll };

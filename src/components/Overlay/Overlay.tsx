import { MouseEventHandler, ReactElement, MouseEvent } from 'react';
import styles from './styles.module.css'

interface IProps {
    children?: ReactElement
    onClick?: () => void
}

const ELEMENT_ID = 'overlay';

const Overlay = ({children, onClick}: IProps) => {
    const clickHandler: MouseEventHandler<HTMLDivElement> = (event: MouseEvent<HTMLDivElement>) => {
        // если клик всплыл от children, то ничего не делаем
        if ((event.target as HTMLDivElement).id !== ELEMENT_ID) {
            return;
        }

        onClick && onClick();
    }

    return <div id={ELEMENT_ID} onClick={clickHandler} className={styles.root}>{children}</div>
}

export {Overlay};
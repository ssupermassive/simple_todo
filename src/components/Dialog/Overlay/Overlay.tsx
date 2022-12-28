import { MouseEventHandler, MouseEvent, useRef } from 'react';
import styles from './styles.module.css'

interface IProps {
    children?: React.ReactNode;
    onClick?: () => void;
}

const ELEMENT_ID = 'overlay';

/**
 * Компонент оверлея для диалогового окна
 * @param props
 * @returns 
 */
const Overlay = ({children, onClick}: IProps): React.ReactElement => {
    const mouseDownTargetRef = useRef<HTMLDivElement | null>(null);

    const onMouseDown: MouseEventHandler<HTMLDivElement> = (event: MouseEvent<HTMLDivElement>) => {
        mouseDownTargetRef.current = event.target as HTMLDivElement;
    };

    const onMouseUp: MouseEventHandler<HTMLDivElement> = (event: MouseEvent<HTMLDivElement>) => {
        const mouseUpTarget = event.target as HTMLDivElement;
        const mouseDownTarget = mouseDownTargetRef.current;
        mouseDownTargetRef.current = null;

        // если клик всплыл от children, то ничего не делаем
        if ((event.target as HTMLDivElement).id !== ELEMENT_ID) {
            return;
        }

        // если с момента onMouseDown курсор перешёл на другой элемент, то ничего не делаем.
        // Иначе при некоторых кейсах, например при выделения текста внутри children и случаном уводе курсора за его пределы
        // окна будут закрывать когда это не нужно
        if (mouseUpTarget === mouseDownTarget) {
            onClick && onClick();
        }
    };

    return <div id={ELEMENT_ID} onMouseDown={onMouseDown} onMouseUp={onMouseUp} className={styles.root}>{children}</div>
}

export {Overlay};
import { createPortal } from "react-dom";
import { Overlay } from "./Overlay/Overlay";

interface IProps {
  children: React.ReactNode;
  open?: boolean;
  onOverlayClick?: () => void;
}

/**
 * Компонент, рендерящий диалоговое окно в оверлее
 * @param props 
 * @returns 
 */
const Dialog = ({ open, children, onOverlayClick }: IProps): React.ReactPortal | null => {
  if (!open) {
    return null;
  }

  return createPortal(
    <Overlay onClick={onOverlayClick}>{children}</Overlay>,
    document.getElementById("popupRoot") as HTMLElement
  );
};

export default Dialog;

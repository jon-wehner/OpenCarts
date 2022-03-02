import React, {
  useContext, useRef, useState, useEffect,
} from 'react';
import ReactDOM from 'react-dom';
import './Modal.css';

interface ModalProps {
  children: React.ReactNode,
  onClose: Function
}

interface ModalProviderProps {
  children: React.ReactNode
}

const ModalContext = React.createContext<Element | undefined | null>(undefined);

export function ModalProvider({ children }: ModalProviderProps) {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const [value, setValue] = useState<HTMLDivElement | undefined | null>(undefined);

  useEffect(() => {
    setValue(modalRef.current);
  }, []);

  return (
    <>
      <ModalContext.Provider value={value}>
        {children}
      </ModalContext.Provider>
      <div ref={modalRef} />
    </>
  );
}

export function Modal({ onClose, children }: ModalProps) {
  const modalNode = useContext(ModalContext);
  if (!modalNode) return null;

  const handleEsc = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  return ReactDOM.createPortal(
    <div id="modal">
      <div id="modal-background" onClick={() => onClose()} aria-label="Close" role="button" tabIndex={0} onKeyPress={handleEsc} />
      <div id="modal-content">
        {children}
      </div>
    </div>,
    modalNode,
  );
}

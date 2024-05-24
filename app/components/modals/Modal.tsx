'use client';

import { useState, FC, useEffect, useCallback } from 'react';
import { IoMdClose } from 'react-icons/io';
import { Button } from '../Button';

interface ModalProps {
  onClose: () => void;
  isOpen?: boolean;
  onSubmit: () => void;
  title?: string;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  actionLabel: string;
  disabled?: boolean;
  secondaryAction?: () => void;
  secondaryActionLabel?: string;
}

const Modal: FC<ModalProps> = ({
  actionLabel,
  onClose,
  onSubmit,
  body,
  disabled,
  footer,
  isOpen,
  secondaryAction,
  secondaryActionLabel,
  title,
}) => {
  const [showModal, setShowModal] = useState(isOpen);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const handleClose = useCallback(() => {
    if (disabled) {
      return;
    }
    setShowModal(false);

    setTimeout(() => {
      onClose();
    }, 300);
  }, [disabled, onClose]);

  const handleSubmit = useCallback(() => {
    if (disabled) {
      return;
    }
    onSubmit();
  }, [disabled, onSubmit]);

  const handleSecondaryAction = useCallback(() => {
    if (disabled || !secondaryAction) {
      return;
    }
    secondaryAction();
  }, [secondaryAction, disabled]);

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none bg-neutral-800/70">
        <div className="relative w-full h-full mx-auto my-6 md:w-4/6 lg:w-3/6 xl:w-2/5 lg:h-auto md:h-auto">
          {/* content */}

          <div
            className={`translate duration-300 h-full 
            ${
              showModal
                ? 'translate-y-0 md:translate-y-[10%]  xl:translate-y-[5%] '
                : 'translate-y-full'
            }
            ${showModal ? 'opacity-100' : 'opacity-0'}
            `}
          >
            <div className="relative flex flex-col w-full h-full bg-white border-0 rounded-lg shadow-lg outline-none translate lg:h-auto md:h-auto focus:outline-none">
              {/* header */}
              <div className="flex items-center justify-center p-6 rounded-t border-b-[1px] relative">
                <button
                  className="absolute p-1 transition border-0 hover:opacity-70 left-9"
                  onClick={handleClose}
                >
                  <IoMdClose size={18} />
                </button>
                <div className="text-lg font-semibold">{title}</div>
              </div>

              {/* body */}
              <div className="relative flex-auto p-6">{body}</div>

              {/* footer */}
              <div className="flex flex-col gap-2 p-6">
                <div className="flex flex-row items-center w-full gap-4">
                  {secondaryActionLabel && secondaryAction && (
                    <Button
                      outline
                      label={secondaryActionLabel || 'Cancel'}
                      disabled={disabled}
                      onClick={handleSecondaryAction}
                    />
                  )}

                  <Button
                    label={actionLabel}
                    disabled={disabled}
                    onClick={handleSubmit}
                  />
                </div>
                {footer}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;

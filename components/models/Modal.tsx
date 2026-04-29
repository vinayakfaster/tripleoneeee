"use client";

import React, { useCallback, useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import Button from "../Button";

type Props = {
  isOpen?: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title?: string;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  actionLabel: string;
  disabled?: boolean;
  secondaryAction?: () => void;
  secondaryActionLabel?: string;
};

function Modal({
  isOpen,
  onClose,
  onSubmit,
  title,
  body,
  footer,
  actionLabel,
  disabled,
  secondaryAction,
  secondaryActionLabel,
}: Props) {
  const [showModal, setShowModal] = useState(isOpen);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const handleClose = useCallback(() => {
    if (disabled) return;

    setShowModal(false);

    setTimeout(() => {
      onClose();
    }, 250);
  }, [disabled, onClose]);

  const handleSubmit = useCallback(() => {
    if (disabled) return;
    onSubmit();
  }, [disabled, onSubmit]);

  const handleSecondaryAction = useCallback(() => {
    if (disabled || !secondaryAction) return;
    secondaryAction();
  }, [disabled, secondaryAction]);

  if (!isOpen && !showModal) return null;

  return (
    <div
      onClick={handleClose}
      className="
        fixed inset-0 z-50 
        flex items-end sm:items-center justify-center
        bg-black/40 backdrop-blur-sm
        px-2 sm:px-0
      "
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`
          w-full sm:max-w-lg
          rounded-t-3xl sm:rounded-2xl
          bg-white/90 backdrop-blur-xl
          border border-[#e7d3b0]
          shadow-[0_25px_80px_rgba(0,0,0,0.12)]
          text-[#1a1a1a]
          transform transition-all duration-300 ease-out
          ${
            showModal
              ? "translate-y-0 opacity-100 scale-100"
              : "translate-y-10 opacity-0 scale-95"
          }
        `}
      >
        {/* HEADER */}
        <div className="relative flex items-center justify-center p-5 border-b border-[#f0e6d6]">
          <button
            onClick={handleClose}
            className="absolute left-4 text-[#a38b6b] hover:text-[#b89b72] transition"
          >
            <IoMdClose size={22} />
          </button>

          <h3 className="text-xl font-serif text-[#1a1a1a]">
            {title}
          </h3>
        </div>

        {/* BODY */}
        <div className="px-5 pt-5 pb-6 max-h-[60vh] overflow-y-auto">
          {body}
        </div>

        {/* FOOTER */}
        <div className="p-5 border-t border-[#f0e6d6] flex flex-col gap-4">

          <div className="flex gap-3">

            {/* Secondary Button */}
            {secondaryAction && secondaryActionLabel && (
              <Button
                outline
                disabled={disabled}
                label={secondaryActionLabel}
                onClick={handleSecondaryAction}
              />
            )}

            {/* 🔥 PRIMARY LUXURY BUTTON */}
            <button
              onClick={handleSubmit}
              disabled={disabled}
              className="
                flex-1
                py-3 rounded-xl
                bg-gradient-to-r from-[#b89b72] to-[#9e7d4b]
                text-white font-medium tracking-wide
                hover:opacity-90 transition
                shadow-md
                disabled:opacity-50
              "
            >
              {actionLabel}
            </button>

          </div>

          {footer}
        </div>
      </div>
    </div>
  );
}

export default Modal;
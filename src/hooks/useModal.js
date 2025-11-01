// @/hooks/useModal.js

import { useState } from "react";

/**
 * モーダルの状態管理フック
 * @param {number} animationDuration - アニメーション時間（ms）
 * @returns {Object} モーダルの状態と制御関数
 */
export const useModal = (animationDuration = 300) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const openModal = () => {
    setIsOpen(true);
    setIsClosing(false);
  };

  const closeModal = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
    }, animationDuration);
  };

  return {
    isOpen,
    isClosing,
    openModal,
    closeModal,
  };
};

// @/components/ui/Modal/index.jsx

"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Button } from "@/components/ui/Button";
import styles from "./Modal.module.scss";

/**
 * 統合モーダルコンポーネント
 * ポータル、アニメーション、状態管理を全て内包
 * @param {Object} props
 * @param {boolean} props.isOpen - モーダルが開いているか
 * @param {Function} props.onClose - モーダルを閉じる関数
 * @param {number} [props.animationDuration=500] - アニメーション時間（ms）
 * @param {string} [props.title] - モーダルのタイトル
 * @param {string} [props.closeButtonText="閉じる"] - 閉じるボタンのテキスト
 * @param {boolean} [props.showCloseButton=true] - 閉じるボタンを表示するか
 * 
 */
export const Modal = ({
  isOpen,
  onClose,
  animationDuration = 500,
  title,
  children,
  closeButtonText = "閉じる",
  showCloseButton = true,
}) => {
  const [mounted, setMounted] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  // クライアントサイドでマウントの確認
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // モーダルが開いている間、背景のスクロールを防ぐ
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen])

  // 閉じるアニメーション付きの閉じる処理
  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
      setIsClosing(false);
    }, animationDuration);
  };

  // 背景クリックで閉じる
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  // Escキーで閉じる
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen])

  // モーダルが閉じている、またはマウントされていない場合は、何も表示しない。
  if (!isOpen || !mounted) return null;

  const modalContent = (
    <div
      className={`${styles.overlay} ${isClosing ? styles.closing : ""}`}
      onClick={handleOverlayClick}
    >
      <div
        className={`${styles.modal} ${isClosing ? styles.closing : ""}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? "modal-title" : undefined}
      >
        {showCloseButton && (
          <Button
            type="button"
            onClick={handleClose}
            aria-label="閉じる"
            className={styles.closeButton}
          >
            {closeButtonText}
          </Button>
        )}
        <div className={styles.modal__contents}>
          {title && (
            <h2 className={styles.title} id="modal-title">
              {title}
            </h2>
          )}
          <div className={styles.content}>{children}</div>
        </div>
      </div>
    </div>
  );

  // body要素にポータルでレンダリング
  return createPortal(modalContent, document.body);
};
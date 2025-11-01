// // @/components/ui/Modal/index.jsx

// "use client";

// import { useModal } from "@/hooks/useModal";
// import { ModalPortal } from "@/components/ui/ModalPortal";
// import MyModal from "@/components/ui/MyModal";

// /**
//  * 使いやすいモーダルコンポーネント
//  * @param {Object} props
//  * @param {boolean} props.isOpen - モーダルが開いているか
//  * @param {Function} props.onClose - モーダルを閉じる関数
//  * @param {number} [props.animationDuration=500] - アニメーション時間
//  * @param {React.ReactNode} props.children - モーダルの中身
//  */
// export const Modal = ({
//   isOpen,
//   onClose,
//   animationDuration = 500,
//   children,
// }) => {
//   const [isClosing, setIsClosing] = useState(false);

//   const handleClose = () => {
//     setIsClosing(true);
//     setTimeout(() => {
//       onClose();
//       setIsClosing(false);
//     }, animationDuration);
//   };

//   if (!isOpen) return null;

//   return (
//     <ModalPortal>
//       <MyModal handleCloseClick={handleClose} isClosing={isClosing}>
//         {children}
//       </MyModal>
//     </ModalPortal>
//   );
// };

// @/components/ui/MyModal/index.jsx

"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/Button";
import styles from "./MyModal.module.scss";

const MyModal = ({ handleCloseClick, isClosing }) => {
  // モーダルをスクロールしても、奥にあるHTML（body要素）をスクロールさせない。
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const handleOverlayClick = (e) => {
    // 背景クリック時の処理
    e.target === e.currentTarget && handleCloseClick();
  };

  return (
    <>
      {/* 背景全体 */}
      <div
        className={`${styles.overlay} ${isClosing ? styles.closing : ""}`}
        onClick={handleOverlayClick}
      >
        {/* モーダルのコンテンツ */}
        <div className={styles.modal}>
          <Button type="button" onClick={handleCloseClick}>
            閉じる
          </Button>
          <div className={styles.modal__contents}>
            <h2>Modal</h2>
            <p>hello, hello, hello</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyModal;

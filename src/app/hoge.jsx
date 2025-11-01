// @/app/page.jsx

"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Button } from "@/components/ui/Button";
import MyModal from "@/components/ui/MyModal";

const MyModalPotal = ({ children }) => {
  const target = document.querySelector("body");
  return createPortal(children, target);
};

const Home = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
  }, [modalOpen, isClosing])
  const handleModalOpen = () => {
    setModalOpen(true);
    setIsClosing(false);
  };
  const handleModalClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setModalOpen(false);
      setIsClosing(false);
    }, 500); // <= アニメーションの時間と同じに設定する。
  };

  return (
    <>
      <Button onClick={handleModalOpen} disabled={modalOpen}>
        Modal Open
      </Button>
      {modalOpen && (
        <MyModalPotal>
          <MyModal handleCloseClick={handleModalClose} isClosing={isClosing} />
        </MyModalPotal>
      )}
    </>
  );
};

export default Home;
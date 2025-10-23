// @/components/layout/Header.jsx

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./Header.module.scss";

const Header = () => {
  const [isVisivle, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [templeCount, setTempleCount] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      currentScrollY > lastScrollY && currentScrollY > 80
        ? setIsVisible(false)
        : setIsVisible(true);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  useEffect(() => {
    const fetchTempleCount = async () => {
      try {
        const response = await fetch("/data/temple.csv");
        const text = await response.text();
        const lines = text.split("\n").filter((line) => line.trim());
        setTempleCount(lines.length - 1);
      } catch (error) {
        console.error("寺院数の取得エラー", error);
      }
    };
    fetchTempleCount();
  }, []);
  const isSearchEnabled = templeCount >= 8;

  return (
    <header
      className={styles.header}
      style={{ transform: isVisivle ? "translate(0)" : "translateY(-100%)" }}
    >
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          ku<span className="prolonged-sound-mark">ː</span>
        </Link>
        <nav className={styles.nav}>
          <Link
            href={isSearchEnabled ? "/temples" : "#"}
            className={`${styles.navLink} ${
              !isSearchEnabled ? styles.disabled : ""
            }`}
            onClick={(e) => {
              !isSearchEnabled && e.preventDefault();
            }}
          >
            お寺を探す
          </Link>
          <Link href="$guide" className={styles.navLink}>
            ご利用案内
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;

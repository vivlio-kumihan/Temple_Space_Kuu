// @/app/booking/complete/page.jsx

"use client";

import Link from "next/link";
import styles from "./complete.module.scss";

const BookingComplete = () => {
  return (
    <div className={`container ${styles.booking}`}>
      <div className={styles.booking__icon}>✅</div>
      <div className={styles.booking__title}>予約を受け付けました</div>
      <div className={styles.booking__message}>
        ご予約ありがとうございます。
        <br />
        ご入力いただいたメールアドレスに、予約詳細とお支払い方法をお送りしました。
      </div>
      <div className={styles.infoBox}>
        <h2 className={styles.infoBox__title}>今後の流れ</h2>
        <ul className={styles.infoBox__text}>
          <li>1. メールに記載された銀行口座にお振込みください</li>
          <li>2. 入金確認後、予約確定メールをお送りします</li>
          <li>3. 当日、寺院にお越しください</li>
          <li>
            <strong>振込期限: 予約日の3日前まで</strong>
          </li>
        </ul>
      </div>

      <Link className={styles.backButton} href="/">
        トップページに戻る
      </Link>
    </div>
  );
};

export default BookingComplete;

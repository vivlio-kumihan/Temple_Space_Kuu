// @/app/not-found.jsx

import Link from "next/link";
import styles from "./not-found.module.scss";

const NotFound = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>404</h1>
        <h2 className={styles.subtitle}>ページが見つかりません</h2>
        <p className={styles.message}>
          お探しのページは存在しないか、移動した可能性があります。
        </p>
        <Link href="/" className={styles.homeButton}>
          トップページに戻る
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
// @/app/page.jsx

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getTemples } from "@/lib/temples";
import { ImageSwiper } from "@/components/ui/MySwiper";
import useScrollAnimation from "@/hooks/useScrollAnimation";
import styles from "./page.module.scss";

const Home = () => {
  const [temples, setTemples] = useState([]);
  const [loading, setLoading] = useState(true);

  // 寺院のデータを読み込む
  useEffect(() => {
    const loadTemples = async () => {
      const data = await getTemples();
      setTemples(data);
      setLoading(false);
    };
    loadTemples();
  }, []);

  // Heroスライダーの画像データ
  const heroSlides = [
    {
      id: 1,
      src: "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=1600&h=900&fit=crop",
      caption: "kuː",
      subtitle: "近くのお寺で、じぶん時間の過ごし方",
    },
    {
      id: 2,
      src: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=1600&h=900&fit=crop",
      caption: "kuː",
      subtitle: "お寺で紡ぐ、人とのご縁",
    },
    {
      id: 3,
      src: "https://images.unsplash.com/photo-1478436127897-769e1b3f0f36?w=1600&h=900&fit=crop",
      caption: "kuː",
      subtitle: "Nothing stands alone. We exist through connections.",
    },
  ];

  // スクロールアニメーションを有効化 (この1行だけ追加!)
  useScrollAnimation({
    parentSelector: ".appear",
    childSelector: ".up",
    threshold: 0.4,
    stagger: 150, // 各要素の表示遅延(ms)
  });

  return (
    <>
      {/* Heroスライダー */}
      <section className={styles.hero}>
        <ImageSwiper
          image={heroSlides}
          width="100vw"
          height="90vh"
          widthMqLg="100vw"
          heightMqLg="90vh"
          useFade={true}
        />
      </section>

      {temples.length >= 8 && (
        <section className={styles.search}>
          <div className={styles.search__container}>
            <input
              type="text"
              className={styles.search__input}
              placeholder="🔍 寺院名、住所で検索"
            />
            <button className={styles.search__button}>検索</button>
            <button className={styles.search__reset}>リセット</button>
          </div>
        </section>
      )}

      {/* 寺院のカード表示 */}
      <section className={`${styles.temples} appear`}>
        <h2 className={`${styles.sectionTitle} up`}>掲載寺院</h2>
        {loading ? (
          <div className={`${styles.loading} up`}>読み込み中...</div>
        ) : temples.length === 0 ? (
          <div className={`${styles.noResults} up`}>
            該当する寺院が見つかりませんでした。
          </div>
        ) : (
          <div className={`${styles.temples__scroll} up`}>
            {temples.map((temple) => (
              <Link key={temple.id} href={`/temples/${temple.id}`}>
                <article className={styles.templeCard}>
                  <div className={styles.templeCard__image}>{temple.name}</div>
                  <div className={styles.templeCard__info}>
                    <h3 className={styles.templeCard__name}>{temple.name}</h3>
                    <div className={styles.templeCard__location}>
                      📍{temple.location}
                    </div>
                    <div className={styles.templeCard__price}>
                      {temple.price}
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* 利用例 */}
      <section className={`${styles.scenes} appear`}>
        <h2 className={`${styles.sectionTitle} up`}>
          こんな使い方が
          <br className="mq-sm-br" />
          できます
        </h2>
        <div className={styles.scenes__grid}>
          <div className={`${styles.sceneCard} up`}>
            <div className={styles.sceneCard__image}>ヨガ教室</div>
            <h3 className={styles.sceneCard__title}>ヨガ教室</h3>
            <p className={styles.sceneCard__text}>
              静寂な空間で心身を整えるヨガ体験
            </p>
          </div>
          <div className={`${styles.sceneCard} up`}>
            <div className={styles.sceneCard__image}>茶道教室</div>
            <h3 className={styles.sceneCard__title}>茶道教室</h3>
            <p className={styles.sceneCard__text}>
              日本の伝統文化に囲まれて学ぶ
              <br className="mq-sm-br" />
              本格的なお茶会
            </p>
          </div>
          <div className={`${styles.sceneCard} up`}>
            <div className={styles.sceneCard__image}>写真撮影</div>
            <h3 className={styles.sceneCard__title}>写真撮影</h3>
            <p className={styles.sceneCard__text}>
              格式ある寺院で特別な記念撮影
            </p>
          </div>
          <div className={`${styles.sceneCard} up`}>
            <div className={styles.sceneCard__image}>イベント</div>
            <h3 className={styles.sceneCard__title}>イベント</h3>
            <p className={styles.sceneCard__text}>
              フリーマーケットや展示会など
              <br className="mq-sm-br" />
              多目的利用
            </p>
          </div>
        </div>
      </section>

      {/* 利用案内 */}
      <section className={`${styles.guide} appear`} id="guide">
        <h2 className={`${styles.sectionTitle} up`}>ご利用の流れ</h2>
        <div className={styles.guide__steps}>
          <div className={`${styles.step} up`}>
            <div className={styles.step__number}>
              <span>step</span>1
            </div>
            <h3 className={styles.step__title}>お寺を探す</h3>
            <p className={styles.step__text}>
              検索して気になるお寺を
              <br className="mq-sm-br" />
              見つけましょう
            </p>
          </div>

          <div className={styles.step__arrow}>→</div>

          <div className={`${styles.step} up`}>
            <div className={styles.step__number}>
              <span>step</span>2
            </div>
            <h3 className={styles.step__title}>
              予約<span>or</span>質問
            </h3>
            <p className={styles.step__text}>
              日時を選んで予約、または質問を
              <br className="mq-sm-br" />
              送信してください
            </p>
          </div>

          <div className={styles.step__arrow}>→</div>

          <div className={`${styles.step} up`}>
            <div className={styles.step__number}>
              <span>step</span>3
            </div>
            <h3 className={styles.step__title}>お支払い</h3>
            <p className={styles.step__text}>銀行振込でお支払いください</p>
          </div>

          <div className={styles.step__arrow}>→</div>

          <div className={`${styles.step} up`}>
            <div className={styles.step__number}>
              <span>step</span>4
            </div>
            <h3 className={styles.step__title}>訪問</h3>
            <p className={styles.step__text}>当日お寺へお越しください</p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
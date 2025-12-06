// @/app/page.jsx

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

import Image from "next/image";
import { getTemples } from "@/lib/temples";
import { HeroSwiper } from "@/components/ui/MySwiper";
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
      src: "/images/_img_slide01.jpg",
      subtitle: "kuː",
      caption: "近くのお寺で、じぶん時間の過ごし方",
    },
    {
      id: 2,
      src: "/images/_img_slide02.jpg",
      subtitle: "kuː",
      caption: "お寺で紡ぐ、人とのご縁",
    },
    {
      id: 3,
      src: "/images/_img_slide03.jpg",
      subtitle: "kuː",
      caption: "Nothing stands alone. We exist through connections.",
    },
    {
      id: 4,
      src: "/images/_img_slide04.jpg",
      subtitle: "kuː",
      caption: "Nothing stands alone. We exist through connections.",
    },
  ];

  // スクロールアニメーションを有効化 (この1行だけ追加!)
  useScrollAnimation({
    parentSelector: ".appear",
    childSelector: ".up",
    threshold: 0.4,
    stagger: 150, // 各要素の表示遅延(ms)
  });

  // 利用例の画像データを定義
  const sceneData = [
    {
      id: 1,
      image: "/images/_img_scenes_yogi.jpg",
      title: "ヨガ教室",
      text: "静寂な空間で心身を整えるヨガ体験",
    },
    {
      id: 2,
      image: "/images/_img_scenes_sadou.jpg",
      title: "茶道教室",
      text: "日本の伝統文化に囲まれて学ぶ本格的なお茶会",
    },
    {
      id: 3,
      image: "/images/_img_scenes_takePhoro.jpg",
      title: "写真撮影",
      text: "格式ある寺院で特別な記念撮影",
    },
    {
      id: 4,
      image: "/images/_img_scenes_event.jpg",
      title: "イベント",
      text: "フリーマーケットや展示会など多目的利用",
    },
  ];

  return (
    <>
      {/* Heroスライダー */}
      <section className={styles.hero}>
        <HeroSwiper images={heroSlides} overlayOpacity={0.3} />
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
        <h2 className={`sectionTitle ${styles.homeSectionTitle} temples-list up`}>
          掲載寺院
        </h2>
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
                  <div className={styles.templeCard__image}>
                    {
                      temple.image_url ? (
                        <Image 
                          src={temple.image_url}
                          alt={temple.name}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          style={{ objectFit: "cover" }}
                        />
                      ) : (
                        <div className={styles.templeCard__placeholder}>
                          {temple.name}
                        </div>
                      )
                    }
                  </div>
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
        <h2 className={`sectionTitle ${styles.homeSectionTitle} up`}>
          こんな使い方が
          <br className="mq-sm-br" />
          できます
        </h2>
        <div className={styles.scenes__grid}>
          {sceneData.map((scene) => (
            <div key={scene.id} className={`${styles.sceneCard} up`}>
              <div className={styles.sceneCard__image}>
                <Image 
                  src={scene.image}
                  alt={scene.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  style={{ objectFit: "cover"}}
                />
              </div>
              <h3 className={styles.sceneCard__title}>{scene.title}</h3>
              <p className={styles.sceneCard__text}>
                {scene.text}
              </p>
            </div>
          ))}
        </div>
      </section>
      {/* 利用案内 */}
      <section className={`${styles.guide} appear`} id="guide">
        <h2 className={`sectionTitle ${styles.homeSectionTitle} up`}>
          ご利用の流れ
        </h2>
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
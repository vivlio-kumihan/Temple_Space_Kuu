// @/app/temples/[id]/page.jsx

"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { getTempleById } from "@/lib/temples";
import { HeroSwiper } from "@/components/ui/MySwiper";
import AvailabilityCalendar from "@/components/ui/AvailabilityCalendar";
import Modal from "@/components/ui/Modal";
import ReservationForm from "@/components/ui/ReservationForm";
import InquiryForm from "@/components/ui/InquiryForm";

import styles from "./temple.module.scss";

// porps（params）にはお寺のIDが入っている。
const TempleDetail = ({ params }) => {
  // Next.js 15の仕様。
  // paramsが非同期(Promise)になったため、React.use()で展開する必要。
  const router = useRouter();
  const { id } = use(params);

  const [temple, setTemple] = useState(null);
  const [loading, setLoading] = useState(true);

  // モーダル管理
  const [openModal, setOpenModal] = useState(false);
  // モーダルのトグル・スイッチ
  const toggleModal = () => {
    setOpenModal((prev) => !prev);
  };
  // 選択しているフォームの名称
  const [currentForm, setCurrentForm] = useState(null);

  const handleToggleModal = (e) => {
    const formName = e.currentTarget.dataset.which;
    if  (formName === "reservation") {
      if (!selectedDate || selectedTimes.length === 0) {
        alert("日時を選択してください。");
        return;
      }
    }
    setCurrentForm(formName);
    toggleModal();
  };

  // カレンダーが選択された日時
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTimes, setSelectedTimes] = useState([]);
  // 予約完了メッセージ
  const [successMessage, setSuccessMessage] = useState("");
  // カレンダーをリセットするためのキー管理
  const [calenderKey, setCalenderKey] = useState(0);

  useEffect(() => {
    // console.log("取得したID:", id);
    // console.log("IDの型:", typeof id);
    const loadTemple = async () => {
      const data = await getTempleById(id);
      // console.log("取得した寺院のデータ：", data);
      setTemple(data);
      setLoading(false);
    };
    loadTemple();
  }, [id]);

  // カレンダーで日時が選択された時
  const handleSelectedDateTime = (date, times) => {
    setSelectedDate(date);
    setSelectedTimes(times);
  };

  // 予約成功時
  const handleReservationSuccess = (result) => {
    // 成功メッセージを表示
    setSuccessMessage(result.message);
    // カレンダーの選択をリセット
    setSelectedDate(null);
    setSelectedTimes([]);
    // カレンダーをリセット
    setCalenderKey((prev) => prev + 1);
    // モーダルを閉じる
    toggleModal();
    // 5秒後にメッセージを消す
    setTimeout(() => {
      setSuccessMessage("");
    }, 5000);
    // ページトップまでスクロールさせてターンが変わったことを認知させる。
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // 問い合わせの成功時
  const handleInquirySuccess = (result) => {
    // 成功メッセージを表示
    setSuccessMessage(result.message);
    // モーダルを閉じる
    toggleModal();
    // 5秒後にメッセージを消す
    setTimeout(() => {
      setSuccessMessage("");
    }, 5000);
    // ページトップまでスクロールさせてターンが変わったことを認知させる。
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (loading) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner}></div>
        <p>読み込み中...</p>
      </div>
    );
  }

  if (!temple) {
    return (
      <div className={styles.error}>
        <h1>寺院が見つかりませんでした。</h1>
        <button onClick={() => router.push("/")}>トップページに戻る</button>
      </div>
    );
  }

  // Hero スライダー用のダミー画像（後で寺院の実際の画像に置き換え）
  const heroSlides = [
    {
      id: 1,
      src: "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=1600&h=900&fit=crop",
      caption: temple.name,
    },
    {
      id: 2,
      src: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=1600&h=900&fit=crop",
      caption: temple.name,
    },
    {
      id: 3,
      src: "https://images.unsplash.com/photo-1478436127897-769e1b3f0f36?w=1600&h=900&fit=crop",
      caption: temple.name,
    },
  ];

  return (
    <>
      {/* Heroスライダー */}
      <section className="top-contents">
        <HeroSwiper images={heroSlides} overlayOpacity={0.3} />
      </section>

      <div className={styles.container}>
        {/* 成功メッセージ */}
        {successMessage && (
          <div className={styles.successMessage}>{successMessage}</div>
        )}
        {/* 戻るボタン */}
        <button className={styles.backButton} onClick={() => router.back()}>
          ←&nbsp;一覧に戻る
        </button>
        {/* 紹介セクション */}
        <section className={styles.intro}>
          <h1 className={styles.intro__name}>{temple.name}</h1>
          <div className={styles.intro__address}>{temple.address}</div>
          <div className={styles.intro__description}>{temple.description}</div>

          {/* タグ（後で実装） */}
          <div className={styles.tags}>
            <span className={styles.tag}>本堂あり</span>
            <span className={styles.tag}>駐車場あり</span>
            <span className={styles.tag}>茶室あり</span>
          </div>
        </section>
        {/* お寺の一言掲示板（後で実装） */}
        <section className={styles.notice}>
          <h2 className={`sectionTitle ${styles.templeSectionTitle}`}>
            お寺からの一言掲示板
          </h2>
          <div className={styles.notice__board}>
            <div className={styles.notice__item}>
              <div className={styles.notice__date}>2025年11月1日</div>
              <h3 className={styles.notice__title}>ヨガ教室のお知らせ</h3>
              <div className={styles.notice__text}>
                好評のヨガ教室の開催です。〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓。詳しくはチラシをご覧ください。
              </div>
              <a href="#" className={styles.notice__link}>
                チラシを見る
              </a>
            </div>
            <div className={styles.notice__item}>
              <div className={styles.notice__date}>2025年10月20日</div>
              <h3 className={styles.notice__title}>写経会やります</h3>
              <div className={styles.notice__text}>
                好評の写経会の開催です。〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓。詳しくはチラシをご覧ください。
              </div>
              <a href="#" className={styles.notice__link}>
                チラシを見る
              </a>
            </div>
          </div>
        </section>
        {/* 利用可能な設備のタグ（後で実装） */}
        <section className={styles.facility}>
          <h2 className={`sectionTitle ${styles.templeSectionTitle}`}>
            利用可能な設備
          </h2>
          <div className={styles.facility__grid}>
            <div className={styles.facility__item}>Wi-Fi完備</div>
            <div className={styles.facility__item}>駐車場{temple.parking}</div>
            <div className={styles.facility__item}>トイレあり</div>
            <div className={styles.facility__item}>冷暖房あり</div>
            <div className={styles.facility__item}>音響設備</div>
            <div className={styles.facility__item}>プロジェクター</div>
          </div>
        </section>
        {/* 施設スペック（部屋ごと） */}
        <section className={styles.space}>
          <h2 className={`sectionTitle ${styles.templeSectionTitle}`}>
            施設について
          </h2>
          {temple.spaces &&
            temple.spaces.map((space) => (
              <div key={space.id} className={styles.space__card}>
                <h3 className={styles.space__name}>{space.space_name}</h3>
                <ul className={styles.space__info}>
                  <li>広さ: {space.size}</li>
                  <li>収容人数: {space.capacity}名</li>
                  <li>
                    基本料金: {space.base_price.toLocaleString()}
                    <div className="unit-price">円／時間</div>
                  </li>
                  <li>用途: {space.description}</li>
                </ul>
                {/* 用途別料金 */}
                {space.usage_types && space.usage_types.length > 0 && (
                  <div className={styles.usageType}>
                    <h4 className={styles.usageType__title}>用途別料金</h4>
                    {space.usage_types.map((usage) => (
                      <div key={usage.id} className={styles.usageType__item}>
                        <span>{usage.usage_name}</span>
                        <span>
                          {usage.price.toLocaleString()}
                          <div className="unit-price">円／時間</div>
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
        </section>
        {/* 交通情報 */}
        <section className={styles.access}>
          <h2 className={`sectionTitle ${styles.templeSectionTitle}`}>交通</h2>
          <ul className={styles.access__info}>
            <li className={`wrapper ${styles.itemWrapper}`}>
              <div className={styles.access__item}>住所</div>
              <div className={styles.access__item}>{temple.address}</div>
            </li>
            <li className={`wrapper ${styles.itemWrapper}`}>
              <div className={styles.access__item}>アクセス</div>
              <div className={styles.access__item}>{temple.access}</div>
            </li>
            <li className={`wrapper ${styles.itemWrapper}`}>
              <div className={styles.access__item}>駐車場</div>
              <div className={styles.access__item}>{temple.parking}</div>
            </li>
          </ul>
          {/* Google Map（後で実装）*/}
          <div className={styles.map}>
            <div>Google Map</div>
          </div>
        </section>
        {/* 予定カレンダー */}
        <section className={styles.calender}>
          <h2 className={`sectionTitle ${styles.templeSectionTitle}`}>
            利用可能日
          </h2>
          <div className={styles.calendar__description}>
            カレンダーで◯がついている日が予約可能です。
            <br className="mq-sm-br" />
            ご希望の日時を選んで予約してください。
          </div>
          <div className={styles.calender__wrapper}>
            <AvailabilityCalendar
              key={calenderKey}
              templeId={temple.id}
              onSelectDateTime={handleSelectedDateTime}
            />
          </div>
          <div className={styles.calendar__notes}>
            <h4>ご予約について</h4>
            <ul>
              <li>予約は利用日の3日前までにお願いいたします。</li>
              <li>
                カレンダーに表示されていない日程をご希望の場合は、お問い合わせください。
              </li>
              <li>法要などにより急遽ご利用いただけない場合がございます。</li>
            </ul>
          </div>
        </section>

        {/* アクション・ボタン */}
        <section className={styles.action}>
          <button
            className={styles.reservationButton}
            onClick={handleToggleModal}
            data-which="reservation"
          >
            日付を選んで予約する
          </button>
          <button
            className={styles.inquiryButton}
            onClick={handleToggleModal}
            data-which="inquiry"
          >
            利用について質問する
          </button>
        </section>
      </div>

      {openModal && (
        <Modal toggleModal={handleToggleModal}>
          {currentForm === "reservation" ? (
            <ReservationForm
              templeId={temple.id}
              templeName={temple.name}
              selectedDate={selectedDate}
              selectedTimes={selectedTimes}
              onClose={handleToggleModal}
              onSuccess={handleReservationSuccess}
            />
          ) : (
            <InquiryForm
              templeId={temple.id}
              templeName={temple.name}
              onClose={handleToggleModal}
              onSuccess={handleInquirySuccess}
            />
          )}
        </Modal>
      )}
    </>
  );
};

export default TempleDetail;
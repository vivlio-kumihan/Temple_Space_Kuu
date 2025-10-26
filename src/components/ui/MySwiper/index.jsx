// // @/components/ui/MySwiper/index.jsx

"use client"

import { Swiper, SwiperSlide } from "swiper/react";
// React用Swiperオブジェクトを読み込む
//   各種エフェクトを読み込む
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules"; // EffectFade追加
//   Swiper用各種CSSを読み込む
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

import styles from "./MySwiper.module.scss";

// GraphicSwiperコンポーネント
export const GraphicSwiper = ({
  slides,
  width = "100vw",
  height = "80vh",
  widthMqLg = "100vw",
  heightMqLg = "600px",
  ...props
}) => {
  const defaultSlides = [
    {
      id: 1,
      title: "SwiperSlide #1",
      text: "It's first slide.",
      color: "#3b82f6",
    },
    {
      id: 2,
      title: "SwiperSlide #2",
      text: "It's second slide.",
      color: "#10b981",
    },
    {
      id: 3,
      title: "SwiperSlide #3",
      text: "It's third slide.",
      color: "#8b5cf6",
    },
  ];

  const slideData = slides || defaultSlides;

  return (
    <Swiper
      className={styles.swiper}
      modules={[Navigation, Pagination, Autoplay]}
      spaceBetween={0}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true}}
      autoplay={{ delay: 3000, disableOnInteraction: false }}
      speed={2000}
      loop={true}
      // CSS変数の定義
      style={{
        "--swiper-width": width,
        "--swiper-height": height,
        "--swiper-width-lg": widthMqLg,
        "--swiper-height-lg": heightMqLg,
      }}
      {...props}
    >
      {slideData.map((slide) => (
        <SwiperSlide key={slide.id}>
          <div 
            className={styles.graphicSlide}
            style={{"--slide-bg-color": slide.color}}
          >
            <h2 className={styles.graphicSlide__title}>{slide.title}</h2>
            <div className={styles.graphicSlide__text}>{slide.text}</div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

// ImageSwiperコンポーネント
export const ImageSwiper = ({
  images,
  width = "100vw",
  height = "80vh",
  widthMqLg = "100vw",
  heightMqLg = "600px",
  useFade = false,
  overlay = false,
  overlayOpacity = 0.3,
  overlayVariant = "medium", // light, medium, darkのオプションあり
  className = "",
  ...props
}) => {
  const defaultImages = [
    {
      id: 1,
      src: "https://picsum.photos/800/400?random=1",
      caption: "Beautiful Landscape 1",
    },
    {
      id: 2,
      src: "https://picsum.photos/800/400?random=2",
      caption: "Beautiful Landscape 2",
    },
    {
      id: 3,
      src: "https://picsum.photos/800/400?random=3",
      caption: "Beautiful Landscape 3",
    },
  ];

  const imageData = images || defaultImages;
  // オーバーレイのクラス名を生成させる。
  const overlayClasses = overlay
    ? `${styles.overlay} ${styles[`overlay__${overlayVariant}`]}`
    : "";

  return (
    <div
      className={`${overlayClasses} ${className}`}
      style={overlay ? { "--overlay-opacity": overlayOpacity } : {}}
    >
      <Swiper
        className={styles.swiper}
        modules={
          useFade
            ? [Navigation, Pagination, Autoplay, EffectFade]
            : [Navigation, Pagination, Autoplay]
        }
        effect={useFade ? "fade" : "slide"}
        fadeEffect={useFade ? { crossFade: true } : undefined}
        spaceBetween={0}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        speed={2000}
        loop={true}
        // CSS変数の定義
        style={{
          "--swiper-width": width,
          "--swiper-height": height,
          "--swiper-width-lg": widthMqLg,
          "--swiper-height-lg": heightMqLg,
        }}
        {...props}
      >
        {imageData.map((image) => (
          <SwiperSlide key={image.id} className={styles.imageSlide}>
            <img
              src={image.src}
              alt={image.caption || `Slide ${image.id}`}
              className={styles.imageSlide__image}
            />
            <div className="wrapper">
              {image.caption && (
                <div className={styles.imageSlide__caption}>
                  {image.caption}
                </div>
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export const HeroSwiper = ({
  images,
  overlayOpacity = 0.3,
  overlayVariant = "medium",
  ...props
}) => {
  return (
    <ImageSwiper 
      images={images}
      width="100%"
      height="70vh"
      widthMqLg="100%"
      heightMqLg="70vh"
      useFade={true}
      overlay={true}
      overlayOpacity={overlayOpacity}
      overlayVariant={overlayVariant}
      {...props}
    />
  );
};